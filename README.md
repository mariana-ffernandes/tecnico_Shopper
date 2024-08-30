# Teste Técnico - Shopper / etapa 1

Esse é um teste técnico oferecido pela empresa Shopper para avaliar as habilidades do participante.

#### Tecnologias utilizadas
- Node.js
- Express
- TypeScript
- SQL
- Docker

#### Pré-requisitos
- Node.js (versão 14 ou superior)
- Docker e Docker Compose
- Conta no Google Cloud com acesso à API do Gemini

## Instalação

1. Clone o repositório:
   ```
   git clone https://github.com/mariana-ffernandes/tecnico_Shopper.git
   cd tecnico_Shopper
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```
   GEMINI_API_KEY= sua_chave_de_api_do_gemini
   ```

4. Build e execute o projeto usando Docker Compose:
   ```
   docker-compose up --build
   ```
## Uso

A API estará disponível em `http://localhost:3000`. Aqui estão os endpoints disponíveis:

### POST /upload

Faz o upload de uma nova leitura de medidor.

Corpo da requisição:
```json
{
    "image": string,
    "customer_code": string,
    "measure_datetime": Date,
    "measure_type": "WATER" | "GAS";
}
```

### PATCH /confirm

Confirma uma leitura existente.

Corpo da requisição:
```json
{
  "measure_uuid": "string",
  "confirmed_value": number
}
```
- ## Desenvolvimento

Para rodar o projeto em modo de desenvolvimento:

```
npm run dev
```

## Testes

Para executar os testes (quando implementados):

```
npm test
```
