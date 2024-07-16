from django.db import models


class Equipamento(models.Model):
    tipo = models.CharField(max_length=100)
    fabricante = models.CharField(max_length=100)
    modelo = models.CharField(max_length=100)
    numero_de_serie = models.CharField(max_length=100)
    data_compra = models.CharField(max_length=15, blank=True)
    valor_compra = models.FloatField(blank=True, default=0, null=True)

    def __str__(self):
        return f"{self.modelo} - {self.fabricante}"
