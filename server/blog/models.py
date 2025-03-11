import uuid
from django.db import models
from django.contrib.auth.models import User


class Post(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, blank=False, null=False)
    photo = models.ImageField(upload_to='uploads/photos', blank=False, null=False)
    display_description = models.TextField(max_length=500, blank=False, null=False)
    text = models.TextField(blank=False, null=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f'Post: {self.name} | Author: {self.author}'