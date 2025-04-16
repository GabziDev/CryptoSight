# CryptoSight [![Docker](https://img.shields.io/badge/docker-ready-blue?logo=docker)](https://www.docker.com/) [![Licence MIT](https://img.shields.io/badge/licence-MIT-green.svg)](./LICENSE)
Crypto Sight est une plateforme dédiée à la consultation et à la visualisation de cryptomonnaies.
Elle permet de lister les principales cryptos du marché, d'afficher leurs prix, leurs volumes,
leurs variations et d'autres données pertinentes en temps réel. L'objectif est de fournir un
outil simple, clair et efficace pour suivre l'évolution du marché crypto.


## 🚀 Fonctionnalités
- 📊 Liste des cryptos
- 💸 Prix, Volume, et variations en temps réel
- ⭐ Système de favoris
- 📈 Graphique en ligne ou bougie (Chart.js)
- ⚡ Données [CoinGecko](https://docs.coingecko.com/reference/introduction)


## 🐳 Installation via Docker
### Prérequis
- [Window AMD64 Download](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe?utm_source=docker&utm_medium=webreferral&utm_campaign=docs-driven-download-win-amd64)<br>
- [Autre](https://www.docker.com/get-started/)

#### Build le projet
`docker-compose up --build -d`

## 🧩 API
Routes protégées :
- GET /api/user/favorites
- POST /api/user/favorite
- DELETE /api/user/favorite
- GET /api/user/info
- DELETE /api/user/account
<br>

> ```http
> POST /api/auth/register
>  ```
> | Paramètre    | Type     | Source       | Description          |
> | :----------- | :------- | :----------- | :------------------- |
> | `username` | `string` | Body         | **Obligatoire**      |
> | `email` | `string` | Body         | **Obligatoire**      |
> | `password` | `string` | Body         | **Obligatoire**      |
<br>

> ```http
> POST /api/auth/login
> ```
> | Paramètre    | Type     | Source       | Description          |
> | :----------- | :------- | :----------- | :------------------- |
> | `email` | `string` | Body         | **Obligatoire**      |
> | `password` | `string` | Body         | **Obligatoire**      |
<br>

> ```http
> GET /api/user/favorites
> ```
<br>

> ```http
> DELETE /api/user/favorite
> ```
> | Paramètre    | Type     | Source       | Description          |
> | :----------- | :------- | :----------- | :------------------- |
> | `cryptoiD` | `string` | Body         | **Obligatoire**      |
<br>

> ```http
> POST /api/user/favorite
> ```
> | Paramètre    | Type     | Source       | Description          |
> | :----------- | :------- | :----------- | :------------------- |
> | `cryptoiD` | `string` | Body         | **Obligatoire**      |
<br>

> ```http
> GET /api/user/info
> ```
<br>

> ```http
> DELETE /api/user/account
> ```



