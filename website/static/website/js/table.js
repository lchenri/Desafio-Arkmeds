async function fetchEquipamentos(){
    const apiGet = "http://127.0.0.1:8000/api/equipamentos/"
    try{
        const response = await fetch(apiGet);
        return await response.json();
    }catch(error){
        console.error("Erro ->", error );
        return [];
    }
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

async function exportTableToCSV(){
    const equipamentos = await fetchEquipamentos();
    const equipamentosCsv = equipamentos.map(equipamento =>
        [
            equipamento.id,
            equipamento.tipo,
            equipamento.fabricante,
            (equipamento.valor_compra),
            equipamento.modelo,
            equipamento.numero_de_serie,
            equipamento.data_compra
        ].join(",")
    ).join("\n");

    const csvHeader = "Id,Tipo,Fabricante,Valor de compra,Modelo,Número de série,Data de Compra\n";
    const csvContent = "data:text/csv;charset=utf-8," + csvHeader + equipamentosCsv;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "equipamentos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


async function renderTable(){
    const equipamentos = await fetchEquipamentos();
    const tableWidget = document.getElementsByClassName('table-widget');

    const itemsOnPage = 12;

    const numberOfPages = Math.ceil(equipamentos.length / itemsOnPage);

    const start = (new URLSearchParams(window.location.search)).get('page') || 1;

    const currencyFormat = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    const mappedRecords = equipamentos
        .filter((_, i) => (
                ((start - 1) * itemsOnPage) < i + 1) &&
            (i+1 <= start * itemsOnPage)
        )
        .map(
            (equipamento) => {
                const valor_compra_formatado = currencyFormat.format(equipamento.valor_compra);
                return `<tr data-id="${equipamento.id}">
                    <td>
                        ${equipamento.id}
                    </td>
                    <td>
                        ${equipamento.tipo}
                    </td>
                    <td>
                        ${equipamento.fabricante}
                    </td>
                    <td>
                        <span class="valor-compra-highlighted">
                            ${valor_compra_formatado}
                        </span>
                    </td>
                    <td>
                        ${equipamento.modelo}
                    </td>
                    <td>
                        ${equipamento.numero_de_serie}
                    </td>
                    <td>
                        <span class="icons-actions-container">
                            <a href="#" class="view-equipamento" data-id="${equipamento.id}"><i class="fa-solid fa-eye"></i></a>
                            <a href="editar-equipamento/${equipamento.id}"><i class="fa-solid fa-pen"></i></a>
                            <a href="#" class="delete-equipamento" data-id="${equipamento.id}"><i class="fa-solid fa-trash-can"></i></a>
                        </span>
                    </td>
                </tr>`;
            }
        );


    const linkList = [];

    for (let i = 0; i < numberOfPages; i++) {
        const pageNumber = i + 1;
        linkList.push(
            `<li>
                <a
                    href="?page=${pageNumber}"
                    ${pageNumber == start ? 'class="active"' : ''}
                    title="page ${pageNumber}">
                    ${pageNumber}
                </a>
            </li>`
        );
    }

    tableWidget[0].innerHTML = DOMPurify.sanitize(`<table>
        <caption>
            <span>Equipamentos</span>
            <span class="table-row-count">(${equipamentos.length})</span>
        </caption>
        <thead>
            <tr>
                <th>Id</th>
                <th>Tipo</th>
                <th>Fabricante</th>
                <th>Valor de compra</th>
                <th>Modelo</th>
                <th>Número de série</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody id="table-rows">
            ${mappedRecords.join('')}
        </tbody>
        <tfoot>
            <tr>
                <td colspan="6">
                    <ul class="pagination">
                        ${linkList.join('')}
                    </ul>
                </td>
            </tr>
        </tfoot>
    </table>`);


    const exportCsvButton = document.createElement('button');
    exportCsvButton.className = 'button-fold button-caption';
    exportCsvButton.textContent = 'Exportar CSV';

    const caption = tableWidget[0].querySelector('caption');
    caption.appendChild(exportCsvButton);

    exportCsvButton.addEventListener('click', () => {
        //e.preventDefault();
        exportTableToCSV();
        console.log("Exportar CSV clicado!")
    })


    const deleteIcons = document.querySelectorAll('.delete-equipamento');
    deleteIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            const equipamentoId = icon.getAttribute('data-id');
            $('#modal-equipamento-id').text(equipamentoId);
            $('#deleteModal').modal('show');
            $('#delete-confirm-btn').data('equipamentoId', equipamentoId);
        });
    });

    const viewIcons = document.querySelectorAll('.view-equipamento');
    viewIcons.forEach(icon => {
        icon.addEventListener('click', async (e) => {
            e.preventDefault();
            const equipamentoId = icon.getAttribute('data-id');
            $('#modal-equipamento-id-view').text(equipamentoId);

            const response = await fetch(`http://127.0.0.1:8000/api/equipamentos/${equipamentoId}/`);
            if(response.ok){
                const equipamento = await response.json();

                $('#id-equip').val(equipamento.id);
                $('#tipo').val(equipamento.tipo);
                $('#fabricante').val(equipamento.fabricante);
                $('#modelo').val(equipamento.modelo);
                $('#numero_de_serie').val(equipamento.numero_de_serie);
                $('#data_compra').val(equipamento.data_compra);
                $('#valor_compra').val(equipamento.valor_compra);

                $('#edit-button').attr('href', `editar-equipamento/${equipamento.id}`);
            }else{
                console.error("Erro ao buscar os dados do equipamento.")
            }

            $('#viewModal').modal('show');
            $('#delete-from-view').data('equipamentoId', equipamentoId);
        });
    });


    $('#delete-from-view').off('click').on('click', function() {
        const equipamentoId = $(this).data('equipamentoId');
        $('#modal-equipamento-id').text(equipamentoId);
        $('#delete-confirm-btn').data('equipamentoId', equipamentoId);
        $('#viewModal').modal('hide');
        $('#deleteModal').modal('show');
    });



    $('#delete-confirm-btn').off('click').on('click', function() {
       const equipamentoId = $(this).data('equipamentoId');
        fetch(`http://127.0.0.1:8000/api/equipamentos/${equipamentoId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getToken('csrftoken'),
            }
        }).then((response) => {
            if(response.ok) {
                console.log(`${equipamentoId} apagado`);
                renderTable();
            } else {
                console.error('Erro ao apagar o equipamento');
            }
        });
        $('#deleteModal').modal('hide');
    });





}

renderTable();