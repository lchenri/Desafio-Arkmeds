from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response

from api.models import Equipamento
from api.serializers import EquipamentoSerializer


# import serializer aqui


@api_view(['GET', 'POST'])
def manager_list_all_add_new(request):
    if request.method == 'GET':
        equipamentos = Equipamento.objects.all().order_by('-id')
        serializer_get = EquipamentoSerializer(equipamentos, many=True)
        return Response(serializer_get.data)
    elif request.method == 'POST':
        serializer_post = EquipamentoSerializer(data=request.data)

        if serializer_post.is_valid():
            serializer_post.save()

        return Response(serializer_post.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
def manager_read_update_delete(request, pk):
    if request.method == 'GET':
        equipamento = Equipamento.objects.get(pk=pk)
        serializer = EquipamentoSerializer(equipamento, many=False)
        return Response(serializer.data)
    elif request.method == 'PUT':
        equipamento = Equipamento.objects.get(pk=pk)
        serializer = EquipamentoSerializer(instance=equipamento, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        equipamento = Equipamento.objects.get(pk=pk)
        equipamento.delete()
        return Response("Item deletado com sucesso!", status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

