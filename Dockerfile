# Verwende ein Node-Image für die Build-Schritte
FROM node:20-alpine AS build

# Arbeitsverzeichnis erstellen und setzen
WORKDIR /app

# Package.json und Package-lock.json kopieren, dann Abhängigkeiten installieren
COPY package*.json ./
RUN npm install

# Den gesamten Source-Code kopieren und Angular-Projekt builden
COPY . .
RUN npm run build --prod --base-href=/ready4work/

# Ein schlankes NGINX-Image verwenden, um die Anwendung zu hosten
FROM nginx:alpine
COPY --from=build /app/dist/ready4-work/browser /usr/share/nginx/html/ready4work

# NGINX läuft standardmäßig auf Port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
