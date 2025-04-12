<template>
  <Navbar />
  <div class="container py-5">
    <h2 class="text-center mb-4 text-white">Listado de Productos</h2>
    <div>
      <button
        type="button"
        class="btn btn-primary mb-3"
        data-bs-toggle="modal"
        data-bs-target="#addProductModal"
      >
        Añadir Producto
      </button>
      <button
        type="button"
        class="btn btn-success mb-3 ms-2"
        @click="exportToExcel"
      >
        <font-awesome-icon :icon="['fas', 'file-excel']" />
      </button>
      <ProductCreateModal @saved="addProduct" />
    </div>

    <div v-if="paginatedProducts.length > 0" class="table-responsive">
      <table class="table table-bordered table-hover align-middle">
        <thead class="table-dark text-center">
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Descripción</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in paginatedProducts" :key="product.id">
            <td>{{ product.nombre }}</td>
            <td>${{ formatPrice(product.precio) }}</td>
            <td>{{ product.descripcion }}</td>
            <td class="text-center" v-html="formatStatus(product.activo)"></td>
          </tr>
        </tbody>
      </table>
      <nav>
        <ul class="pagination justify-content-center">
          <li
            class="page-item"
            :class="{ disabled: currentPage === 1 }"
            @click="changePage(currentPage - 1)"
          >
            <a class="page-link" href="#">Anterior</a>
          </li>
          <li
            v-for="page in totalPages"
            :key="page"
            class="page-item"
            :class="{ active: currentPage === page }"
            @click="changePage(page)"
          >
            <a class="page-link" href="#">{{ page }}</a>
          </li>
          <li
            class="page-item"
            :class="{ disabled: currentPage === totalPages }"
            @click="changePage(currentPage + 1)"
          >
            <a class="page-link" href="#">Siguiente</a>
          </li>
        </ul>
      </nav>
    </div>
    <div v-else class="alert alert-info text-center">
      No hay productos registrados.
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Navbar from "@/components/Navbar.vue";
import { ProductService } from "../services/ProductService";
import { ReportService } from "../services/ReportService";
import { AlertsComponent, ReadHttpStatusErrors } from "@/utils";
import ProductCreateModal from "../views/actions/ProductCreateModal.vue";
import * as XLSX from "xlsx";

const products = ref([]);
const currentPage = ref(1);
const itemsPerPage = 10;

const getProducts = async () => {
  try {
    const response = await ProductService.getAll();
    products.value = response.data;
  } catch (error) {
    ReadHttpStatusErrors(error);
  }
};

getProducts();

const formatPrice = (value) => {
  if (!value) return;
  return value.toLocaleString("es-CO");
};
const formatStatus = (value) => {
  return value > 0
    ? '<span class="badge bg-success">Activado</span>'
    : '<span class="badge bg-danger">Desactivado</span>';
};

const addProduct = async (newProduct) => {
  try {
    await ProductService.create(newProduct);
    AlertsComponent.success("Realizado", "Producto añadido");
    getProducts();
  } catch (error) {
    ReadHttpStatusErrors(error);
  }
};

const totalPages = computed(() => {
  return Math.ceil(products.value.length / itemsPerPage);
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return products.value.slice(start, end);
});

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const exportToExcel = async () => {
  try {
    let response = await ReportService.getReportJson();
    if (!response.data || response.data.length === 0) {
      AlertsComponent.info("Información", "No hay datos para exportar.");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(response.data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");
    XLSX.writeFile(workbook, "Listado_Productos.xlsx");
  } catch (error) {
    ReadHttpStatusErrors(error);
  }
};
</script>
