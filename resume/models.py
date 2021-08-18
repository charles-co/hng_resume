from django.db import models

# Create your models here.

AVAILABLE = "Available"
BUSY = "Busy"

Status = [
    (AVAILABLE, "Available"),
    (BUSY, "Busy"),
]
class Profile(models.Model):

    fullname = models.CharField(max_length=50)
    tag = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    email = models.EmailField(max_length=254)
    status = models.CharField(max_length=9, choices=Status, default=AVAILABLE)
    address = models.CharField(max_length=50)
    contact = models.CharField(max_length=15)
    bio = models.TextField()

    def __str__(self):
        return self.fullname
    
    def save(self, *args, **kwargs):
        if self.__class__.objects.count():
            self.pk = self.__class__.objects.first().pk
        super().save(*args, **kwargs)


class Skill(models.Model):

    title = models.CharField(max_length=50, unique=True)
    value = models.PositiveIntegerField()

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['title']

class Service(models.Model):

    title = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.title

class Portfolio(models.Model):
    title = models.CharField(max_length=50, unique=True)
    link = models.URLField(blank=True)

    def __str__(self):
        return self.title

class Experience(models.Model):

    title = models.CharField(max_length=50)
    subtitle = models.CharField(max_length=50)
    description = models.TextField()

    def __str__(self):
        return self.title