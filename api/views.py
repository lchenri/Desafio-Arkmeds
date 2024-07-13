from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response

from api.models import Equipamento
from api.serializers import EquipamentoSerializer


@api_view(['GET', 'POST'])
def manager_list_all_add_new(request):
    if request.method == 'GET':
        equipamentos = Equipamento.objects.all().order_by('-id')
        serializer_get = EquipamentoSerializer(equipamentos, many=True)
        return Response(serializer_get.data)
    elif request.method == 'POST':
        serializer_post = EquipamentoSerializer(data=request.data)

        if not serializer_post.is_valid():
            return Response("A request não está completa", status=status.HTTP_400_BAD_REQUEST)

        serializer_post.save()
        return Response(serializer_post.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
def manager_read_update_delete(request, pk):
    try:
        equipamento = Equipamento.objects.get(pk=pk)
    except Equipamento.DoesNotExist:
        return Response("Equipamento não encontrado no sistema", status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = EquipamentoSerializer(equipamento, many=False)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = EquipamentoSerializer(instance=equipamento, data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(serializer.data)
    elif request.method == 'DELETE':
        equipamento.delete()
        return Response("Item deletado com sucesso!", status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

