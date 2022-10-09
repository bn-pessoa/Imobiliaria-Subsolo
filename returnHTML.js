const { count } = require('console')
const { resolve } = require('path')
var sqlite = require('sqlite3')
var db = new sqlite.Database('./database/database.db')

var linhas
module.exports = { loadImoveis: function(){
  var strHTMLinicio = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SubSolo</title>
    <link rel="shortcut icon" href="img/cartas.ico" type="image/x-icon" />
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700&family=Nunito:wght@200;300;400;600&family=Open+Sans:wght@400;500;700&display=swap"
      rel="stylesheet"
    />
    <!-- CSS Bootstrap -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
      crossorigin="anonymous"
    />
    <!-- Bootstrap Icons -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css"
    />
    <!-- CSS do Projeto -->
    <link rel="stylesheet" href="css/styles.css" />
    <!-- Javascript Bootstrap -->
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
      crossorigin="anonymous"
    ></script>
  </head>
  <body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg fixed-top bg-primary-color" id="navbar">
      <div class="container py-3">
        <a class="navbar-brand primary-color" href="#">
          <img src="img/cartas.ico" alt="ArqMovi" />
          <span>SubSolo</span>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-items"
          aria-controls="navbar-items"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="bi bi-list"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbar-items">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a
                class="nav-link primary-color"
                aria-current="page"
                href="index.html"
                >Home</a>
            </li>
                <li class="nav-item">
                    <a class="nav-link primary-color" href="index.html">Contato</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link primary-color" href="/imoveis">Todos os Imóveis</a>
                </li>
                </ul>
            </div>
            </div>
        </nav>

        <!--Infos--> 
        <section class="container" id="info-container">
            <div class="col-12">
              <h2 class="title primary-color">Detalhes Importantes</h2>
              <h2 class="title primary-color">
                Todos os Imóveis
              </h2>
            </div>`


    var strHTMLimoveis = ''
    var count = 0
    while(linhas[count] != undefined){
        strHTMLimoveis += `<div class="col-12">
              <div class="row">
                <div class="col-12 col-md-5" id="info-banner">
                  <img
                    src="${linhas[count].imagem}"
                    alt="Informações da Empresa"
                    class="img-fluid"
                  />
                </div>
                <div class="col-12 col-md-7 bg-secondary-color" id="info-content">
                  <div class="row">
                    <div class="col-12">
                      <h2 class="title primary-color">
                        ${linhas[count].titulo}
                      </h2>
                      <p class="subtitle secondary-color">
                        ${linhas[count].descricao}
                      </p>
                    </div>
                    <div class="col-12" id="info-numbers">
                      <div class="row">
                        <div class="col-4">
                          <h3 class="primary-color">${linhas[count].metros_quadrados}</h3>
                          <p class="secondary-color">m²</p>
                        </div>
                        <div class="col-4">
                          <h3 class="primary-color">${linhas[count].dormitorios}</h3>
                          <p class="secondary-color">dormitórios</p>
                        </div>
                      </div>
                      <div class="col-12">
                        <h4 class="primary-color">Aluguel R$${linhas[count].valor}</h4>
                      </div>
                  </div>
                </div>
              </div>
            </div>`
        count++
    }


    strHTMLfim = `</section>
        </body>
    </html>`

    return strHTMLinicio + strHTMLimoveis + strHTMLfim
},

carregar: function(){
    function execDB(cb) {
        db.all("select * from Imoveis", function (err, rows) {
            if (err) console.log(err)
            else {
                cb(null, rows)
            }
        })
    }

    execDB(function (err, rows) {
        if (err) console.log(err)
        else {
            linhas = rows
        }
    })
},

imovelToDelete: function(){
  var strHTMLinicio = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SubSolo</title>
    <link rel="shortcut icon" href="img/cartas.ico" type="image/x-icon" />
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700&family=Nunito:wght@200;300;400;600&family=Open+Sans:wght@400;500;700&display=swap"
      rel="stylesheet"
    />
    <!-- CSS Bootstrap -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
      crossorigin="anonymous"
    />
    <!-- Bootstrap Icons -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css"
    />
    <!-- CSS do Projeto -->
    <link rel="stylesheet" href="css/styles.css" />
    <!-- Javascript Bootstrap -->
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
      crossorigin="anonymous"
    ></script>
  </head>
  <body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg fixed-top bg-primary-color" id="navbar">
      <div class="container py-3">
        <a class="navbar-brand primary-color" href="#">
          <img src="img/cartas.ico" alt="ArqMovi" />
          <span>SubSolo</span>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-items"
          aria-controls="navbar-items"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="bi bi-list"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbar-items">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a
                class="nav-link primary-color"
                aria-current="page"
                href="index-adm.html"
                >Home</a>
            </li>
                <li class="nav-item">
                    <a class="nav-link primary-color" href="index.html">Contato</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link primary-color" href="imoveis">Todos os Imóveis</a>
                </li>
                </ul>
            </div>
            </div>
        </nav>

        <!--Infos--> 
        <section class="container" id="info-container">
            <div class="col-12">
              <h2 class="title primary-color">Detalhes Importantes</h2>
              <h2 class="title primary-color">
                Todos os Imóveis
              </h2>
            </div>`
    var strHTMLimoveis = ''
    var count = 0
    while(linhas[count] != undefined){
        strHTMLimoveis += `
            <img style="float:left;" src="${linhas[count].imagem}" 
                alt="" width="100px" height="100px">
            <div style="float:left; margin-left: 16px;">
                <h1 style="font-size: 1.3em;">${linhas[count].titulo}</h1>
                <p>${linhas[count].cidade} - ${linhas[count].estado}</p>
                <p>id: ${linhas[count].id}</p>
            </div>
            <br style="clear: left;">`

        count++
    }


    strHTMLfim = `
    <form style="margin-top: 10px;" action="/remove-imovel" method="post">
        <input type="number" name="id" placeholder="Digite o id do imovel">
        <input type="submit" value="Remover">
    </form>
    </section>
        </body>
    </html>`

    return strHTMLinicio + strHTMLimoveis + strHTMLfim
}
}