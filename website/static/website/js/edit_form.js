let id;
document.addEventListener("DOMContentLoaded", function(){
    const formBody = document.querySelector(".form-body");
    id = formBody.getAttribute("data-id");
    fetchEquipamentos()
});

document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    const body = getEquipamentoData();
    sendEquipamentoPutRequest(body);
})

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

function sendEquipamentoPutRequest(body) {
    //console.log(body);
    const api = `http://127.0.0.1:8000/api/equipamentos/${id}/`;

    fetch(api, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getToken('csrftoken'),
        },
        body: JSON.stringify(body),
    })
        .then(response => response.json())
        .then(() => {
            //colocar modal de sucesso aqui!
            showSuccessModal();
            console.log("Atualizado com sucesso");
        })
        .catch((error) => {
            console.error(error);
        });
}

function showSuccessModal(){
    $('#exampleModal').modal('show');
}


async function fetchEquipamentos(){
    const response = await fetch(`http://127.0.0.1:8000/api/equipamentos/${id}/`);
    if(response.ok) {
        const equipamento = await response.json();

        // Preenche os campos do formulário com os dados do equipamento
        document.getElementById('tipo').value = equipamento.tipo;
        document.getElementById('fabricante').value = equipamento.fabricante;
        document.getElementById('modelo').value = equipamento.modelo;
        document.getElementById('numero_de_serie').value = equipamento.numero_de_serie;
        document.getElementById('data_compra').value = equipamento.data_compra;
        document.getElementById('valor_compra').value = equipamento.valor_compra;
    } else {
        console.error('Erro ao buscar dados do equipamento');
    }
}





