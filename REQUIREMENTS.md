# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index: '/products/' [GET] 
- Show:  '/products/:id' [GET]
- Create: (args: name, price) [token required]: '/products/' [POST] (token)
- Delete: (args: id) [token required]: '/products/:id' [DELETE] (token)
- Update: (args: id, name, price)[token required]: '/products/:id' [PUT]

#### Users
- Index: [token required]:'/users/' [GET]
- Show:  (args: id) [token required]: '/users/:id' [GET]
- Create:(args: User) [token required]: '/users/' [POST] (token)
- Delete:(args: id) [token required]: '/users/' [DELETE] (token)
- Update: (args: id, first_name, last_name, password)[token required]: '/products/:id' [PUT]
#### Orders
- Index: [token required] : '/orders/' [GET] (token)
- Show: (args: id) [token required] : '/orders/:id' [GET] )
- Create:(args:status,user_id) [token required] : '/orders/' [POST] (token)
- Delete:(args: id) [token required]: '/orders/' [DELETE] (token)
- Update:(args: id, status) [token required]: '/orders/' [PUT] (token)
- addProduct:(args: quantity, order_id, product_id) [token required] :'/orders/:id/products' [PUT] (token)
## Data Shapes
#### Product
| Data | Data Types | Constraints  |
| ------------------ | ------------------ |  ------------------ |
| id | SERIAL | PRIMARY KEY |
| name | VARCHAR(150) | NOT NULL |
| price | INT | NOT NULL |


#### User
| Data | Data Types | Constraints  |
| ------------------ | ------------------ |  ------------------ |
| id | SERIAL | PRIMARY KEY |
| first_name | VARCHAR(150) | NOT NULL |
| last_name | VARCHAR(150) | NOT NULL |
| password | VARCHAR(255) | NOT NULL |

#### Orders
| Data | Data Types | Constraints  |
| ------------------ | ------------------ |  ------------------ |
| id | SERIAL | PRIMARY KEY |
| status | VARCHAR(30) | |
| user_id |INT |  REFERENCES users(id) |

#### ordered_products Table
| Data | Data Types | Constraints  |
| ------------------ | ------------------ |  ------------------ |
| id | SERIAL | PRIMARY KEY |
| order_id | bigint | REFERENCES orders(id) |
| product_id | bigint | REFERENCES products(id) |
| quantity | INT |  |
