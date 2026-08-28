import type { Request, Response } from "express";
import Categoria from "../Model/Categoria.js";

class CategoriaController {
    static async listarCategorias(req: Request, res: Response) {
        try {
            const categorias = await Categoria.listarCategorias();

            return res.status(200).json(categorias);
        } catch (erro) {
            console.error(erro);

            return res.status(500).json({ mensagem: "Erro ao listar categorias" });
        }
    }

    static async buscarCategoria(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                return res.status(400).json({ mensagem: "ID da categoria inválido" });
            }

            const categoria = await Categoria.buscarCategoria(id);

            if (!categoria) {
                return res.status(404).json({ mensagem: "Categoria não encontrada" });
            }

            return res.status(200).json(categoria);
        } catch (erro) {
            console.error(erro);

            return res.status(500).json({ mensagem: "Erro ao buscar categoria" });
        }
    }

    static async cadastrarCategoria(req: Request, res: Response) {
        try {
            const { nome } = req.body;

            if (!nome || typeof nome !== "string" || nome.trim() === "") {
                return res.status(400).json({ mensagem: "O nome da categoria é obrigatório" });
            }

            const categoria = await Categoria.cadastrarCategoria(nome.trim());

            return res.status(201).json(categoria);
        } catch (erro: any) {
            console.error(erro);

            if (erro && erro.code === "23505") {
                return res.status(409).json({ mensagem: "Categoria já existe" });
            }

            return res.status(500).json({ mensagem: "Erro ao cadastrar categoria" });
        }
    }
}

export default CategoriaController;
