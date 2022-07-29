/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(30),
    user_id INT REFERENCES users(id)
);