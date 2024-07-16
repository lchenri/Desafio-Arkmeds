from django.shortcuts import render


def home(request):
    return render(request, 'website/pages/home.html')


def add_equipamento(request):
    return render(request, 'website/pages/add_equipamento.html')


def edit_equipamento(request, pk):
    context = {'pk': pk}

    return render(request, 'website/pages/edit_equipamento.html', context)
