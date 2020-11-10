"use strict";

const request = new XMLHttpRequest();
request.open('GET', 'php/app.php');
request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
request.send();

request.addEventListener('load', () => {
    if (request.status === 200) {
        const data = JSON.parse(request.response);
        render(data, renderTableBody, sortColumn);
    } else {
        alert('Ошибка загрузки данных с сервера!');
    }
});

function render (data, renderTableBody, sortColumn) {
    const tableHeader = document.querySelector('.table-headers');
    const headerClass = 'table-header';
    let htmlCode = `<th class=${headerClass}>Место</th>
    <th class=${headerClass}>ФИО</th>
    <th class=${headerClass}>Город</th>
    <th class=${headerClass}>Машина</th>`;

    for (let i = 0; i < data[0].results.length; i++) {
        htmlCode += `<th class='${headerClass} sort-header' title='Отсортировать по данному полю'>Результат заезда №${i + 1}</th>`;
    }
    
    htmlCode += `<th class='${headerClass} sort-header' title='Отсортировать по данному полю'>Общеe количество очков</th>`;

    tableHeader.innerHTML = htmlCode;
    renderTableBody(data, tableHeader, sortColumn);
}


function renderTableBody (data, tableHeader, sortColumn) {
    const tableBody = document.querySelector('.data');
    let counterRacer = 1;
    let htmlCode = '';
    const tableItem = 'table-item';
    for (let racer of data) {      
        htmlCode += `<tr class=${tableItem}>
        <td class='place'>${counterRacer++}</td>
        <td>${racer.name}</td>
        <td>${racer.city}</td>
        <td>${racer.car}</td>`;

        for (let i = 0; i < racer.results.length; i++) {
            htmlCode += `<td>${racer.results[i]}</td>`;
        }

        htmlCode +=`<td>${racer.totalSum}</td>
        </tr>`;
    }
    tableBody.innerHTML += htmlCode;
    sortColumn(tableBody, tableHeader);
}

function sortColumn(tableBody, tableHeader) {
    tableHeader.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('sort-header')) {
            const indexOfColumn = [...tableHeader.children].indexOf(e.target);
            let a, b;
            let nextIteration = true;
       
            while(nextIteration) {
                nextIteration = false;
                const rows = [...tableBody.rows];
                for (let i = 0; i < rows.length - 1; i++) {
                    a = rows[i].children[indexOfColumn];
                    b = rows[i + 1].children[indexOfColumn];
                   
                    if (+a.textContent < +b.textContent) {    
                        tableBody.insertBefore(rows[i + 1], rows[i]);
                        nextIteration = true;  
                    }
                  }  
            }
            updateTable(tableBody, indexOfColumn);
    }
    })
    tableHeader.lastChild.click();
}

function updateTable(tableBody, indexOfColumn) {
    document.querySelectorAll('.active').forEach((item) => {
        item.classList.remove('active');
    });

    Array.from(tableBody.children).forEach((item, index) => {
        item.children[0].textContent = index + 1;
        item.children[indexOfColumn].classList.add('active');
    })

    tableBody.previousElementSibling.children[0].children[indexOfColumn].classList.add('active');
}




