import type { Request, Response } from "express";
import Movimentacao from "../Model/Movimentacao.js";

class MovimentacaoController {
    static async listarMovimentacoes(req: Request, res: Response) {
        try {
            const movs = await Movimentacao.listarMovimentacoes();

            return res.status(200).json(movs);
        } catch (erro) {
            console.error(erro);

            return res.status(500).json({ mensagem: "Erro ao listar movimentações" });
        }
    }

    static async buscarMovimentacao(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                return res.status(400).json({ mensagem: "ID da movimentação inválido" });
            }

            const mov = await Movimentacao.buscarMovimentacao(id);

            if (!mov) {
                return res.status(404).json({ mensagem: "Movimentação não encontrada" });
            }

            return res.status(200).json(mov);
        } catch (erro) {
            console.error(erro);

            return res.status(500).json({ mensagem: "Erro ao buscar movimentação" });
        }
    }

    static async cadastrarMovimentacao(req: Request, res: Response) {
        try {
            const {
                id_produto,
                id_movimentacao_origem,
                tipo,
                motivo,
                quantidade,
                preco_unitario_praticado,
                valor_total,
                observacao
            } = req.body;

            if (!id_produto) {
                return res.status(400).json({ mensagem: "O produto é obrigatório" });
            }

            if (!tipo || typeof tipo !== "string" || tipo.trim() === "") {
                return res.status(400).json({ mensagem: "O tipo é obrigatório" });
            }

            if (!motivo || typeof motivo !== "string" || motivo.trim() === "") {
                return res.status(400).json({ mensagem: "O motivo é obrigatório" });
            }

            if (quantidade === undefined || quantidade === null || Number(quantidade) <= 0) {
                return res.status(400).json({ mensagem: "A quantidade deve ser maior que zero" });
            }

            if (!observacao || typeof observacao !== "string") {
                return res.status(400).json({ mensagem: "A observação é obrigatória" });
            }

            const mov = await Movimentacao.cadastrarMovimentacao(
                Number(id_produto),
                id_movimentacao_origem ? Number(id_movimentacao_origem) : null,
                tipo.trim(),
                motivo.trim(),
                Number(quantidade),
                preco_unitario_praticado !== undefined && preco_unitario_praticado !== null ? Number(preco_unitario_praticado) : null,
                valor_total !== undefined && valor_total !== null ? Number(valor_total) : null,
                observacao.trim()
            );

            return res.status(201).json(mov);
        } catch (erro) {
            console.error(erro);

            return res.status(500).json({ mensagem: "Erro ao cadastrar movimentação" });
        }
    }
}

export default MovimentacaoController;
