import { makeInstaller } from "@eui-mp-ui/utils";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import components from "./components";

import "@eui-mp-ui/theme/index.css"

library.add(fas);
const installer = makeInstaller(components);

export * from "@eui-mp-ui/components";

export default installer;

