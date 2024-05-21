import { createApp } from 'vue'
import App from './App.vue'

import EuiMpUi from "eui-mp-ui";
import "eui-mp-ui/dist/index.css";

const app = createApp(App);
app.use(EuiMpUi);
app.mount("#app");
