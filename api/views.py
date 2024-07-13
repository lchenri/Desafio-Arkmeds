from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response

from api.models import Equipamento
from api.serializers import EquipamentoSerializer


# import serializer aqui


@api_view(['GET', 'POST'])
def equipamentos_get_post(request):
    if request.method == 'GET':
        equipamentos = Equipamento.objects.all().order_by('-id')
        serializer = EquipamentoSerializer(equipamentos, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        return Response(request.data)


@api_view(['GET'])
def equipamentos_read(request, pk):
    if request.method == 'GET':
        return Response(f"EU SOU O READ id {pk}")


@api_view(['PUT'])
def equipamentos_edit(request, pk):
    return Response()


@api_view(['DELETE'])
def equipamentos_delete(request, pk):
    return Response()
