import type { Request, Response } from "express";
import Produto from "../Model/Produto.js";

class ProdutoController {
    static async listarProdutos(req: Request, res: Response) {
        try {
            const produtos = await Produto.listarProdutos();

            return res.status(200).json(produtos);
        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: "Erro ao listar produtos"
            });
        }
    }

    static async buscarProduto(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                return res.status(400).json({
                    mensagem: "ID do produto inválido"
                });
            }

            const produto = await Produto.buscarProduto(id);

            if (!produto) {
                return res.status(404).json({
                    mensagem: "Produto não encontrado"
                });
            }

            return res.status(200).json(produto);
        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: "Erro ao buscar produto"
            });
        }
    }

    static async cadastrarProduto(req: Request, res: Response) {
        try {
            const {
                id_categoria,
                codigo,
                nome,
                descricao,
                preco_unitario,
                quantidade_disponivel,
                quantidade_minima
            } = req.body;

            if (!id_categoria) {
                return res.status(400).json({
                    mensagem: "A categoria é obrigatória"
                });
            }

            if (!codigo || codigo.trim() === "") {
                return res.status(400).json({
                    mensagem: "O código é obrigatório"
                });
            }

            if (!nome || nome.trim() === "") {
                return res.status(400).json({
                    mensagem: "O nome é obrigatório"
                });
            }

            if (preco_unitario === undefined || preco_unitario === null) {
                return res.status(400).json({
                    mensagem: "O preço unitário é obrigatório"
                });
            }

            if (Number(preco_unitario) < 0) {
                return res.status(400).json({
                    mensagem: "O preço unitário não pode ser negativo"
                });
            }

            if (Number(quantidade_disponivel) < 0) {
                return res.status(400).json({
                    mensagem: "A quantidade disponível não pode ser negativa"
                });
            }

            if (Number(quantidade_minima) < 0) {
                return res.status(400).json({
                    mensagem: "A quantidade mínima não pode ser negativa"
                });
            }

            const produto = await Produto.cadastrarProduto({
                id_categoria: Number(id_categoria),
                codigo: codigo.trim(),
                nome: nome.trim(),
                descricao: descricao ? descricao.trim() : null,
                preco_unitario: Number(preco_unitario),
                quantidade_disponivel: Number(quantidade_disponivel),
                quantidade_minima: Number(quantidade_minima)
            });

            return res.status(201).json(produto);
        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: "Erro ao cadastrar produto"
            });
        }
    }

    static async listarProdutosReposicao(req: Request, res: Response) {
        try {
            const produtos = await Produto.listarProdutosReposicao();

            return res.status(200).json(produtos);
        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: "Erro ao listar produtos para reposição"
            });
        }
    }
}

export default ProdutoController;