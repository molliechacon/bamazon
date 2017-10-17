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
    displayProducts();
});


function displayProducts() {
    var query = connection.query("SELECT item_id, product_name, price FROM products", function(err, res) {
        if (err) throw err;

        // log all products
        console.log("\nProducts:\n");
        for (var i = 0; i < res.length; i++) {
            console.log("Item #: " + res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
        }
        console.log("---------------------------------\n");

        customerInquiry();
    });
};


function customerInquiry() {

    // ask user what item and in what quantity they want
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "Which item number would you like to purchase?"
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
        var chosenId = answer.id;
        var chosenQuantity = answer.quantity;

        purchase(chosenId, chosenQuantity);
    })
};



function purchase(id, quantity) {
    connection.query("SELECT * FROM products WHERE ?", { item_id: id }, function(err, res) {

        if (err) throw err;

        if (quantity <= res[0].stock_quantity) {

            var totalCost = quantity * res[0].price;
            var newQuantity = res[0].stock_quantity - quantity;

            connection.query("UPDATE products SET ? WHERE ?",
                    [ 
                        { 
                            stock_quantity: newQuantity
                        }, 
                        {
                            item_id: id
                        }
                    ]
                , function(err, res) {
                    console.log("Nice! We have what you need in stock. Your total cost for " + quantity + " of Item # " + id + " comes to: $" + totalCost);
                }
            )
        } else {
            console.log("Sorry, not enough stock. Please make another selection.");
        }
        displayProducts();
    });
};


