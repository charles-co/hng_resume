from django.contrib import admin
from .models import Profile, Portfolio, Experience, Skill, Service
# Register your models here.

admin.site.register(Profile)
admin.site.register(Portfolio)
admin.site.register(Experience)
admin.site.register(Skill)
admin.site.register(Service)