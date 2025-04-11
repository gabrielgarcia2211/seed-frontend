<template>
  <div
    class="modal fade"
    id="addProductModal"
    ref="refProductModal"
    tabindex="-1"
    aria-labelledby="addProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <form @submit.prevent="handleSubmit">
          <div class="modal-header">
            <h5 class="modal-title" id="addProductModalLabel">
              Nuevo Producto
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Nombre</label>
              <input
                v-model="product.nombre"
                type="text"
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Precio</label>
              <input
                v-model="product.precio"
                type="number"
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Descripción</label>
              <textarea
                v-model="product.descripcion"
                class="form-control"
              ></textarea>
            </div>
            <div class="mb-3">
              <label class="form-label">Estado</label>
              <select v-model="product.activo" class="form-select">
                <option :value="1">Activo</option>
                <option :value="0">Inactivo</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
            <button type="submit" class="btn btn-primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, onMounted } from "vue";
import { Modal } from "bootstrap";

const emit = defineEmits(["saved"]);

const product = ref({
  nombre: "",
  precio: "",
  descripcion: "",
  activo: "",
});

let modalInstance = null;

onMounted(() => {
  const modalElement = document.getElementById("addProductModal");
  modalInstance = new Modal(modalElement);
});

const handleSubmit = () => {
  emit("saved", { ...product.value });
  document.activeElement.blur();
  modalInstance.hide();
  modalInstance._element.addEventListener(
    "hidden.bs.modal",
    () => {
      document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
    },
    { once: true }
  );
  product.value = {
    nombre: "",
    precio: "",
    descripcion: "",
    activo: "",
  };
};
</script>
