from django.core.mail import send_mail, EmailMessage
from django.conf import settings
from django.contrib import messages
from django.views.generic import TemplateView
from django.urls import reverse_lazy
from django.http import JsonResponse
from resume.models import Profile, Skill, Service, Portfolio, Experience
from resume.forms import ContactMe
import json
import threading
from django.conf import settings


class EmailThread(threading.Thread):

    def __init__(self, context):
        self.context = context
        threading.Thread.__init__(self)

    def run(self):
        send_mail(
            self.context.get("subject"),
            self.context.get("body"),
            settings.DEFAULT_FROM_EMAIL,
            [x[1] for x in self.context.get("email_list")],
            fail_silently=not settings.DEBUG
        )


class Index(TemplateView):

    template_name = "index.html"

    def get(self, request, *args, **kwargs):
        
        profile = Profile.objects.first()
        skills = Skill.objects.all()
        services = Service.objects.all()
        portfolios = Portfolio.objects.all()
        experiences = Experience.objects.all()
        self.extra_context = {
            "profile": profile,
            "skills": skills,
            "services": services,
            "portfolios": portfolios,
            "experiences": experiences
        }
        return super().get(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        form = ContactMe(data=data)
        if not form.is_valid() and request.is_ajax():
            return JsonResponse({"errors": form.errors}, status=400)
        data = form.cleaned_data
        context = dict()
        body = f'{data.get("message")} by {data.get("name")}, {data.get("email")}'
        subject = "Contact from Resume"
        email_list = settings.ADMINS
        context.update({
            "body": body, 
            "subject": subject, 
            "email_list": email_list
        })
        EmailThread(context).start()
        return JsonResponse({"msg": f"Hi {data.get('name').split(' ')[0]} thanks for contacting, I'll get back to you shortly :)"}, status=200)
    