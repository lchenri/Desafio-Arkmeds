from django.db import models


class Equipamento(models.Model):
    tipo = models.CharField(max_length=100)
    fabricante = models.CharField(max_length=100)
    modelo = models.CharField(max_length=100)
    numero_de_serie = models.CharField(max_length=100)
    data_compra = models.CharField(max_length=15)
    valor_compra = models.FloatField()

    def __str__(self):
        return f"{self.modelo} - {self.fabricante}"
