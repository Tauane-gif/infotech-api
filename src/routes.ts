import { Router } from "express";
import ProdutoController from "./controller/ProdutoController.js";
import { Auth } from "./middlewares/Auth.js";
import MovimentacaoController from "./controller/MovimentacaoController.js";
import CategoriaController from "./controller/CategoriaController.js";
const router = Router();


router.get("/produtos", ProdutoController.listarProdutos);
router.get("/produtos/:id", ProdutoController.buscarProduto);
router.post("/produtos", ProdutoController.cadastrarProduto);
router.put("/produtos/:id", ProdutoController.atualizarProduto);
router.delete("/produtos/:id", ProdutoController.removerProduto);
router.get("/produtos-reposicao", ProdutoController.listarProdutosReposicao);

router.get("/movimentacoes", MovimentacaoController.listarMovimentacoes);
router.get("/movimentacoes/:id", MovimentacaoController.buscarMovimentacao);
router.post("/movimentacoes", MovimentacaoController.cadastrarMovimentacao);


router.get("/categorias", CategoriaController.todos);
router.get("/categorias/:id", CategoriaController.categoria);
router.post("/categorias", CategoriaController.cadastrar);
router.put("/categorias/:id", CategoriaController.atualizar);
router.delete("/categorias/:id", CategoriaController.remover);


router.post("/login", Auth.validacaoUsuario);


export default router;