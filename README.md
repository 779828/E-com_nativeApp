E-Commerce App
Overview
The E-Commerce App is a mobile application built using React Native, designed to provide a seamless shopping experience. It allows users to browse products, manage their cart, maintain a wishlist, view order history, and manage their profile. The app integrates with Supabase for authentication and data management.
Features

User Authentication: Secure login and registration functionality.
Home Screen: Browse categories and view promotional banners.
Product Listing: Display products by category with details and discounts.
Cart Management: Add, remove, and update items in the cart with a checkout option.
Wishlist: Save favorite products for future purchase.
Order History: View past orders with details.
Profile Management: Edit user details and logout functionality.
Responsive Design: Optimized for mobile devices with a clean UI.

Installation

Clone the Repository:
git clone (https://github.com/779828/E-com_nativeApp)
cd ecommerce-app

Install Dependencies:
npm install

Set Up Supabase:

Create a Supabase project at supabase.com.
Update the supabase.js file in the lib directory with your Supabase URL and API key:import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_KEY';
export const supabase = createClient(supabaseUrl, supabaseKey);

Run the App:
npm start

For iOS: npm run ios
For Android: npm run android

Usage

Login: Use your email and password to log in. New users can sign up via the "Sign Up Now" link.
Home: Browse categories like Electronics, Fashion, and Grocery, and view promotional banners.
Product List: Select a category to view products, add them to your cart or wishlist.
Cart: Manage items in your cart, adjust quantities, and proceed to checkout.
Wishlist: View and manage your saved products.
Order History: Check past orders with details like product, price, and status.
Profile: Edit your profile, view your wishlist, order history, and logout.

Screens
LoginScreen

Displays a welcome message with a purple background.
Features email and password input fields with a "LOGIN" button.
Includes a "Sign Up Now" link for new users.

HomeScreen

Greets the user with their name (e.g., "Hello Shashank").
Includes a search bar to find products.
Features a carousel banner with promotions.
Displays categories (Electronics, Fashion, Grocery) in a two-column grid.

CartScreen

Shows items in the cart (e.g., Headphone Skull-Candy, Google Pixel 9).
Allows quantity adjustments and item removal.
Displays subtotal, shipping (free), and total price.
Includes "Add More" and "Checkout" buttons.

WishListScreen

Lists saved products with discounts (e.g., T-Shirt, Formal Pant, Realme Airbuds).
Shows original and discounted prices, ratings, and options to add to cart or remove.

ProfileScreen

Displays user details (e.g., name, phone number, role).
Includes options to edit profile, view wishlist, order history, notifications, cards, and logout.

ProductListScreen

Lists products in a category (e.g., Accessories & Details).
Shows product images, names, specs, prices, discounts, ratings, and options to add to cart or wishlist.

OrderHistoryScreen

Displays past orders with details like order number, product, price, quantity, date, address, and status.

Dependencies

React Native
React Navigation
Supabase
React Native Reanimated Carousel

Contributing
Feel free to submit issues or pull requests to enhance the app's functionality or fix bugs.

License:
This project is licensed under the MIT License.
