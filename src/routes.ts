import { Router } from "express";
import ProdutoController from "../src/controller/ProdutoController.js";

const router = Router();

router.get(
    "/produtos",
    ProdutoController.listarProdutos
);

router.get(
    "/produtos/:id",
    ProdutoController.buscarProduto
);

router.post(
    "/produtos",
    ProdutoController.cadastrarProduto
);

router.get(
    "/produtos/reposicao",
    ProdutoController.listarProdutosReposicao
);

export default router;