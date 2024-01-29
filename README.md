# Marketplace

## Project Description:

Our product is a web application that serves as a marketplace for buyers and sellers to connect and engage in transactions. The application will offer a range of features and functionalities to facilitate product listing, browsing, and managing transactions between buyers and sellers.

## User Stories:

##### Buyers (B):

1. As a buyer, I want to be able to browse and search for products in the marketplace.
2. As a buyer, I want to be able to view product details and seller information.
3. As a buyer, I want to be able to add products to my cart
4. As a buyer, I want to be able to register/sign in so that I can check out securely.
5. As a registered buyer, I want to be able to track my orders and receive updates on their status.
6. As a registered buyer, I want to be able to check out my cart with Cash On Delivery payment options.

##### Sellers (S):

1. As a seller, I want to be able to register/sign in to my seller account
2. As a seller, I want to be able to list my products on the marketplace.
3. As a seller, I want to be able to manage my product listings and update them as needed.
4. As a seller, I want to be able to receive and manage orders from buyers.
5. As a seller, I want to be able to communicate with buyers regarding their orders.

##### Admins (A):

1. As an admin, I want to be able to log in/log out of my admin account.
2. As an admin, I want to be able to manage user accounts and access levels.
3. As an admin, I want to be able to keep track of transactions and activities on the marketplace.

## Features and Specifications

##### User Authentication

1. Allow users to sign up, log in, and log out of the marketplace application with appropriate role.
2. Ensure that only authorized users have access to the appropriate features.
3. Use encryption to securely store user passwords and other sensitive information.

##### Product Listing and Search

1. Allow sellers to create and manage (update, remove) product listings, including details such as title, description, price, and images.
2. Allow buyers to search and browse for products based on keywords, categories, or other criteria
3. Buyers can view the product details.

##### Cart and Checkout

1. Allow buyers to add products to a cart, modify cart items, and proceed to checkout.
2. Provide a secure, user-friendly checkout process accepting COD payment methods.
3. Allow buyers to track their orders and receive updates on their status.
4. Allow sellers to update the delivery status of an order, which triggers automated notifications to be sent to the buyer.
5. Ensure that only the seller who is responsible for the order can update the delivery status.

##### Admin Dashboard

1. Allow admins to manage user accounts and access levels.
2. Provide a dashboard that displays key metrics such as total transactions, revenue, and user activity.

##### Security and Performance

1. Implement security measures such as data encryption, user authentication, and password policies to ensure the integrity and confidentiality of user data.

## Schema & ERD Suggestion

### Common schemas

1. User schema: This schema would include fields such as user ID, username, email, password, and user role (buyer, seller, or admin).
2. Product schema: This schema would include fields such as product ID, title, description, price, images, and seller ID.
3. Order schema: This schema would include fields such as order ID, buyer ID, product ID, order status, delivery information, and payment information.

## Entity Relationship Diagram:

https://github.com/HuyTran0996/Marketplace/blob/main/marketplacediagram.pdf

## API endpoints

##### Users:

1. GET POST PUT /users: CRUD operations for user accounts (Create, Read, Update, Delete).
2. POST /users/login: Login endpoint for user authentication.
3. POST /users/register: Register endpoint for user authentication.
4. GET /users/{id}: Get individual user details.
5. GET /user: Get the currently logged-in user's details.

##### Products:

1. GET POST PUT /products: CRUD operations for products.
2. GET / POST /products/search: Search for products based on various criteria.
3. GET /products/{id}: Get details of a specific product.
4. GET /products/{id}/reviews: Get reviews for a specific product.

##### Orders:

1. POST /orders: Create and manage orders.
2. GET /orders/{id}: Get details of a specific order.
3. PATCH /orders/{id}/status: Update the delivery status of an order (accessible only to seller).
4. GET /orders/{id}/track: Track the order status.

##### Admins:

1. POST /admins/users: Manage user accounts and access levels.
2. GET /admins/orders: Get all metrics about orders in system
3. GET /admins/shops: Get all metrics about shops in system
4. GET /admins/reviews: Get all metrics about reviews in system
