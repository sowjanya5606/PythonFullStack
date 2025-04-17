from django.db import models
from django.contrib.auth.models import User

class SketchImage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    original = models.ImageField(upload_to='originals/')
    sketch = models.ImageField(upload_to='sketches/', blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
