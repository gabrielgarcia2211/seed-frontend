import Swal from "sweetalert2";

function showAlert({ icon, title, html, timer = 3500, position = "top", showConfirmButton = false }) {
    Swal.fire({
        position,
        icon,
        title,
        html,
        showConfirmButton,
        timer,
        width: "500px",
        toast: true,
    });
}

export const alertService = {
    success(title, message, options = {}) {
        showAlert({ icon: "success", title, html: message, ...options });
    },
    info(title, message, options = {}) {
        showAlert({ icon: "info", title, html: message, ...options });
    },
    warning(title, message, options = {}) {
        showAlert({ icon: "warning", title, html: message, ...options });
    },
    error(title, message, options = {}) {
        showAlert({ icon: "error", title, html: message, ...options });
    },
    invalidForm() {
        showAlert({
            icon: "warning",
            title: "Error de Formulario",
            html: "El formulario está incompleto o tiene datos incorrectos",
        });
    }
};