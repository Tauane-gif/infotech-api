import { Router } from "express";
import ProdutoController from "../src/controller/ProdutoController.js";
import CategoriaController from "../src/controller/CategoriaController.js";
import MovimentacaoController from "../src/controller/MovimentacaoController.js";

const router = Router();

// Produto
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

// Categoria
router.get("/api/categorias", CategoriaController.listarCategorias);
router.get("/api/categorias/:id", CategoriaController.buscarCategoria);
router.post("/api/categorias", CategoriaController.cadastrarCategoria);

// Movimentacao
router.get("/api/movimentacoes", MovimentacaoController.listarMovimentacoes);
router.get("/api/movimentacoes/:id", MovimentacaoController.buscarMovimentacao);
router.post("/api/movimentacoes", MovimentacaoController.cadastrarMovimentacao);

export default router;