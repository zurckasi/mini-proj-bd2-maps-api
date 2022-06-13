# Mini projeto de Banco de Dados 
Aplicativo desenvolvido para a disciplina de banco de dados 2 do curso de ADS no IFPB, realiza a localização e conexão entre motoristas e passageiros.

<div align="center" style="margin: 0 auto; display: flex;  justify-content: space-around; flex-wrap: wrap; width: 700px;">
        <img height="250 px" src="./assets/screen_01.jpg">
        <img height="250 px" src="./assets/screen_02.jpg">
        <img height="250 px" src="./assets/screen_03.jpg">
        <img height="250 px" src="./assets/screen_04.jpg">
        <img height="250 px" src="./assets/screen_05.jpg">
</div>

## Pré-requisitos

:warning: [Node](https://nodejs.org/en/download/)
:warning: [Expo](https://docs.expo.dev/get-started/installation/)
:warning: [Expo Go](https://expo.dev/client)

## Iniciando/Configurando banco de dados

Na pasta backend criar o arquivo .env passando as seguintes informações do seu banco de dados:

```
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
```

Necessário fazer uma configuração no arquivo index.js dentro da pasta API para acessar o IP do computador para acessar localhost
* appbd2 > src > api > index.js
```
 baseURL: 'http://seuIP:3000'
```


## Como rodar a aplicação :arrow_forward:

No terminal, clone o projeto: 

```
git clone https://github.com/zurckasi/mini-proj-bd2-maps-api.git
```

No terminal dentro da pasta backend, baixe as dependências usando o seguinte comando:
```
npm install
```
Para iniciar o backend:
```
npm start
```

No terminal dentro da pasta appbd2, baixe as dependências usando o seguinte comando:
```
npm install
```
Para iniciar a aplicação:
```
npm start
```
Abra o aplicativo Expo Go no celular e leia o QRcode que aparecerá no navegador

...

## Desenvolvedores :octocat:


| [<img src="https://avatars.githubusercontent.com/u/85362991?v=4" width=115><br><sub>Isak Furtado</sub>](https://github.com/zurckasi) |  [<img src="https://avatars.githubusercontent.com/u/64111135?v=4" width=115><br><sub>Ewerton Maciel</sub>](https://github.com/ewertonmac) |  [<img src="https://avatars.githubusercontent.com/u/60322853?v=4" width=115><br><sub>Rebehk Jordão</sub>](https://github.com/Rebehk) |
| :---: | :---: | :---: 
