## MUSIC-CONTROL  :guitar:

## Tecnologias utilizadas :rocket:


<div style="display:flex; ">
<img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white">
<img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white">
<img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white">
</div>

## Endpoints User
- createUser: Endpoint responsável por criar um usuário.
```sh
POST localhost:8080/user/create-user
```
- editUser: Endpoint responsável por editar um usuário.
```sh
PUT localhost:8080/user/edit-user/{idUser}
```
- delete-user: Endpoint responsável por deletar um usuário.
```sh
DELETE localhost:8080/user/delete-user/{idUser}
```
- login: Endpoint responsável por realizar o login de um usuário.
```sh
GET localhost:8080/user/login
```
- logoff: Endpoint responsável por realizar o logoff do usuário.
```sh
GET localhost:8080/user/logoff
```

## Endpoints Music
- createMusic: Endpoint responsável por criar uma música.
```sh
POST localhost:8080/music/create-music
```
- editMusic: Endpoint responsável por editar uma música.
```sh
PUT localhost:8080/music/edit-music/{idMusic}
```
- deleteMusic: Endpoint responsável por apagar uma música.
```sh
DELETE localhost:8080/music/delete-music/{idMusic}
```
- getMusicsByUser: Endpoint responsável por buscar as músicas do usuário.
```sh
GET localhost:8080/music/get-music-by-user/{idUser}
```
- getMusicById: Endpoint responsável por buscar uma música pelo id.
```sh
GET localhost:8080/music/get-music-by-id/{idMusic}
```
- filterMusics: Endpoint responsável por filtrar as músicas do usuário.
```sh
GET localhost:8080/music/filter-musics/{idUser}/{field}/{value}
```

## Desenvolvedor deste projeto :computer:

- Matheus Lemos Vieira dos Santos.
