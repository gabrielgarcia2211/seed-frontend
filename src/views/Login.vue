<template>
  <div class="d-flex justify-content-center align-items-center">
    <form
      @submit.prevent="handleLogin"
      class="p-4 rounded shadow bg-white"
      style="min-width: 300px; max-width: 400px; width: 100%; margin-top: 200px;"
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
          required
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Contraseña</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="password"
          placeholder="••••••••"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary w-100">Ingresar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { AuthService } from "../services/authService";
import { AlertsComponent, ReadHttpStatusErrors } from "@/utils";

const email = ref("");
const password = ref("");
const router = useRouter();

const handleLogin = async () => {
  try {
    await AuthService.login({ email: email.value, password: password.value });
    router.push("/products");
  } catch (error) {
    ReadHttpStatusErrors(error);
  }
};
</script>
