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
              <span v-if="errors.nombre" class="text-danger">{{
                errors.nombre
              }}</span>
            </div>
            <div class="mb-3">
              <label class="form-label">Precio</label>
              <input
                v-model="product.precio"
                type="number"
                class="form-control"
              />
              <span v-if="errors.precio" class="text-danger">{{
                errors.precio
              }}</span>
            </div>
            <div class="mb-3">
              <label class="form-label">Descripción</label>
              <textarea
                v-model="product.descripcion"
                class="form-control"
              ></textarea>
              <span v-if="errors.descripcion" class="text-danger">{{
                errors.descripcion
              }}</span>
            </div>
            <div class="mb-3">
              <label class="form-label">Estado</label>
              <select v-model="product.activo" class="form-select">
                <option :value="1">Activo</option>
                <option :value="0">Inactivo</option>
              </select>
              <span v-if="errors.descripcion" class="text-danger">{{
                errors.descripcion
              }}</span>
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
import * as Yup from "yup";
import { ReadHttpStatusErrors } from "@/utils";

const emit = defineEmits(["saved"]);

const product = ref({
  nombre: "",
  precio: null,
  descripcion: "",
  activo: "",
});

const errors = ref({
  nombre: "",
  precio: "",
  descripcion: "",
});

let modalInstance = null;

onMounted(() => {
  const modalElement = document.getElementById("addProductModal");
  modalInstance = new Modal(modalElement);
});

const validationSchema = Yup.object({
  nombre: Yup.string().required("El nombre del producto es obligatorio"),
  precio: Yup.number()
    .min(1, "El precio debe ser mayor que 0")
    .required("El precio es obligatorio"),
  descripcion: Yup.string().required("La descripción es obligatoria"),
  activo: Yup.boolean().required("El estado es obligatorio"),
});

const handleSubmit = async () => {
  errors.value = {
    nombre: "",
    precio: "",
    descripcion: "",
  };
  try {
    await validationSchema.validate(
      {
        nombre: product.value.nombre,
        precio: product.value.precio,
        descripcion: product.value.descripcion,
        activo: product.value.activo,
      },
      { abortEarly: false }
    );
    emit("saved", { ...product.value });
    manageModal();
    product.value = {
      nombre: "",
      precio: "",
      descripcion: "",
      activo: 1,
    };
  } catch (err) {
    console.log(err)
    if (err.name === "ValidationError") {
      err.inner.forEach((error) => {
        errors.value[error.path] = error.message;
      });
    } else {
      ReadHttpStatusErrors(err);
    }
  }

  function manageModal(){
    document.activeElement.blur();
    modalInstance.hide();
    modalInstance._element.addEventListener(
      "hidden.bs.modal",
      () => {
        document
          .querySelectorAll(".modal-backdrop")
          .forEach((el) => el.remove());
      },
      { once: true }
    );
  };
};
</script>
