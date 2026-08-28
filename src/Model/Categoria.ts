import pool from "../Model/DataBaseModel.js";

class Categoria {
    static async listarCategorias() {
        const resultado = await pool.query(`
            SELECT
                id_categoria,
                nome
            FROM categoria
            ORDER BY nome
        `);

        return resultado.rows;
    }

    static async buscarCategoria(id: number) {
        const resultado = await pool.query(`
            SELECT
                id_categoria,
                nome
            FROM categoria
            WHERE id_categoria = $1
        `, [id]);

        return resultado.rows[0];
    }

    static async cadastrarCategoria(nome: string) {
        const resultado = await pool.query(`
            INSERT INTO categoria (nome)
            VALUES ($1)
            RETURNING *
        `, [nome]);

        return resultado.rows[0];
    }
}

export default Categoria;
