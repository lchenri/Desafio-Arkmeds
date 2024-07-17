from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from api.models import Equipamento
from api.serializers import EquipamentoSerializer
from django.http import Http404


class EquipamentoList(APIView):
    def get(self, request):
        equipamentos = Equipamento.objects.all().order_by('-id')
        serializer_get = EquipamentoSerializer(equipamentos, many=True)
        return Response(serializer_get.data)

    def post(self, request):
        serializer_post = EquipamentoSerializer(data=request.data)

        if not serializer_post.is_valid():
            return Response("A request não está completa", status=status.HTTP_400_BAD_REQUEST)

        serializer_post.save()
        return Response(serializer_post.data, status=status.HTTP_201_CREATED)


class EquipamentoDetail(APIView):
    def get_object(self, pk):
        try:
            return Equipamento.objects.get(pk=pk)
        except Equipamento.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        equipamento = self.get_object(pk)
        serializer = EquipamentoSerializer(equipamento, many=False)
        return Response(serializer.data)

    def put(self, request, pk):
        equipamento = self.get_object(pk)
        serializer = EquipamentoSerializer(instance=equipamento, data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        equipamento = self.get_object(pk)
        equipamento.delete()
        return Response("Item deletado com sucesso!", status=status.HTTP_204_NO_CONTENT)



