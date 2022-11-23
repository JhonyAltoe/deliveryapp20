# Projeto Delivery App
Este é um projeto full-stack feito em grupo que simula um aplicativo de delivery, nele você vai encontrar uma tela de produtos com bebidas alcoólicas onde é possível adicionar ao carrinho e ter controle das entregas. Existem três tipos de usuários e são eles o Customer, Seller e Administrator, cada um com suas respectivas permissões.

## Tecnologias utilizadas
### Front-End
  - react
  - react-bootstrap
  - react-icons
  - react-router-dom

### Back-End
  - express
  - sequelize
  - mysql
  - dotenv
  - md5
  - cors
  - body-parser
  - express-async-errors
  - joi

### Rodando a aplicação
#### 1 - Após fazer o clone entre no diretório raiz se ainda não estiver feito:
```cd ./deliveryapp20```

#### 2 - Instale as depenências na raiz do projeto:
```npm install```

#### 3 - Abra um container com o Docker para iniciar o banco de dados MySQL rodando o seguinte script:
```npm run compose```

*Obs.: para a versão desktop do docker use o sequinte script*

```npm run compose-d```

#### 4 - Prepare o ambiênte para rodar a aplicação instalando as dependências do front-end e do back-end:
```npm run dev:prestart```

#### 5 - Finalmente inicie a aplicação:
```npm run dev```
