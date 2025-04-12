<template>
  <div class="d-flex justify-content-center align-items-center">
    <form
      @submit.prevent="registerUser"
      class="p-4 rounded shadow bg-white"
      style="min-width: 300px; max-width: 400px; width: 100%; margin-top: 150px"
    >
      <h2 class="text-center mb-4">Registro</h2>
      <div class="mb-3">
        <label for="name" class="form-label">Nombre</label>
        <input
          v-model="form.name"
          type="text"
          class="form-control"
          id="name"
          placeholder="Tu nombre"
        />
        <span v-if="errors.name" class="text-danger">{{ errors.name }}</span>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Correo electrónico</label>
        <input
          v-model="form.email"
          type="email"
          class="form-control"
          id="email"
          placeholder="correo@ejemplo.com"
        />
        <span v-if="errors.email" class="text-danger">{{ errors.email }}</span>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Contraseña</label>
        <input
          v-model="form.password"
          type="password"
          class="form-control"
          id="password"
          placeholder="••••••••"
        />
        <span v-if="errors.password" class="text-danger">{{
          errors.password
        }}</span>
      </div>
      <button type="submit" class="btn btn-primary w-100">Registrarse</button>
      <div class="row text-center mt-3">
        <router-link to="/login" class="text-primary text-decoration-none"
          >Login</router-link
        >
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { AuthService } from "../services/authService";
import { ReadHttpStatusErrors } from "@/utils";
import * as Yup from "yup";

const router = useRouter();

const form = reactive({
  name: "",
  email: "",
  password: "",
});

const errors = ref({
  name: "",
  email: "",
  password: "",
});

const validationSchema = Yup.object({
  name: Yup.string().required("El nombre es obligatorio"),
  email: Yup.string()
    .email("El correo electrónico no es válido")
    .required("El correo electrónico es obligatorio"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("La contraseña es obligatoria"),
});

const registerUser = async () => {
  errors.value = {
    name: "",
    email: "",
    password: "",
  };
  try {
    await validationSchema.validate(
      { name: form.name, email: form.email, password: form.password },
      { abortEarly: false }
    );
    let user = await AuthService.register({
      name: form.name,
      email: form.email,
      password: form.password,
    });
    const { token } = user.data.data;
    localStorage.setItem("token", token);
    router.push("/products");
  } catch (err) {
    if (err.name === "ValidationError") {
      err.inner.forEach((error) => {
        errors.value[error.path] = error.message;
      });
    } else {
      ReadHttpStatusErrors(err);
    }
  }
};
</script>
