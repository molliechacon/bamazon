var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306, 
    user: "root", 
    password: "",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
});

function start() {
    var query = connection.query("SELECT item_id, product_name, price FROM products", function(err, res) {
        if (err) throw err;
        // console.log(res);

        console.log("\nProducts:\n");
        for (var i = 0; i < res.length; i++) {
            console.log("Item #: " + res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
        }
        console.log("---------------------------------\n");

        inquirer.prompt([
            {
                name: "id",
                type: "rawlist",
                choices: function(value) {
                    var idArray = [];
                    for (var i = 0; i < res.length; i++) {
                        idArray.push(res[i].item_id);
                    }
                    return idArray;
                },
                message: "Which item would you like to purchase?"
            }, 
            {
                name: "quantity",
                type: "input", 
                message: "How many of this item do you want to purchase?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        ]).then(function(answer) {
            if () {

            } else {

            }

        })

            }
        })
    });
}
