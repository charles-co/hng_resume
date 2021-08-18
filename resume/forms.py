from django import forms

class ContactMe(forms.Form):

    name = forms.CharField(max_length=50, required=True, error_messages={'required': 'Please enter your name.'})
    email = forms.EmailField(required=True)
    message = forms.CharField(required=True)