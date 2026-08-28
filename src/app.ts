import { DatabaseModel } from "./Model/DataBaseModel.js";
import { server } from "./server.js";
import dotenv from "dotenv";

dotenv.config();

const port: number = Number(process.env.PORT ?? 3000);
const host: string = process.env.HOST ?? "localhost";

new DatabaseModel().testeConexao().then((ok) => {
    if (ok) {
        server.listen(port, host, () => {
            console.info(`Servidor executando no endereço ${host}:${port}`);
        });
    } else {
        console.error(`Não foi possível conectar com o banco de dados.`);
    }
});