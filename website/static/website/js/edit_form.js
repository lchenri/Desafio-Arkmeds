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


function sendEquipamentoPutRequest(body) {
    //console.log(body);
    if(body.valor_compra === ""){
        body.valor_compra = null;
    }
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





