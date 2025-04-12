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
          required
        />
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Correo electrónico</label>
        <input
          v-model="form.email"
          type="email"
          class="form-control"
          id="email"
          placeholder="correo@ejemplo.com"
          required
        />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Contraseña</label>
        <input
          v-model="form.password"
          type="password"
          class="form-control"
          id="password"
          placeholder="••••••••"
          required
        />
      </div>

      <button type="submit" class="btn btn-primary w-100">Registrarse</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { AuthService } from "../services/authService";
import { ReadHttpStatusErrors } from "@/utils";

const router = useRouter();

const form = reactive({
  name: "",
  email: "",
  password: "",
});

const registerUser = async () => {
  try {
    let user = await AuthService.register({
      name: form.name,
      email: form.email,
      password: form.password,
    });
    const { token } = user.data.data;
    localStorage.setItem("token", token);
    router.push("/products");
  } catch (error) {
    ReadHttpStatusErrors(error);
  }
};
</script>