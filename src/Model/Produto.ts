import { DatabaseModel } from "../Model/DataBaseModel.js";

const database = new DatabaseModel().pool;

class Produto {
    static async listarProdutos() {
        const resultado = await database.query(`
            SELECT
                id_produto,
                id_categoria,
                codigo,
                nome,
                descricao,
                preco_unitario,
                quantidade_disponivel,
                quantidade_minima,
                ativo,
                data_cadastro
            FROM produto
            ORDER BY id_produto
        `);

        return resultado.rows;
    }

    static async buscarProduto(id: number) {
        const resultado = await database.query(`
            SELECT
                id_produto,
                id_categoria,
                codigo,
                nome,
                descricao,
                preco_unitario,
                quantidade_disponivel,
                quantidade_minima,
                ativo,
                data_cadastro
            FROM produto
            WHERE id_produto = $1
        `, [id]);

        return resultado.rows[0];
    }

    static async cadastrarProduto(
        idCategoria: number,
        codigo: string,
        nome: string,
        descricao: string | null,
        precoUnitario: number,
        quantidadeDisponivel: number,
        quantidadeMinima: number
    ) {
        const resultado = await database.query(`
            INSERT INTO produto (
                id_categoria,
                codigo,
                nome,
                descricao,
                preco_unitario,
                quantidade_disponivel,
                quantidade_minima
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `, [
            idCategoria,
            codigo,
            nome,
            descricao,
            precoUnitario,
            quantidadeDisponivel,
            quantidadeMinima
        ]);

        return resultado.rows[0];
    }

    static async listarProdutosReposicao() {
        const resultado = await database.query(`
            SELECT *
            FROM vw_produtos_reposicao
        `);

        return resultado.rows;
    }

        static async atualizarProduto(
        id: number,
        idCategoria: number,
        codigo: string,
        nome: string,
        descricao: string | null,
        precoUnitario: number,
        quantidadeDisponivel: number,
        quantidadeMinima: number
    ) {
        const resultado = await database.query(`
            UPDATE produto
            SET
                id_categoria = $1,
                codigo = $2,
                nome = $3,
                descricao = $4,
                preco_unitario = $5,
                quantidade_disponivel = $6,
                quantidade_minima = $7
            WHERE id_produto = $8
            RETURNING *
        `, [
            idCategoria,
            codigo,
            nome,
            descricao,
            precoUnitario,
            quantidadeDisponivel,
            quantidadeMinima,
            id
        ]);

        return resultado.rows[0];
    }

    static async removerProduto(id: number) {
        const resultado = await database.query(`
            DELETE FROM produto
            WHERE id_produto = $1
            RETURNING *
        `, [id]);

        return resultado.rows[0];
    }
}

export default Produto;