from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from .Equipamento_model_base import EquipamentoModelBase, Equipamento
import json
from django.forms.models import model_to_dict
from django.urls import reverse


class EquipamentoViewTest(APITestCase, EquipamentoModelBase):
    def setUp(self):
        self.client = APIClient()
        self.data = self.equipamento_maker()
        return super().setUp()

    def test_equipamento_list_get(self):
        modelo = "RESRB001"

        response = self.client.get(reverse('api:read_create'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Equipamento.objects.count(), 1)
        self.assertEqual(Equipamento.objects.get(pk=1).modelo, modelo)

    def test_equipamento_list_post(self):
        data_dict = model_to_dict(self.data)

        response = self.client.post(reverse('api:read_create'), data=json.dumps(data_dict), content_type='application/json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Equipamento.objects.count(), 2)
        self.assertEqual(Equipamento.objects.get(pk=2).modelo, data_dict['modelo'])

    def test_equipamento_list_post_serializer_invalid(self):
        data_dict = model_to_dict(self.data)
        data_dict.pop('modelo')

        response = self.client.post('/api/equipamentos/', data=json.dumps(data_dict), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Equipamento.objects.count(), 1)

    def test_equipamento_detail_get(self):
        data_dict = model_to_dict(self.data)
        data_dict['modelo'] = "RSTK200"
        self.client.post(reverse('api:read_create'), data=json.dumps(data_dict), content_type='application/json')

        response = self.client.get(reverse('api:read_update_delete', kwargs={'pk': 1}))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertNotEqual(Equipamento.objects.get(pk=1).modelo, data_dict['modelo'])

    def test_equipamento_detail_get_when_equipamento_does_not_exist(self):

        response = self.client.get(reverse('api:read_update_delete', kwargs={'pk': 2}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_equipamento_detail_put(self):
        data_dict = model_to_dict(self.data)
        data_dict['modelo'] = "RSTK200"

        response = self.client.put(reverse('api:read_update_delete', kwargs={'pk': 1}), data=json.dumps(data_dict), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Equipamento.objects.get(pk=1).modelo, data_dict['modelo'])

    def test_equipamento_detail_put_serializer_invalid(self):
        data_dict = model_to_dict(self.data)
        data_dict.pop('modelo')

        response = self.client.put(reverse('api:read_update_delete', kwargs={'pk': 1}), data=json.dumps(data_dict), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_equipamento_detail_delete(self):

        response = self.client.delete(reverse('api:read_update_delete', kwargs={'pk': 1}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Equipamento.objects.count(), 0)
