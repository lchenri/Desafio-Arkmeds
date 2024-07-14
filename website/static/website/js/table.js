const api = "http://127.0.0.1:8000/api/equipamentos/"
async function fetchEquipamentos(){
    try{
        const response = await fetch(api);
        if(!response.ok){
            throw new Error('Erro ao fazer requisição para a API');
        }
        const equipamentos = await response.json();
        return equipamentos;
    }catch(error){
        console.error("Erro ->", error );
        return [];
    }
}

async function exportTableToCSV(selector){
    const equipamentos = await fetchEquipamentos();
    const equipamentosCsv = equipamentos.map(equipamento =>
        [
            equipamento.id,
            equipamento.tipo,
            equipamento.fabricante,
            new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(equipamento.valor_compra),
            equipamento.modelo,
            equipamento.numero_de_serie
        ].join(",")
    ).join("\n");

    const csvHeader = "Id,Tipo,Fabricante,Valor de compra,Modelo,Número de série\n";
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

    const itemsOnPage = 5;

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
                            <a href="view/${equipamento.id}"><i class="fa-solid fa-eye"></i></a>
                            <a href="edit/${equipamento.id}"><i class="fa-solid fa-pen"></i></a>
                            <a href="delete/${equipamento.id}"><i class="fa-solid fa-trash-can"></i></a>
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

    const table = DOMPurify.sanitize(`<table>
        <caption>
            <span>Equipamentos</span>
            <span class="table-row-count">(${equipamentos.length})</span>
            <!--<button class="button-fold" id="export-csv-btn">Exportar CSV</button>-->
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
                        <!--? generated pages -->
                        ${linkList.join('')}
                    </ul>
                </td>
            </tr>
        </tfoot>
    </table>`);

    tableWidget[0].innerHTML = table;

    const exportCsvButton = document.createElement('button');
    exportCsvButton.className = 'button-fold button-caption';
    exportCsvButton.textContent = 'Exportar CSV';

    const caption = tableWidget[0].querySelector('caption');
    caption.appendChild(exportCsvButton);

    exportCsvButton.addEventListener('click', (e) => {
        //e.preventDefault();
        exportTableToCSV();
        console.log("Exportar CSV clicado!")
    })

    const tableRows = document.querySelectorAll('#table-rows tr');
    tableRows.forEach(row => {
        row.addEventListener('click', () => {
            const equipamentoId = row.getAttribute('data-id');
            console.log(`Id do equipamento: ${equipamentoId}`);
        });
    });
}


renderTable();