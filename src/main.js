import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faRightFromBracket,
  faFileExcel,
} from "@fortawesome/free-solid-svg-icons";

library.add(faRightFromBracket);
library.add(faFileExcel);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.mount("#app");
