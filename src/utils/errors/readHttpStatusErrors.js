import { alertService } from "../alerts/alertService";

function getDataError(error = []) {
    let response = {};
    try {
        response = [error][0].response;
    } catch (err) {
        response = {};
    }
    return response;
}

function validateForm(data) {
    const errors = data.errors;
    if (errors) {
        return Object.values(errors)
            .flat()
            .map((msg) => msg + "<br>")
            .join("");
    }
    return "";
}

export default function readHttpStatusErrors(error) {
    const response = getDataError(error);
    const status = response.status;

    switch (status) {
        case 400:
            alertService.error("Solicitud Incorrecta", response.data?.message);
            break;
        case 401:
        case 419:
            alertService.error("Tu sesión expiró", "");
            setTimeout(() => (window.location.href = "/"), 2000);
            break;
        case 402:
        case 404:
        case 406:
            alertService.error("Solicitud Incorrecta", "");
            break;
        case 403:
            alertService.error("Proceso denegado", "No tienes permiso para realizar este proceso");
            break;
        case 409:
            alertService.error("Proceso no autorizado", "El proceso no fue autorizado, intente con otro tipo de proceso");
            break;
        case 422:
            alertService.error("Error de formulario", validateForm(response.data));
            break;
        case 423:
            alertService.error("Límite Excedido", "");
            break;
        case 500:
            alertService.error("Error en el servidor", "Ocurrió un error al realizar el proceso");
            break;
        default:
            alertService.error("Error inesperado", "Ocurrió un error inesperado");
    }
}