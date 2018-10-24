var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Grandma@30',
    database: 'Bamazon_DB'
    
});

function Welcome(){
    inquirer.prompt([
        {
            name: 'Duty',
            type: 'list',
            message: 'Do anything the Supervisor wants !!',
            choices: ['Sale by Department', 'New Department', 'End']
        }
    ]).then(function(res){
        if(res.Duty === 'Sale by Department'){
            SaleByDep()
        }
        if(res.Duty === 'New Department'){
            NewDep()
        }
        if(res.Duty === 'End'){
            console.log("Goodbye Supervisor !")
        }
    });
}

function SaleByDep(){
    connection.query(
        'SELECT * FROM Departments', function(err,res){
            if(err) throw err;
            console.log('--------------Sales By Each Department--------------')
            for(i=0;i<res.length;i++){
                console.log('Department ID: ' + res[i].DepartmentID)
                console.log('Department Name: ' + res[i].DepartmentName)
                console.log('Over Head Cost: ' + res[i].OverHeadCosts)
                console.log('Total Sales: ' + res[i].TotalSales)

                
                

            }
        }
    )
}

function NewDep(){
    console.log('----------Creating New Department-------------')
    inquirer.prompt([
        {
            type: 'input',
            name: 'deptName',
            message: ' New Department Name'
        },
        {
            type: 'input',
            name: 'overHeadCost',
            message: 'New OverHead cost'
        },
        {
            type: 'input',
            name: 'prodSales',
            message: 'New Product Sales'
        }
    ]).then(function(data){
        connection.query(
            'INSERT into Departments SET ?',
            {
                DepartmentName: data.deptName,
                OverHeadCosts: data.overHeadCost,
                TotalSales: data.prodSales
            },function(err,res){
                if(err) throw err;
                console.log('New department added by Supervisor !')
            }
        )
    })

}

Welcome();