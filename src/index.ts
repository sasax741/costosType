const bAdd:HTMLButtonElement = document.getElementById('bAdd') as HTMLButtonElement;
const inputTitle:HTMLInputElement = document.getElementById('title') as HTMLInputElement;
const inputCost:HTMLInputElement = document.getElementById('cost') as HTMLInputElement;
const inputCurrency:HTMLInputElement = document.getElementById('currency') as HTMLInputElement;

const expenses = new Expenses('USD');

bAdd!.addEventListener('click', event=>{
    if(inputTitle!.value != '' && inputCost.value != '' && !isNaN(parseFloat(inputCost.value))){
        const title:string = inputTitle.value;
        
        
        const cost:number = parseFloat(inputCost.value);
        const currency:Currency = inputCurrency.value as Currency;

        

        expenses.add({
            title: title,
            cost:{
                number:cost,
                currency:currency
            }
        });
        
        render();
    }
    else{
        alert('completa los datos correctamente');
    }
});

const render = ()=>{
    let html = '';

    expenses.getItems().forEach(item => {
        const {id, title, cost} = item;
        const {number, currency} = cost;

        html += `<div class="item">
                    <div><span class="currency">${currency}</span>${number}</div>
                    <div>${title}</div>
                    <div><button class="bEliminar" data-id="${id}">Eliminar</button></div>
                </div>`
    });
const items:HTMLElement|null = document.getElementById('items');

items!.innerHTML = html
const display:HTMLElement|null = document.getElementById('display');
display!.textContent = expenses.getTotal();
const botonEliminar = document.querySelectorAll('.bEliminar');

botonEliminar.forEach(bEliminar=>{
    bEliminar.addEventListener('click', event=>{
        const id = (event.target as HTMLButtonElement).getAttribute('data-id');
        expenses.remove(parseInt(id!));

        render();
    });
});

}