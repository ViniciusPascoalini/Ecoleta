const sqlite3 = require("sqlite3").verbose()

//criar o objeto que irá operar no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db



//serialize(roda uma sequencia de código?)
/* db.serialize( () => {
    //Criar uma tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            projectUrl TEXT,
            image TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT    
        );
    `)

    //Inserir dados na tabela
    /*const query = `
        INSERT INTO places (
            name,
            projectUrl,
            image,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?,?);
    `
    const values = [
        "https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
        "Paparsider",
        "Guilherme Gemballa, Jardim América",
        "Nº 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
    ]

    function afterInsertData(err){
        if(err) {
            return console.log(err)
        }
        
        console.log("Cadastrado com sucesso")
        console.log(this)
    }
    
    //função callback vai ser executada só depois do preenchimento da tabela. Enquanto isso o js segue rodando

    db.run(query, values, afterInsertData)

    //Consultar os dados da tabela
    db.all(`SELECT * FROM places`, function(err, rows){
        if(err){
            return console.log(err)
        }

        console.log("Aqui estão seus registros: ")
        console.log(rows)
    })

    //Deletar um dado da tabela
    
    db.run(`DELETE FROM places WHERE id = ?`, [4], function(err){
        if(err){
            return console.log(err)
        }

        console.log("Registro deletado com sucesso")
    })
})*/