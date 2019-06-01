var Datastore = require('nedb');

var db = {};

db.projeto = new Datastore({
    filename: 'db-projeto.db', 
    autoload: true 
});

db.usuario = new Datastore({
    filename: 'db-usuario.db', 
    autoload: true 
});

db.pagamento = new Datastore({
    filename: 'db-pagamento.db', 
    autoload: true 
});

db.retirada = new Datastore({
    filename: 'db-retirada.db', 
    autoload: true 
});



module.exports = db;