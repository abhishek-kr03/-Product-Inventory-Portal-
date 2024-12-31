<template>
  <div>
    <!-- Filter and Sorting Controls -->
    <div class="d-flex justify-content-between mb-3">
      <!-- Search Dropdown and Input -->
      <div>
        <label for="searchColumn" class="form-label">Search By:</label>
        <select v-model="searchColumn" id="searchColumn" class="form-select">
          <option value="id">ID</option>
          <option value="name">Name</option>
          <option value="productCode">Product Code</option>
          <option value="batchCode">Batch Code</option>
          <option value="dpvalue">DP Value</option>
          <option value="expiryDate">Expiry Date</option>
          <option value="mrp">MRP</option>
          <option value="quantity">Quantity</option>
          <option value="principle">Principle</option>
        </select>
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Search..."
          class="form-control mt-2"
        />
      </div>

      <!-- Export Button -->
      <div>
        <button class="btn btn-success mx-2" @click="handleExportToExcel">
          Export to Excel
        </button>
      </div>
    </div>

    <!-- Reset Button -->
    <div>
      <button class="btn btn-secondary mx-2 mb-2" @click="resetData">Reset</button>
    </div>

    <!-- Products Table -->
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th @click="toggleSort('name')">
            Name
            <span class="sort-icon" :class="{ clickable: true }">{{ getSortIcon('name') }}</span>
          </th>
          <th>Product Code</th>
          <th>Batch Code</th>
          <th>DP Value</th>
          <th>Expiry Date</th>
          <th @click="toggleSort('mrp')">
            MRP
            <span class="sort-icon" :class="{ clickable: true }">{{ getSortIcon('mrp') }}</span>
          </th>
          <th @click="toggleSort('quantity')">
            Quantity
            <span class="sort-icon" :class="{ clickable: true }">{{ getSortIcon('quantity') }}</span>
          </th>
          <th @click="toggleSort('principle')">
            Principle
            <span class="sort-icon" :class="{ clickable: true }">{{ getSortIcon('principle') }}</span>
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in paginatedProducts" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.productCode }}</td>
          <td>{{ product.batchCode }}</td>
          <td>{{ product.dpvalue }}</td>
          <td>{{ product.expiryDate }}</td>
          <td>{{ product.mrp }}</td>
          <td>{{ product.quantity }}</td>
          <td :class="{ 'text-muted': !product.principle }">
            {{ product.principle ? product.principle.name : 'No Principle Available' }}
          </td>
          <td>
            <button class="btn btn-warning" @click="editProduct(product)">Edit</button>
            <button class="btn btn-danger" @click="deleteProduct(product.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination Controls -->
    <div class="d-flex justify-content-center mt-3">
      <button
        class="btn btn-primary mx-1"
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
      >
        Previous
      </button>
      <span class="mx-2">Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        class="btn btn-primary mx-1"
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { exportToExcel } from "@/plugins/excelExport"; // Import the utility function

export default {
  props: {
    products: Array, // Full list of products passed from the parent component
  },
  data() {
    return {
      currentPage: 1, // Current page number
      itemsPerPage: 10, // Number of items per page
      searchColumn: "name", // Default column for search
      searchTerm: "", // Search term input
      originalProducts: [], // Original data from the API (for reset)
      displayedProducts: [], // Displayed data (sorted or filtered)
      sortColumn: null, // Current column for sorting
      sortOrder: null, // Current sort order ("ascending" or "descending")
    };
  },
  computed: {
    filteredProducts() {
      if (!this.searchTerm.trim()) return this.displayedProducts;

      return this.displayedProducts.filter((product) => {
        if (this.searchColumn === "principle") {
          return (
            product.principle &&
            product.principle.name
              .toString()
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase())
          );
        } else {
          const value = product[this.searchColumn]
            ? product[this.searchColumn].toString().toLowerCase()
            : "";
          return value.includes(this.searchTerm.toLowerCase());
        }
      });
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredProducts.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    },
  },
  watch: {
    products: {
      immediate: true,
      handler(newProducts) {
        this.originalProducts = [...newProducts];
        this.displayedProducts = [...newProducts];
      },
    },
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    },
    resetData() {
      this.searchTerm = "";
      this.sortColumn = null;
      this.sortOrder = null;
      this.displayedProducts = [...this.originalProducts];
      this.currentPage = 1;
    },
    toggleSort(column) {
      if (this.sortColumn === column) {
        this.sortOrder =
          this.sortOrder === "ascending" ? "descending" : "ascending";
      } else {
        this.sortColumn = column;
        this.sortOrder = "ascending";
      }

      this.applySorting();
    },
    applySorting() {
      if (!this.sortColumn) {
        this.displayedProducts = [...this.originalProducts];
        return;
      }

      this.displayedProducts.sort((a, b) => {
        const valueA =
          this.sortColumn === "principle"
            ? a.principle?.name || ""
            : a[this.sortColumn];
        const valueB =
          this.sortColumn === "principle"
            ? b.principle?.name || ""
            : b[this.sortColumn];

        if (this.sortOrder === "ascending") {
          return valueA > valueB ? 1 : -1;
        } else {
          return valueA < valueB ? 1 : -1;
        }
      });
    },
    getSortIcon(column) {
      if (this.sortColumn !== column) return "⬍";
      return this.sortOrder === "ascending" ? "⬆" : "⬇";
    },
    editProduct(product) {
      console.log("Edit product:", product);
    },
    deleteProduct(productId) {
      console.log("Delete product:", productId);
    },
    handleExportToExcel() {
      exportToExcel(this.products, "Products.xlsx"); // Call the utility function
    },
  },
};
</script>

<style>
/* Styles for table headers and sort icons */
th {
  text-align: left;
}

.sort-icon {
  cursor: pointer;
  margin-left: 12px;
  color: #6c757d; /* Default gray color for the icon */
  font-size: 25px;
  transition: color 0.3s ease;
}

.sort-icon.clickable:hover {
  color: #007bff; /* Blue color on hover */
}

.text-muted {
  color: lightgrey; /* or use #d3d3d3 or any desired light grey shade */
}

/* .btn-success, .btn-secondary{
  margin : 5px;
} */

</style>
