'use strict'

// DOM ELEMENTS //
let input = document.getElementById("inputValue");      //input value
let buttonSend = document.getElementById("buttonSend"); // button send
let recaller = document.getElementById("recall");

const boxLoad = document.getElementById("boxLoad");
const rightElement = document.getElementById("showas-quiest");
const img = document.getElementById("imgData");
const producttitle = document.getElementById("producttitle");
// DOM ELEMENTS //


// GLOBAL DATA //
let arrayObject = [];
let dataProduct = { id: null };
// GLOBAL DATA //


function sendId(id = '0') {
    if (id === '') return
    // check out validation //   
    if (id === dataProduct.id.toLocaleLowerCase()) {
        selectRandomProduct(arrayObject)
        input.style.border = 'black';
        input.value = ""
        return;
    }
    rightElement.textContent = `${dataProduct.id} No ${input.value}`;
    input.style.border = 'solid red 4px';
    input.value = "";

}


function selectRandomProduct(products = []) {
    // Clean the data product used before///
    boxLoad.style.display = "flex"
    producttitle.textContent = "";
    img.style.opacity = "0";
    // Clean the data product used before///


    const productsLength = products.length;
    const takeRandonElement = Math.floor(Math.random() * productsLength);
    const productSelected = products[takeRandonElement];
    dataProduct.id = productSelected.id;

    // Show new data product//
    img.src = productSelected.img;
    img.addEventListener('load', () => {
        boxLoad.style.display = "none";
        producttitle.textContent = productSelected.productName;
        img.style.opacity = "1";
    });

    img.style.maxWidth = "30%";
    // Show new data product//


    // Clean textContentt //
    rightElement.textContent = "";
}

async function getJson() {
    const data = await fetch('./products.json');
    const getJson = await data.json();
    arrayObject = getJson;
    selectRandomProduct(arrayObject);
}


getJson();
buttonSend.addEventListener('click', () => sendId(input.value.toLocaleLowerCase()));// send the id to test it //
recaller.addEventListener('click', () => selectRandomProduct(arrayObject))


