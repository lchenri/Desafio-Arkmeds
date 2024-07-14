from django.shortcuts import render


def home(request):
    return render(request, 'website/pages/home.html')


def add_equipamento(request):
    return render(request, 'website/pages/add_equipamento.html')
