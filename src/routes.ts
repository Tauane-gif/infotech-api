import { Router } from "express";
import ProdutoController from "./controller/ProdutoController.js";

const router = Router();

// Listar todos os produtos
router.get(
    "/produtos",
    ProdutoController.listarProdutos
);

// Buscar um produto pelo ID
router.get(
    "/produtos/:id",
    ProdutoController.buscarProduto
);

// Cadastrar um novo produto
router.post(
    "/produtos",
    ProdutoController.cadastrarProduto
);

// Listar produtos que precisam de reposição
router.get(
    "/produtos/reposicao",
    ProdutoController.listarProdutosReposicao
);

export default router;
