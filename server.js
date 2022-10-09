var express = require('express');
var http = require('http');
var multer = require('multer');
var fs = require('fs')
var sqlite = require('sqlite3')
var bodyParser = require('body-parser')
var toHTML = require('./returnHTML')

var app = express();
var server = http.createServer(app);

var db = new sqlite.Database('./database/database.db')
db.run("CREATE TABLE IF NOT EXISTS Imoveis(" +
    "id INTEGER NOT NULL PRIMARY KEY," +
    "titulo VARCHAR(30) NOT NULL," +
    "descricao VARCHAR(150) NOT NULL," +
    "rua VARCHAR(30) NOT NULL," +
    "numero INTEGER NOT NULL," +
    "cidade VARCHAR(50) NOT NULL," +
    "estado VARCHAR(30) NOT NULL," +
    "cep LONG NOT NULL," +
    "valor Float NOT NULL," +
    "metros_quadrados INTEGER NOT NULL," +
    "dormitorios INTEGER NOT NULL," +
    "contato VARCHAR(30) NOT NULL," +
    "imagem VARCHAR(50) NOT NULL)"
)

db.run("CREATE TABLE IF NOT EXISTS Funcionarios(" +
    "id INTEGER NOT NULL PRIMARY KEY," +
    "nome VARCHAR(30) NOT NULL," +
    "senha VARCHAR(30) NOT NULL," +
    "email VARCHAR(30))"
)
toHTML.carregar()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./'))

app.get('/', function (req, res) {
    res.sendFile('./index.html', {
        root: './'
    });
});

const upload = multer({
    dest: "./img/"
});

app.get('/imoveis', function(req, res){
    toHTML.carregar()
    res.send(toHTML.loadImoveis())
    res.end()
})

app.get('/remove-imovel', function(req, res){
    res.send(toHTML.imovelToDelete())
    res.end()
})

app.post('/admin', function (req, res) {
    db.all("select email, senha from Funcionarios", function(err, rows){
        if(err){
            console.log(err);
        }
        else{
            var count = 0
            var email = null
            var senha = null
            while(true){
                try{
                    email = rows[count].email
                    senha = rows[count].senha
                }
                catch(error){}
                if(email == req.body.email && senha == req.body.senha){
                    res.sendFile('./index-adm.html', {
                        root: './'
                    })
                    break
                }
                if(rows[count] == undefined){
                    res.send("<h1 style='text-align: center'>Usuario ou senha invalidos</h1>")
                    break
                }
                count++
            }
        }
    })
});

app.post('/add-imovel', upload.single("image"), function (req, res){
    db.run(`INSERT INTO Imoveis (titulo, descricao, rua, numero, cidade, estado, cep, valor, imagem, 
        dormitorios, metros_quadrados, contato)`
        + "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", req.body.titulo, req.body.descricao, req.body.rua, 
        req.body.numero, req.body.cidade, req.body.estado, req.body.cep, req.body.valor,
        req.file.path, req.body.dormitorios, req.body.metros_quadrados, req.body.contato
    )

    fs.rename(req.file.path, `img/${req.file.path}`, ()=>{})
    
    toHTML.carregar()
    res.redirect('./index-adm.html')
});

app.post('/remove-imovel', function(req, res){
    db.get('SELECT imagem FROM Imoveis WHERE id = ' + req.body.id, function(err, rows){
        if(err) console.log(err)
        else{
            fs.unlink(`${rows['imagem']}`, function (err) {
                if (err) console.log(err)
            })
        }
    })
    db.run('DELETE FROM Imoveis where id = ' + req.body.id)

    toHTML.carregar()
    res.redirect('./index-adm.html')
    res.end()
})

app.post('/add-funcionario', function(req, res){
    db.run("INSERT INTO Funcionarios(nome, senha, email) VALUES (?, ?, ?)", 
        req.body.nome, req.body.senha, req.body.email
    )

    res.redirect('./index-adm.html')
})

server.listen(4456, function () {
    console.log("server rodando");
});
