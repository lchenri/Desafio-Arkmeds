from ..models import Equipamento

class EquipamentoModelBase:

    def equipamento_maker(self):
        equipamento = Equipamento.objects.create(
            tipo="Respirador",
            fabricante="Respire Bem LTDA",
            modelo="RESRB001",
            numero_de_serie="9999RESRB0130BR",
            data_compra="12/04/2024",
            valor_compra=3000.99
        )
        return equipamento