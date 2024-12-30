<template>
  <div>
    <h1>Product Inventory Portal</h1>
    <ProductTable :products="products" />
  </div>
</template>

<script>
import axios from "axios";
import ProductTable from "~/components/ProductTable.vue";

export default {
  components: {
    ProductTable,
  },
  data() {
    return {
      products: [],
    };
  },
  async mounted() {
    try {
      const response = await axios.get(
        "http://77.37.45.2:8091/api/v1/product/fetchallproducts"
      );
      this.products = response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
};
</script>
