<template>
  <div class="container py-5">
    <div class="card shadow-sm p-4" style="max-width: 500px; margin: auto">
      <h5 class="card-title mb-4">
        <font-awesome-icon :icon="['fas', 'user']" class="me-2" />
        Registro de Usuario
      </h5>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label class="form-label">Nombre</label>
          <input v-model="form.nombre" type="text" class="form-control" />
          <div v-if="errors.nombre" class="text-danger">
            {{ errors.nombre }}
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Correo electrónico</label>
          <input v-model="form.email" type="email" class="form-control" />
          <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
        </div>
        <div class="d-flex justify-content-end">
          <button type="submit" class="btn btn-primary">
            <font-awesome-icon
              :icon="['fas', 'right-from-bracket']"
              class="me-2"
            />
            Enviar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import * as Yup from "yup";
import { AlertsComponent } from "@/utils";

const form = ref({
  nombre: "",
  email: "",
});

const errors = ref({
  nombre: "",
  email: "",
});

const schema = Yup.object({
  nombre: Yup.string().required("El nombre es obligatorio"),
  email: Yup.string()
    .email("Correo no válido")
    .required("El correo es obligatorio"),
});

const handleSubmit = async () => {
  errors.value = { nombre: "", email: "" };

  try {
    await schema.validate(form.value, { abortEarly: false });
    AlertsComponent.success("Exito", "Formulario enviado");
    form.value = { nombre: "", email: "" };
  } catch (err) {
    if (err.name === "ValidationError") {
      err.inner.forEach((e) => {
        errors.value[e.path] = e.message;
      });
    }
  }
};
</script>

<style scoped>
.card {
  border-radius: 1rem;
}
</style>
