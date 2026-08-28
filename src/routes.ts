import { Router } from "express";
import ProdutoController from "../src/controller/ProdutoController.js";

const router = Router();

router.get("/api/produtos", ProdutoController.listarProdutos);

router.get(
    "/api/produtos/reposicao",
    ProdutoController.listarProdutosReposicao
);

router.get(
    "/api/produtos/:id",
    ProdutoController.buscarProduto
);

router.post(
    "/api/produtos",
    ProdutoController.cadastrarProduto
);

export default router;