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
    console.log(req.query)

    return res.render("create-point.html")

})

server.post("/savepoint", (req, res) => {
    
    console.log(req.body)
    
    return res.send("ok")
})

server.get("/search", (req, res) => {
    db.all(`SELECT * FROM places`, function(err, rows){
        if(err){
            return console.log(err)
        }

        const total = rows.length

        //mostrar a página html com  os dados do banco de dados
        return res.render("search-results.html", {places: rows, total}) // =total: total
    })

})


// ligar o servidor
server.listen(3000)