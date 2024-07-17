
document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    const body = getEquipamentoData();
    sendEquipamentoPostRequest(body);
})


function clearForm(){
    document.getElementById('tipo').value = '';
    document.getElementById('fabricante').value = '';
    document.getElementById('modelo').value = '';
    document.getElementById('numero_de_serie').value = '';
    document.getElementById('data_compra').value = '';
    document.getElementById('valor_compra').value = '';
}


function showSuccessModal(){
    $('#exampleModal').modal('show');
}

function sendEquipamentoPostRequest(body) {
    if(body.valor_compra === ""){
        body.valor_compra = null;
    }
    const api = "http://127.0.0.1:8000/api/equipamentos/";

    fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getToken('csrftoken'),
        },
        body: JSON.stringify(body),
    })
        .then(response => {
            if (!response.ok) {
                return new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(() => {
            //colocar modal de sucesso aqui!
            console.log("Recebido com sucesso");
            clearForm();
            showSuccessModal();
        })
        .catch((error) => {
            console.error(error);
        });
}
