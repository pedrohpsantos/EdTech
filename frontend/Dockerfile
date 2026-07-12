# Estágio de Build
FROM node:24-alpine AS build

# Diretório de trabalho
WORKDIR /app

# Copiar os arquivos de dependência
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm ci

# Copiar o restante do código
COPY . .

# Receber variável de ambiente em build-time (Melhoria HealthTech)
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Construir a aplicação (Vite)
RUN npm run build

# Estágio de Produção (Nginx)
FROM nginxinc/nginx-unprivileged:alpine

# Copiar build gerado no estágio anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar arquivo de configuração do nginx se necessário (fallback para SPA router)
# Como é React Router, o fallback pro index.html é essencial
RUN echo 'server { \
    listen       8080; \
    server_name  localhost; \
    location / { \
        root   /usr/share/nginx/html; \
        index  index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
    error_page   500 502 503 504  /50x.html; \
    location = /50x.html { \
        root   /usr/share/nginx/html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expor porta 8080 do Nginx
EXPOSE 8080

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
