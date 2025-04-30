export interface ResponseApiType{
    message: string; // Mensagem de sucesso ou erro
    statusCode: number; // Código de status da resposta
    userId?: string; // Opcional: ID do usuário criado, caso a API retorne
    status:number;
    data:string;
    token:string;
    name:string;
}