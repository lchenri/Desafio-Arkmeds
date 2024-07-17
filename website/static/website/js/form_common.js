document.getElementById('data_compra').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
    }
    if (value.length >= 5) {
        value = value.slice(0, 5) + '/' + value.slice(5);
    }
    e.target.value = value.slice(0, 10);
});

document.getElementById('valor_compra').addEventListener('input', function (e) {
    var value = e.target.value.replace(/\D/g, '');

    if (value.length === 0) {
        e.target.value = '';
        return;
    }

    var floatVal = parseFloat(value) / 100;
    e.target.value = floatVal.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
});

function getEquipamentoData() {
    var valor_compra = document.getElementById('valor_compra').value;
    valor_compra = valor_compra.replace(/[^\d,-]/g, '').replace(',', '.');
    return {
        tipo: document.getElementById('tipo').value,
        fabricante: document.getElementById('fabricante').value,
        modelo: document.getElementById('modelo').value,
        numero_de_serie: document.getElementById('numero_de_serie').value,
        data_compra: document.getElementById('data_compra').value,
        valor_compra: parseFloat(valor_compra),
    };
}