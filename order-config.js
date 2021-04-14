function addFood1() {
    var element = document.getElementById('addFood1'); 
    value = Number(element.getAttribute('value'))+1; 
    element.setAttribute('value', value);
    element.innerHTML = value;
}
function removeFood1() {
    var element = document.getElementById('addFood1'); 
    valueRemoveFood = Number(element.getAttribute('value'))-1;
    value = (valueRemoveFood < 0) ? 0 : valueRemoveFood;
    element.setAttribute('value', value);
    element.innerHTML = value;
}

function addFood2() {
    var element = document.getElementById('addFood2'); 
    value = Number(element.getAttribute('value'))+1; 
    element.setAttribute('value', value);
    element.innerHTML = value;
}
function removeFood2() {
    var element = document.getElementById('addFood2'); 
    valueRemoveFood = Number(element.getAttribute('value'))-1;
    value = (valueRemoveFood < 0) ? 0 : valueRemoveFood;
    element.setAttribute('value', value);
    element.innerHTML = value;
}

function addDrink1() {
    var element = document.getElementById('addDrink1'); 
    value = Number(element.getAttribute('value'))+1; 
    element.setAttribute('value', value);
    element.innerHTML = value;
}
function removeDrink1() {
    var element = document.getElementById('addDrink1'); 
    valueRemoveDrink = Number(element.getAttribute('value'))-1;
    value = (valueRemoveDrink < 0) ? 0 : valueRemoveDrink;
    element.setAttribute('value', value);
    element.innerHTML = value;
}

function addDrink2() {
    var element = document.getElementById('addDrink2'); 
    value = Number(element.getAttribute('value'))+1; 
    element.setAttribute('value', value);
    element.innerHTML = value;
}
function removeDrink2() {
    var element = document.getElementById('addDrink2'); 
    valueRemoveDrink = Number(element.getAttribute('value'))-1;
    value = (valueRemoveDrink < 0) ? 0 : valueRemoveDrink;
    element.setAttribute('value', value);
    element.innerHTML = value;
}

function sumOrder() {
    var addFood1 = document.getElementById('addFood1'); 
    var addFood2 = document.getElementById('addFood2'); 
    var addDrink1 = document.getElementById('addDrink1');
    var addDrink2 = document.getElementById('addDrink2');

    var item1 = document.getElementById('item1');
    item1.innerHTML = Number(addFood1.getAttribute('value'));
    var item2 = document.getElementById('item2');
    item2.innerHTML = Number(addFood2.getAttribute('value'));
    var item3 = document.getElementById('item3');
    item3.innerHTML = Number(addDrink1.getAttribute('value'));
    var item4 = document.getElementById('item4');
    item4.innerHTML = Number(addDrink2.getAttribute('value'));

    var price1 = 15000 * Number(addFood1.getAttribute('value'));
    var price2 = 15000 * Number(addFood2.getAttribute('value'));
    var price3 = 4000 * Number(addDrink1.getAttribute('value'));
    var price4 = 5000 * Number(addDrink2.getAttribute('value'));

    var sumPrice = price1 + price2 + price3 + price4;

    subTotal1 = document.getElementById('price1');
    subTotal1.innerHTML = price1;
    subTotal2 = document.getElementById('price2');
    subTotal2.innerHTML = price2;
    subTotal3 = document.getElementById('price3');
    subTotal3.innerHTML = price3;
    subTotal4 = document.getElementById('price4');
    subTotal4.innerHTML = price4;

    var total = document.getElementById('total');
    total.innerHTML = sumPrice;
}