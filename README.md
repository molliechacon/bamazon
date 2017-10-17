# Bamazon

## Overview

Bamazon is an app where customers can view and purchase items. Item inventory information is stored in a MySQL database and accessed by the customer via node.js. 


## Functionality

On load, all products will appear and the user will be prompted to enter the item number and quantity of the the product they wish to purchase:

![alt tag](/screenshots/onload.PNG)


If the customer has entered his/her choice and the quantity desired was available, they are shown a confirmation of the order and the total price. After the transaction is completed, the customer is again shown the list of products and asked to continue shopping. From here, they can choose a new item to purchase.

![alt tag](/screenshots/full.PNG)

If the customer has requested more items than are currently in stock, they are notified that there is not enough stock and asked to please make another selection. The list of products is once again displayed and customer is asked which item they would like to purchase.

![alt tag](/screenshots/out.PNG)






