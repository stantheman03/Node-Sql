var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Grandma@30',
    database: 'Bamazon_DB'
})

connection.connect(function (err) {
    if (err) throw err;
    console.log('Connection estabished !')
})

function Welcome() {
    connection.query(
        'SELECT * FROM products',
        function (err, res) {
            for (i = 0; i < res.length; i++) {
                console.log('-------------------------------------')
                console.log('ID' + res[i].id)
                console.log('Product Name' + res[i].product_name)
                console.log('Department' + res[i].department_name)
                console.log("Price" + res[i].price)
                console.log('Stock Quantity' + res[i].stock_quantity)
                console.log('-------------------------------------')
            }
            inquirer.prompt([{
                    name: 'id',
                    type: 'input',
                    message: 'What is the product ID, you would like to purchase',
                    validate: function (value) {
                        if (isNaN(value) == false) {
                            return true;
                        } else {
                            return false;
                        }
                    }

                },
                {
                    name: 'quantity',
                    type: 'input',
                    message: 'How many would you like to purchase',
                    validate: function (value) {
                        if (isNaN(value) == false) {
                            return true;
                        } else {
                            return false;
                        }
                    }

                }
            ]).then(function (data) {
                var quantity = data.quantity
                var itemID = data.id
                connection.query('SELECT * FROM products WHERE ?',
                    [{
                        id: itemID
                    }],
                    function (err, pickedItem) {
                        if (err) throw err;
                        if (pickedItem[0].stock_quantity - quantity >= 0) {
                            var total = quantity * pickedItem[0].price;
                            console.log('Our Inventory has enough Items: ' + pickedItem[0].product_name);
                            console.log('Quantity in stock: ' + pickedItem[0].stock_quantity + 'User order: ' + quantity)
                            console.log('Your bill is $$: ' + total + 'Thank you for shopping')
                            var update = connection.query(
                                'UPDATE products SET stock_quantity WHERE id=?',
                                [pickedItem[0].stock_quantity - quantity, itemID],
                                function (err, inv) {
                                    if (err) {
                                        continueShop()
                                    } else {
                                        console.log('Insufficent quantity, Consumer adjust your order' + pickedItem[0].stock_quantity)
                                    }

                                }
                            )
                        }
                    }
                )
            })

        }
    )
}

function continueShop(){
    inquirer.prompt([
        {
        name: 'continueShop',
        type: 'list',
        message: 'Continue Shopping ?',
        choices: ['Yes', 'No']

    }
]).then(function(answ){
if(answ.continueShop === 'Yes'){
    Welcome()
}else{
    console.log("Thank you for shopping, PLease come again !!")
}

})
}
Welcome();