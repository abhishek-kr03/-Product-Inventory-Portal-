<template>
  <div>
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Product Code</th>
          <th>Batch Code</th>
          <th>DP Value</th>
          <th>Expiry Date</th>
          <th>MRP</th>
          <th>Quantity</th>
          <th>Principle</th>
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
          <td>
            <button 
              v-if="product.principle" 
              class="btn btn-info" 
              @click="showPrincipleDetails(product.principle)"
            >
              View Principle
            </button>
            <span v-else class="text-muted">No Principle Available</span>
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

    <!-- Principle Details Modal -->
    <div v-if="showModal" class="modal" tabindex="-1" style="display: block; background-color: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Principle Details</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <template v-if="selectedPrinciple">
              <p><strong>Name:</strong> {{ selectedPrinciple.name }}</p>
              <p><strong>ID:</strong> {{ selectedPrinciple.id }}</p>
            </template>
            <p v-else>No principle information available.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: Array, // Full list of products passed from the parent component
  },
  data() {
    return {
      currentPage: 1, // Current page number
      itemsPerPage: 10, // Number of items per page
      showModal: false, // Controls the visibility of the modal
      selectedPrinciple: null, // Holds the data of the selected principle
    };
  },
  computed: {
    // Calculate the total number of pages
    totalPages() {
      return Math.ceil(this.products.length / this.itemsPerPage);
    },
    // Get the products for the current page
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.products.slice(start, end);
    },
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    },
    editProduct(product) {
      console.log('Edit product:', product);
    },
    deleteProduct(productId) {
      console.log('Delete product:', productId);
    },
    showPrincipleDetails(principle) {
      if (principle) {
        this.selectedPrinciple = principle; // Set the selected principle
      } else {
        this.selectedPrinciple = null; // Handle null principle
      }
      this.showModal = true; // Show the modal
    },
    closeModal() {
      this.showModal = false; // Hide the modal
      this.selectedPrinciple = null; // Clear the selected principle
    },
  },
};
</script>

<style>
/* Optional styles for pagination buttons */
button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}

/* Modal styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}
.modal-dialog {
  background: white;
  border-radius: 5px;
  overflow: hidden;
}
</style>
