export interface AlteracaoCampo<T = unknown> {
  readonly campo: string;
  readonly valorAnterior: T;
  readonly valorAtual: T;
}
