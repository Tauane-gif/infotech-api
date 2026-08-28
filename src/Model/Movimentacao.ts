import pool from "../Model/DataBaseModel.js";

class Movimentacao {
    static async listarMovimentacoes() {
        const resultado = await pool.query(`
            SELECT
                id_movimentacao,
                id_produto,
                id_movimentacao_origem,
                tipo,
                motivo,
                quantidade,
                preco_unitario_praticado,
                valor_total,
                observacao,
                data_movimentacao
            FROM movimentacao
            ORDER BY id_movimentacao
        `);

        return resultado.rows;
    }

    static async buscarMovimentacao(id: number) {
        const resultado = await pool.query(`
            SELECT
                id_movimentacao,
                id_produto,
                id_movimentacao_origem,
                tipo,
                motivo,
                quantidade,
                preco_unitario_praticado,
                valor_total,
                observacao,
                data_movimentacao
            FROM movimentacao
            WHERE id_movimentacao = $1
        `, [id]);

        return resultado.rows[0];
    }

    static async cadastrarMovimentacao(
        idProduto: number,
        idMovimentacaoOrigem: number | null,
        tipo: string,
        motivo: string,
        quantidade: number,
        precoUnitarioPraticado: number | null,
        valorTotal: number | null,
        observacao: string
    ) {
        const resultado = pool.query(`
            INSERT INTO movimentacao (
                id_produto,
                id_movimentacao_origem,
                tipo,
                motivo,
                quantidade,
                preco_unitario_praticado,
                valor_total,
                observacao
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `, [
            idProduto,
            idMovimentacaoOrigem,
            tipo,
            motivo,
            quantidade,
            precoUnitarioPraticado,
            valorTotal,
            observacao
        ]);

        return resultado.then(res => res.rows[0]);
    }
}

export default Movimentacao;
