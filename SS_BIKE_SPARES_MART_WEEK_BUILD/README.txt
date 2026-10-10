SHANJAY'S BIKE SPARES MART - WEEK BUILD
========================================
Core journey implemented:
Login -> browse/search/filter -> add/update/remove cart -> checkout -> delivery details ->
mock payment -> order placed successfully -> order history.

Guide alignment:
The uploaded Student Guide says Week 2 covers seller product listings, buyer browse/search/filter,
cart add/update/remove and checkout with mock payment. It later requires buyer order history, security,
testing, Tomcat deployment and an AI chatbot for the final review. This ZIP is the working browser-side
prototype for the current week. The final Java Servlet + JDBC + Tomcat requirements still need the
server/database migration described by the guide.

Run:
1. Extract ZIP.
2. Open folder in VS Code.
3. Open index.html with Live Server (recommended).
4. Demo login: rider@gmail.com / 1234.
5. Product images require internet access.
6. Payment is demo-only; no real payment is processed.
7. Prices are reasonable educational demo prices, not live quotations.

Separate functions:
js/products.js - catalogue
js/auth.js - login/password/logout
js/cart.js - cart operations
js/checkout.js - delivery, mock payment, order confirmation/history
js/app.js - UI/search/filter/navigation
css/styles.css - design
