<template>
  <div class="d-flex justify-content-center align-items-center">
    <form
      @submit.prevent="handleLogin"
      class="p-4 rounded shadow bg-white"
      style="min-width: 300px; max-width: 400px; width: 100%; margin-top: 200px"
    >
      <h2 class="text-center mb-4">Iniciar Sesión</h2>
      <div class="mb-3">
        <label for="email" class="form-label">Correo electrónico</label>
        <input
          v-model="email"
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
          v-model="password"
          type="password"
          class="form-control"
          id="password"
          placeholder="••••••••"
        />
        <span v-if="errors.password" class="text-danger">{{
          errors.password
        }}</span>
      </div>
      <button type="submit" class="btn btn-primary w-100">Ingresar</button>
      <div class="row text-center mt-3">
        <router-link to="/register" class="text-primary text-decoration-none"
          >Regístrate aquí</router-link
        >
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { AuthService } from "../services/authService";
import { ReadHttpStatusErrors } from "@/utils";
import * as Yup from "yup";

const email = ref("");
const password = ref("");
const errors = ref({
  email: "",
  password: "",
});
const router = useRouter();

const validationSchema = Yup.object({
  email: Yup.string()
    .email("El correo electrónico no es válido")
    .required("El correo electrónico es obligatorio"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 8 caracteres")
    .required("La contraseña es obligatoria"),
});

const handleLogin = async () => {
  errors.value = {
    email: "",
    password: "",
  };
  try {
    await validationSchema.validate(
      { email: email.value, password: password.value },
      { abortEarly: false }
    );
    let user = await AuthService.login({
      email: email.value,
      password: password.value,
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
