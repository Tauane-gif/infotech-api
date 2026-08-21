import { DatabaseModel } from "./DataBaseModel.js";
 
const database = new DatabaseModel().pool;
 
class Movimentacao {
  private idMovimentacao: number = 0;
  private idProduto: number;
  private idMovimentacaoOrigem: number;
  private tipo: string;
  private motivo?: string;
  private quantidade: number;
  private precoUnitarioPraticado: number;
  private valorTotal: number;
  private observacao?: string;
  private dataMovimentacao?: Date;
 
  constructor(
    _idProduto: number,
    _idMovimentacaoOrigem: number,
    _tipo: string,
    _quantidade: number,
    _precoUnitarioPraticado: number,
    _valorTotal: number,
    _motivo?: string,
    _observacao?: string,
    _dataMovimentacao?: Date
  ) {
    this.idProduto = _idProduto;
    this.idMovimentacaoOrigem = _idMovimentacaoOrigem;
    this.tipo = _tipo;
    this.quantidade = _quantidade;
    this.precoUnitarioPraticado = _precoUnitarioPraticado;
    this.valorTotal = _valorTotal;
    this.motivo = _motivo || '';
    this.observacao = _observacao || '';
    this.dataMovimentacao = _dataMovimentacao;
  }
 
  public getIdMovimentacao(): number {
    return this.idMovimentacao;
  }
  public setIdMovimentacao(idMovimentacao: number): void {
    this.idMovimentacao = idMovimentacao;
  }
 
  public getIdProduto(): number {
    return this.idProduto;
  }
  public setIdProduto(idProduto: number): void {
    this.idProduto = idProduto;
  }
 
  public getIdMovimentacaoOrigem(): number {
    return this.idMovimentacaoOrigem;
  }
  public setIdMovimentacaoOrigem(idMovimentacaoOrigem: number): void {
    this.idMovimentacaoOrigem = idMovimentacaoOrigem;
  }
 
  public getTipo(): string {
    return this.tipo;
  }
  public setTipo(tipo: string): void {
    this.tipo = tipo;
  }
 
  public getMotivo(): string {
    return this.motivo!;
  }
  public setMotivo(motivo: string): void {
    this.motivo = motivo;
  }
 
  public getQuantidade(): number {
    return this.quantidade;
  }
  public setQuantidade(quantidade: number): void {
    this.quantidade = quantidade;
  }
 
  public getPrecoUnitarioPraticado(): number {
    return this.precoUnitarioPraticado;
  }
  public setPrecoUnitarioPraticado(precoUnitarioPraticado: number): void {
    this.precoUnitarioPraticado = precoUnitarioPraticado;
  }
 
  public getValorTotal(): number {
    return this.valorTotal;
  }
  public setValorTotal(valorTotal: number): void {
    this.valorTotal = valorTotal;
  }
 
  public getObservacao(): string {
    return this.observacao!;
  }
  public setObservacao(observacao: string): void {
    this.observacao = observacao;
  }
 
  public getDataMovimentacao(): Date {
    return this.dataMovimentacao!;
  }
  public setDataMovimentacao(dataMovimentacao: Date): void {
    this.dataMovimentacao = dataMovimentacao;
  }
 
  static async listarMovimentacoes(): Promise<Array<Movimentacao> | null> {
    try {
      const lista: Array<Movimentacao> = [];
 
      const query = `SELECT * FROM Movimentacao ORDER BY data_movimentacao DESC;`;
      const respostaBD = await database.query(query);
 
      respostaBD.rows.forEach((movimentacaoBD: any) => {
        const novaMovimentacao = new Movimentacao(
          movimentacaoBD.id_produto,
          movimentacaoBD.id_movimentacao_origem,
          movimentacaoBD.tipo,
          movimentacaoBD.quantidade,
          movimentacaoBD.preco_unitario_praticado,
          movimentacaoBD.valor_total,
          movimentacaoBD.motivo,
          movimentacaoBD.observacao,
          movimentacaoBD.data_movimentacao
        );
 
        novaMovimentacao.setIdMovimentacao(movimentacaoBD.id_movimentacao);
        lista.push(novaMovimentacao);
      });
 
      return lista;
    } catch (error) {
      console.error(`Erro ao listar movimentacoes. ${error}`);
      return null;
    }
  }
 
  static async cadastrarMovimentacao(movimentacao: any): Promise<boolean> {
    try {
      const query = `
        INSERT INTO Movimentacao (id_produto, id_movimentacao_origem, tipo, motivo, quantidade, preco_unitario_praticado, valor_total, observacao, data_movimentacao)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP)
        RETURNING id_movimentacao;
      `;
 
      const respostaBD = await database.query(query, [
        movimentacao.idProduto,
        movimentacao.idMovimentacaoOrigem,
        movimentacao.tipo,
        movimentacao.motivo,
        movimentacao.quantidade,
        movimentacao.precoUnitarioPraticado,
        movimentacao.valorTotal,
        movimentacao.observacao
      ]);
 
      if (respostaBD.rows.length > 0) {
        console.info(`Movimentacao cadastrada com sucesso. ID: ${respostaBD.rows[0].id_movimentacao}`);
        return true;
      }
 
      return false;
    } catch (error) {
      console.error(`Erro ao cadastrar movimentacao. ${error}`);
      return false;
    }
  }
 
  static async listarMovimentacao(idMovimentacao: number): Promise<Movimentacao | null> {
    try {
      const query = `SELECT * FROM Movimentacao WHERE id_movimentacao=$1;`;
      const respostaBD = await database.query(query, [idMovimentacao]);
 
      if (respostaBD.rowCount && respostaBD.rowCount > 0) {
        const movimentacaoBD = respostaBD.rows[0];
 
        const movimentacao = new Movimentacao(
          movimentacaoBD.id_produto,
          movimentacaoBD.id_movimentacao_origem,
          movimentacaoBD.tipo,
          movimentacaoBD.quantidade,
          movimentacaoBD.preco_unitario_praticado,
          movimentacaoBD.valor_total,
          movimentacaoBD.motivo,
          movimentacaoBD.observacao,
          movimentacaoBD.data_movimentacao
        );
 
        movimentacao.setIdMovimentacao(movimentacaoBD.id_movimentacao);
        return movimentacao;
      }
 
      return null;
    } catch (error) {
      console.error(`Erro ao buscar movimentacao no banco. ${error}`);
      return null;
    }
  }
 
  static async listarMovimentacoesPorProduto(idProduto: number): Promise<Array<Movimentacao> | null> {
    try {
      const lista: Array<Movimentacao> = [];
 
      const query = `SELECT * FROM Movimentacao WHERE id_produto=$1 ORDER BY data_movimentacao DESC;`;
      const respostaBD = await database.query(query, [idProduto]);
 
      respostaBD.rows.forEach((movimentacaoBD: any) => {
        const novaMovimentacao = new Movimentacao(
          movimentacaoBD.id_produto,
          movimentacaoBD.id_movimentacao_origem,
          movimentacaoBD.tipo,
          movimentacaoBD.quantidade,
          movimentacaoBD.preco_unitario_praticado,
          movimentacaoBD.valor_total,
          movimentacaoBD.motivo,
          movimentacaoBD.observacao,
          movimentacaoBD.data_movimentacao
        );
 
        novaMovimentacao.setIdMovimentacao(movimentacaoBD.id_movimentacao);
        lista.push(novaMovimentacao);
      });
 
      return lista;
    } catch (error) {
      console.error(`Erro ao listar movimentacoes do produto. ${error}`);
      return null;
    }
  }
}
 
export default Movimentacao;
 