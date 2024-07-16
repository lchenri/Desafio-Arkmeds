from django.test import TestCase
from .Equipamento_model_base import EquipamentoModelBase

class EquipamentoModelTest(TestCase, EquipamentoModelBase):
    def setUp(self):
        self.equipamento = self.equipamento_maker()
        return super().setUp()

    def test_api_equipamento_model_string_representation(self):
        needed = "RESRB001 - " + "Respire Bem LTDA"

        self.assertEqual(
            str(self.equipamento), needed,
            msg=f"Representação da string do modelo deveria ser {needed} porém recebeu o valor {str(self.equipamento)}"
        )
