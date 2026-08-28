import dotenv from "dotenv";

import { server } from "./server.js";

dotenv.config();

const port = Number(process.env.PORT) || 3000;

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
