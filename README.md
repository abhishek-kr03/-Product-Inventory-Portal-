Here's the updated `README.md` without the License and Contact sections:

---

# **Product Inventory Portal**

A web-based application to manage product inventory, including features like pagination, product details display, and modal-based principle details. Built using **Nuxt.js** and **Vue.js** with data fetched via REST APIs.

---

## **Features**
- Display a list of products with detailed attributes like name, code, batch, price, and quantity.
- Pagination support to view data in smaller chunks (10 items per page).
- View detailed principle information via a modal popup.
- Graceful handling of missing or `null` principles with fallback messages.
- Responsive and user-friendly UI.

---

## **Technologies Used**
- **Frontend**: Nuxt.js, Vue.js
- **Styling**: Bootstrap
- **Backend API**: Axios for API calls
- **Server**: Node.js with a RESTful API endpoint

---

## **Project Structure**
```bash
product-inventory-portal/
├── components/
│   ├── ProductTable.vue     # Component for rendering the table with product details and pagination
│
├── pages/
│   ├── index.vue            # Main entry page fetching product data
│
├── plugins/
│   ├── axios.js             # Axios configuration
│
├── static/
│   ├── assets               # Static assets (images, etc.)
│
├── nuxt.config.js           # Nuxt.js configuration file
├── package.json             # Project dependencies and scripts
```

---

## **Setup and Installation**

### Prerequisites
- **Node.js**: Ensure you have Node.js installed (>=16.x.x).
- **npm/yarn**: Install npm (default with Node.js) or yarn.

### Installation Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/product-inventory-portal.git
   cd product-inventory-portal
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## **Usage**

### **Fetch Product Data**
- The application fetches all product data from the backend API:
  ```
  GET http://77.37.45.2:8091/api/v1/product/fetchallproducts
  ```

### **Features**
1. **Pagination**:
   - Navigate between pages using the **Previous** and **Next** buttons.
   - Displays 10 products per page.

2. **Principle Details**:
   - Click the **"View Principle"** button to view principle details in a modal.
   - Displays principle name and ID.
   - If no principle is available, it shows **"No Principle Available"**.

3. **Error Handling**:
   - Handles API errors and displays them in the browser console.
   - Gracefully handles `null` or `undefined` principles.

---

## **File Explanation**

### `ProductTable.vue`
- Displays product data in a tabular format.
- Includes pagination logic to display 10 items per page.
- Renders modal details for principles when clicked.

### `index.vue`
- Fetches product data from the API on page load.
- Passes data to `ProductTable` as props.

---

## **Screenshots**

### **Table View with Pagination**
![Table View](https://via.placeholder.com/800x400.png?text=Table+View)

### **Principle Modal**
![Principle Modal](https://via.placeholder.com/800x400.png?text=Principle+Modal)

---

## **Future Enhancements**
- Add **Create**, **Update**, and **Delete** functionalities for products.
- Enhance table sorting by column (e.g., ID, Name, Price).
- Add filters for categories and price ranges.
- Implement authentication and authorization for admin roles.

---

Feel free to use this for your GitHub project. Let me know if you need further modifications! 😊