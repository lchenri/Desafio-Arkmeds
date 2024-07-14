from django.shortcuts import render


def home(request):
    return render(request, 'website/pages/home.html')
