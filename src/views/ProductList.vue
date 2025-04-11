<template>
  <div class="container py-5">
    <h2 class="text-center mb-4 text-white">Listado de Productos</h2>
    <div v-if="products.length" class="table-responsive">
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
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.nombre }}</td>
            <td>${{ formatPrice(product.precio) }}</td>
            <td>{{ product.descripcion }}</td>
            <td class="text-center" v-html="formatStatus(product.activo)"></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="alert alert-info text-center">
      No hay productos registrados.
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ProductService } from "../services/ProductService";
import { ReadHttpStatusErrors } from "@/utils";

const products = ref([]);

const getProducts = async () => {
  try {
    const response = await ProductService.getAll();
    products.value = response.data; // ← Asegúrate de acceder correctamente
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
    ? '<span class="badge bg-success">Disponible</span>'
    : '<span class="badge bg-danger">Agotado</span>';
};

const editProduct = (id) => {
  console.log("Editar producto con ID:", id);
};

const deleteProduct = (id) => {
  console.log("Eliminar producto con ID:", id);
};
</script>
