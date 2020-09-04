// call readline-sync module
const readlineSync = require('readline-sync');

// variable to set price
var price = readlineSync.questionFloat("Digite o preço do produto: ");

// variable to define product category
var category = readlineSync.questionInt(`
    Digite a categoria do produto: 
        1 - Limpeza;
        2 - Alimentação;
        3 - Vestuário;
`);

// variable to define situation (refrigeration or not)
var situation = readlineSync.question(`
    Digite a situação do produto:   
        R - Produtos que necessitam de Refrigeração;
        N - Produtos que NÃO necessitam de Refrigeração;  
`);

// function to specify category's name
function categType (category){
        if(category == 1){
            category = "Limpeza";
        } else if(category == 2) {
            category = "Alimentação";
        } else if(category == 3){
            category = "Vestuário";
        } else {
            throw new Error(`
                O código digitado não corresponde à nenhuma categoria de produto! 
                Digite 1 - Limpeza, 2 - Alimentação, 3 - Vestuário.
            `);
        }
        return category;
}

// function to define extra increase due to refrigeration
function refrigeration(situation){
    if(situation == 'R' || situation == 'r'){
        var extraInc = 1.025
        return extraInc;
    } else if(situation == 'N' || situation == 'n'){
        var extraInc = 1;
        return extraInc;
    } else {
        throw new Error(`
            O código digitado não corresponde à nenhuma opção de situação do produto! 
            Digite R para produtos que necessitam de Refrigeração ou N para os que não precisam.
        `);
    }
}

// function to define the tax related to product's category 
function categoryIncrease (category){
    if(price <= 78){
        if(category == 1){
            var increase = 5.25;
        } else if(category == 2){
            var increase = 8.39;
        } else {
            var increase = 9.10;
        }
        return increase;
    } else{
        if(category == 1){
            var increase = 12.45;
        } else if(category == 2){
            var increase = 1.50;
        } else {
            var increase = 1.82;
        }
        return increase;
    }
}

// function to calculate the final price
function finalPrice(price, category, situation){
    if(situation == 'R'|| situation == 'r'){
        var finalPrice =  (price + (price * categoryIncrease(category) / 100)) * refrigeration(situation);
        console.log(`
            O produto de ${categType(category)} de valor inicial R$ ${price} reais
            terá dois aumentos, sendo um de ${categoryIncrease(category)}% e outro de 2.5% (Refrigeração), 
            passando a custar o valor final de R$ ${finalPrice.toFixed(2)} reais.
        `);
    } else if(situation == 'N'|| situation == 'n'){
        var finalPrice =  (price + (price * categoryIncrease(category) / 100)) * refrigeration(situation);
        console.log(`
            O produto de ${categType(category)} de valor inicial R$ ${price} reais 
            terá apenas um aumento de ${categoryIncrease(category)}% e passará a custar R$ ${finalPrice.toFixed(2)} reais.
        `);
    }
}

finalPrice(price, category, situation);
