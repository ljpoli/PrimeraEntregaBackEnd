 import { fileURLToPath } from "url";
 import { dirname } from "path";

const fileName = fileURLToPath(import.meta.url);
 const currentDir = dirname(fileName);


export default currentDir;

