# Etapa 1: Construir a aplicação
FROM node:18 AS build

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todo o código-fonte
COPY . .

# Execute o build da aplicação
RUN npm run build

FROM node:18 AS production

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie apenas a pasta build da etapa de build
COPY --from=build /usr/src/app/dist ./build

# Copie o arquivo .env (se necessário)
COPY arquivo.env ./

RUN mkdir -p ./uploads

# Instale apenas as dependências necessárias para a produção
COPY package*.json ./
RUN npm install

# Exponha a porta que a aplicação vai usar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD [ "node", "build/main.js" ]