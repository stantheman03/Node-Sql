var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Grandma@30',
    database: 'Bamazon_DB'
});

connection.connect(function(err){
    if(err) throw err
    console.log('Connection established for manager !!')
    Welcome();
});


function Welcome(){
    inquirer.prompt([
        {
            name: 'ManOptions',
            type: 'list',
            message: 'What would you like see or review ?',
            choices: [
                'products for sale',
                'Low inventory',
                'Add to Inventory',
                'Add new products',
                'Exsit'

            ]
        }
    ]).then(function(data){
        if(data.ManOptions === 'products for sale'){
            sales()
        }
        if(data.ManOptions === 'Low inventory' ){
            LowInv()
        }

        if(data.ManOptions === 'Add to Inventory'){
            addInv()
        }
        if(data.ManOptions === 'Add new products'){
            addProduct()
        }
        if(data.ManOptions === 'Exsit'){
            console.log('You are exsiting now !!')
        }
    })
};

function sales(){
    connection.query(
        'SELECT * FROM products', function(err, result){
            if(err) throw err;
            for(i=0;i<result.length;i++){
                console.log('-------------------------------------')
                console.log('ID' + result[i].id)
                console.log('Product Name' + result[i].product_name)
                console.log('Department' + result[i].department_name)
                console.log("Price" + result[i].price)
                console.log('Stock Quantity' + result[i].stock_quantity)
                console.log('-------------------------------------')
            }
        }
      
    )
    Welcome();
}

function LowInv(){
    connection.query(
        'SELECT * FROM products', function(err, res){
            for(i=0;i<res.length;i++){
                if(res[i].stock_quantity < 5){
                    console.log('-------------------------------------')
                    console.log('ID' + res[i].id)
                    console.log('Product Name' + res[i].product_name)
                    console.log('Department' + res[i].department_name)
                    console.log("Price" + res[i].price)
                    console.log('Stock Quantity' + res[i].stock_quantity)
                    console.log('-------------------------------------')
                }
            }

        }
    )
    Welcome();
}

function addInv(){
    connection.query(
        'SELECT * FROM products', function(err, data){
            if(err) throw err;
            for(i=0;i<data.length;i++){
                console.log('-------------------------------------')
                console.log('ID' + data[i].id)
                console.log('Product Name' + data[i].product_name)
                console.log('Department' + data[i].department_name)
                console.log("Price" + data[i].price)
                console.log('Stock Quantity' + data[i].stock_quantity)
                console.log('-------------------------------------')  
            }
            inquirer.prompt([
                {
                    name: 'itemId',
                    type: 'input',
                    message: 'To which inventory would you like to add ?',
                    validate: function (value) {
                        if (isNaN(value) == false) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                },
                {
                    name: 'amount',
                    type: 'input',
                    message: 'How many would you like to add',
                    validate: function (value) {
                        if (isNaN(value) == false) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            ]).then(function(answer){
                connection.query(
                    'SELECT * FROM products WHERE ?',
                    [{
                        id:answer.itemId
                    }],
                    function(err, pickedItem){
                        if(err) throw err;
                        console.log('You have added ' + answer.amount + " " + pickedItem[0].product_name + ' to the inventory')
                        connection.query(
                            'UPDATE products SET ?',
                            [{
                                stock_quantity: parseInt(pickedItem[0].stock_quantity) + parseInt(answer.amount),
                                id: answer.itemId
                            }], function(err, inv){
                                if(err) throw err;
                                Welcome()
                            }
                        )
                    }
                )
            })

    
        }
    )
}


function addProduct(){
    inquirer.prompt([
        {
            name: 'addProducts',
            typ: 'input',
            message: 'What products would you like to add ?'
        },
        {
            name:'addtoDep',
            type: 'input',
            message: 'What department are you adding it too ?'
        },
        {
            name: 'addPrice',
            type: 'input',
            message: 'Pick a price'
        },
        {
            name: 'addtoStock',
            type: 'input',
            message: 'How many will you add'
        }
    ]).then(function(data){
        connection.query(
            'INSERT INTO products SET ?',
            {
                product_name: data.addProducts,
                department_name: data.addtoDep,
                price: data.addPrice,
                stock_quantity: data.addtoStock

            },function(err, answer){
                if(err) throw err;
                console.log(data.addProducts + " have been successfully added")
            }
        )
    })
}

 Welcome();