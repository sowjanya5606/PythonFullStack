from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .forms import UploadForm
from .models import SketchImage
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
import cv2
import os
from .forms import RegistrationForm, LoginForm
from django.contrib import messages
from django.conf import settings

def home(request):
    return render(request, 'home.html')

# Registration View
# def register(request):
#     if request.method == 'POST':
#         form = RegistrationForm(request.POST)
#         if form.is_valid():
#             form.save()
#             messages.success(request, 'Your account has been created successfully!')
#             return redirect('login')
#     else:
#         form = RegistrationForm()
#     return render(request, 'register.html', {'form': form})

def image_to_sketch(image_path):
    img = cv2.imread(image_path)
    if img is None:
        return None
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    invert = cv2.bitwise_not(gray)
    blur = cv2.GaussianBlur(invert, (21, 21), sigmaX=0, sigmaY=0)
    sketch = cv2.divide(gray, 255 - blur, scale=256.0)

    return sketch

def upload_image(request):
    if request.method == 'POST':
        form = UploadForm(request.POST, request.FILES)
        if form.is_valid():
            obj = form.save(commit=False)
            obj.user = request.user
            obj.save()

            # Convert to sketch
            sketch_img = image_to_sketch(obj.original.path)
            # sketch_path = f"sketches/sketch_{obj.id}.png"
            sketch_dir = os.path.join(settings.MEDIA_ROOT, 'sketches')
            os.makedirs(sketch_dir, exist_ok=True)
            sketch_filename = f"sketch_{obj.id}.png"
            sketch_path = os.path.join('sketches', sketch_filename)
            full_sketch_path = os.path.join(settings.MEDIA_ROOT, sketch_path)
            # full_sketch_path = os.path.join(settings.MEDIA_ROOT, sketch_path)
            success=cv2.imwrite(full_sketch_path, sketch_img)
            if not success:
                print("❌ Failed to save sketch image!")
            obj.sketch.name = sketch_path
            obj.save()
            return render(request,'gallery.html', {'images': [obj]})
    else:
        form = UploadForm()
    return render(request, 'upload.html', {'form': form})

@login_required
def gallery(request):
    images = SketchImage.objects.filter(user=request.user).order_by('-uploaded_at')
    return render(request, 'gallery.html', {'images': images})

def logout_view(request):
    logout(request)
    return redirect('login')

def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('gallery')
            else:
                messages.error(request, 'Invalid username or password')
    else:
        form = LoginForm()
    return render(request, 'login.html', {'form': form})

def register(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            # Manually handle user creation
            username = form.cleaned_data['username']
            password = form.cleaned_data['password1']

            # Create user
            user = User.objects.create_user(username=username, password=password)
            user.save()

            # Log the user in automatically
            login(request, user)

            messages.success(request, 'Your account has been created successfully and you are logged in.')
            return redirect('gallery')
    else:
        form = RegistrationForm()
    
    return render(request, 'register.html', {'form': form})