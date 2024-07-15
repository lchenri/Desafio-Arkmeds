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

document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    const body = getEquipamentoData();
    sendEquipamentoPostRequest(body);
})


function getEquipamentoData() {
    return {
        tipo: document.getElementById('tipo').value,
        fabricante: document.getElementById('fabricante').value,
        modelo: document.getElementById('modelo').value,
        numero_de_serie: document.getElementById('numero_de_serie').value,
        data_compra: document.getElementById('data_compra').value,
        valor_compra: document.getElementById('valor_compra').value,
    };
}

function clearForm(){
    document.getElementById('tipo').value = '';
    document.getElementById('fabricante').value = '';
    document.getElementById('modelo').value = '';
    document.getElementById('numero_de_serie').value = '';
    document.getElementById('data_compra').value = '';
    document.getElementById('valor_compra').value = '';
}

function getToken(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie != '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0,name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function showSuccessModal(){
    $('#exampleModal').modal('show');
}

function sendEquipamentoPostRequest(body) {
    //console.log(body);
    const api = "http://127.0.0.1:8000/api/equipamentos/";

    fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getToken('csrftoken'),
        },
        body: JSON.stringify(body),
    })
        .then(response => response.json())
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
