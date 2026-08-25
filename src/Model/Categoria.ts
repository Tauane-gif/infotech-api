import { DatabaseModel } from "./DataBaseModel.js";
 
const database = new DatabaseModel().pool;
 
class Categoria {
  private idCategoria: number = 0;
  private nome: string;
 
  constructor(_nome: string) {
    this.nome = _nome;
  }
 
  public getIdCategoria(): number {
    return this.idCategoria;
  }
  public setIdCategoria(idCategoria: number): void {
    this.idCategoria = idCategoria;
  }
 
  public getNome(): string {
    return this.nome;
  }
  public setNome(nome: string): void {
    this.nome = nome;
  }
 
  static async listarCategorias(): Promise<Array<Categoria> | null> {
    try {
      const lista: Array<Categoria> = [];
 
      const query = `SELECT * FROM Categoria ORDER BY nome ASC;`;
      const respostaBD = await database.query(query);
 
      respostaBD.rows.forEach((categoriaBD: any) => {
        const novaCategoria = new Categoria(categoriaBD.nome);
 
        novaCategoria.setIdCategoria(categoriaBD.id_categoria);
        lista.push(novaCategoria);
      });
 
      return lista;
    } catch (error) {
      console.error(`Erro ao listar categorias. ${error}`);
      return null;
    }
  }
 
  static async cadastrarCategoria(categoria: any): Promise<boolean> {
    try {
      const query = `
        INSERT INTO Categoria (nome)
        VALUES ($1)
        RETURNING id_categoria;
      `;
 
      const respostaBD = await database.query(query, [
        categoria.nome
      ]);
 
      if (respostaBD.rows.length > 0) {
        console.info(`Categoria cadastrada com sucesso. ID: ${respostaBD.rows[0].id_categoria}`);
        return true;
      }
 
      return false;
    } catch (error) {
      console.error(`Erro ao cadastrar categoria. ${error}`);
      return false;
    }
  }
 
  static async listarCategoria(idCategoria: number): Promise<Categoria | null> {
    try {
      const query = `SELECT * FROM Categoria WHERE id_categoria=$1;`;
      const respostaBD = await database.query(query, [idCategoria]);
 
      if (respostaBD.rowCount && respostaBD.rowCount > 0) {
        const categoriaBD = respostaBD.rows[0];
 
        const categoria = new Categoria(categoriaBD.nome);
 
        categoria.setIdCategoria(categoriaBD.id_categoria);
        return categoria;
      }
 
      return null;
    } catch (error) {
      console.error(`Erro ao buscar categoria no banco. ${error}`);
      return null;
    }
  }
 
  static async atualizarCategoria(categoria: any): Promise<boolean> {
    try {
      const query = `
        UPDATE Categoria
        SET nome=$1
        WHERE id_categoria=$2;
      `;
 
      const respostaBD = await database.query(query, [
        categoria.nome,
        categoria.idCategoria
      ]);
 
      if (respostaBD.rowCount && respostaBD.rowCount > 0) {
        console.info(`Categoria atualizada com sucesso. ID: ${categoria.idCategoria}`);
        return true;
      }
 
      return false;
    } catch (error) {
      console.error(`Erro ao atualizar categoria. ${error}`);
      return false;
    }
  }
 
  static async removerCategoria(idCategoria: number): Promise<boolean> {
    try {
      const query = `DELETE FROM Categoria WHERE id_categoria=$1;`;
      const respostaBD = await database.query(query, [idCategoria]);
 
      if (respostaBD.rowCount && respostaBD.rowCount > 0) {
        console.info(`Categoria removida com sucesso. ID: ${idCategoria}`);
        return true;
      }
 
      return false;
    } catch (error) {
      console.error(`Erro ao remover categoria. ${error}`);
      return false;
    }
  }
}
 
export default Categoria;
 