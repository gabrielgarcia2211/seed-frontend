<template>
  <nav class="navbar navbar-light bg-light justify-content-between px-4">
    <a class="navbar-brand">Productos Seed</a>
    <form class="form-inline d-flex gap-2">
      <button
        class="btn btn-outline-danger d-flex align-items-center gap-2"
        type="button"
        @click="formUser"
      >
        <font-awesome-icon :icon="['fas', 'user']" /> Formulario Usuario
      </button>
      <button
        class="btn btn-outline-danger d-flex align-items-center gap-2"
        type="button"
        @click="logout"
      >
        <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
      </button>
    </form>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
import { AuthService } from "../services/authService";
import { ReadHttpStatusErrors } from "@/utils";

const router = useRouter();

const logout = async () => {
  try {
    await AuthService.logout();
    router.push("/login");
  } catch (error) {
    ReadHttpStatusErrors(error);
  }
};

const formUser = async () => {
  router.push("/form");
};
</script>
