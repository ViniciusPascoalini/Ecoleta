const express = require("express")
const server = express()

const db = require("./database/db.js")

server.use(express.static("public"))

// habilitar uso do req.body na aplicação
server.use(express.urlencoded({ extended: true }))

//template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

server.get("/", (req, res) => {
    return res.render("index.html")

})

server.get("/create-point", (req, res) => {
    //console.log(req.query)

    return res.render("create-point.html")

})

server.post("/savepoint", (req, res) => {

    db.run(`
        CREATE TABLE IF NOT EXISTS places(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT    
        );
    `)
    
    //Inserir dados no Banco de Dados
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
            req.body.image,
            req.body.name,
            req.body.address,
            req.body.address2,
            req.body.state,
            req.body.city,
            req.body.items
    ]

    function afterInsertData(err){
        if(err) {
            return console.log(err)
        }
        
        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved:true})
    }
    
    //função callback vai ser executada só depois do preenchimento da tabela. Enquanto isso o js segue rodando

    db.run(query, values, afterInsertData)

})

server.get("/search", (req, res) => {

    const search = req.query.search
    console.log(search)

    if(search == ""){
        return res.render("search-results.html", {total: 0})
    }



    db.all(`SELECT * FROM places WHERE city LIKE'%${search}%'`, function(err, rows){
        if(err){
            return console.log(err)
        }

        const total = rows.length

        //mostrar a página html com  os dados do banco de dados
        return res.render("search-results.html", {places: rows, total}) // =total: total
    })

})

db.all(`SELECT * FROM places`, function(err, rows){
    if(err){
        return console.log(err)
    }

    console.log("Aqui estão seus registros: ")
    console.log(rows)
})

// ligar o servidor
server.listen(3000)