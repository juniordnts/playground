var db = require('../config/database');

var api = {}

api.adicionaProjeto = function(req, res){
    var data = {
        cliente  : req.body.cliente,
        inicio   : req.body.inicio,
        fim      : req.body.fim,
        total    : req.body.total,
        parcelas : req.body.parcela,
        carteira : req.body.total * 0.3,
        pago     : [{}],

        criterio1 : req.body.crit1 / 100,
        criterio2 : req.body.crit2 / 100,
        criterio3 : req.body.crit3 / 100,

        devteam   : req.body.devteam,

    }

    db.projeto.insert(data, function(err, newDoc){
        if(err) return console.log(err);
        res.json("Projeto adicionado!");
    })

}

api.inserePagamento = function(req, res){
    var data = {
        projeto : req.body.projeto,
        valor   : req.body.valor,
        data    : req.body.data
    }

    db.projeto.findOne({_id: data.projeto }, function(err, doc) {

        if (err) return console.log(err);   
        data.beneficiados = doc.devteam;

        db.pagamento.insert(data, function(err, newDoc){
            if(err) return console.log(err);
            // res.json("Pagamento adicionado!");
            doc.devteam.forEach(element => {

                db.usuario.findOne({_id: element}, function (err, usuario) {
                    if(err)return console.log(err);
                    var media = (usuario.crit1 + usuario.crit2 + usuario.crit3)/3;
                    db.usuario.update(
                        { _id: element },
                        { $push: { ganhos: { $each: [{nome: doc.cliente, valor: data.valor * 0.3 * media, data: data.data, id: newDoc._id}] } } },
                        {}, 
                        function () {
                            
                    });
                });
            });
            res.json("Pagamento adicionado!");
        })
    });
};

api.insereRetirada = function(req, res){
    var data = {
        usuario : req.body.usuario,
        valor   : req.body.valor,
        descricao   : req.body.descricao,
        data    : req.body.data
    }

    db.retirada.insert(data, function(err, newDoc){
        if(err) return console.log(err);

        db.usuario.update(
            { _id: data.usuario },
            { $push: { retiradas: { $each: [{valor: data.valor, descricao: data.descricao, data: data.data, id: newDoc._id}] } } },
            {}, 
            function () {
        });

        res.json("Retirada feita!");
    })
}

api.alteraIndice = function(req, res){
    var data = {
        id      : req.body.userid,
        crit1   : req.body.crit1 /100,
        crit2   : req.body.crit2 /100,
        crit3   : req.body.crit3 /100
    }

    // db..insert(data, function(err, newDoc){
    //     if(err) return console.log(err);

        db.usuario.update(
            { _id: data.id },
            { $set: { crit1: data.crit1, crit2: data.crit2, crit3: data.crit3 } },
            {}, 
            function () {
        });

        res.json("Indice alterado!");
    // })
}

// ----------------------------------------

api.projetos = function(req, res){
    db.projeto.find({}, function (err, projetos) {
        if(err)return console.log(err);
        res.json(projetos);
    });
}

api.usuarios = function(req, res){
    db.usuario.find({}, function (err, usuarios) {
        if(err)return console.log(err);
        res.json(usuarios);
    });
}

api.astronauta = function(req, res){
    db.usuario.findOne({ _id : "1" }, function (err, user) {
        if(err)return console.log(err);
        res.json(user);
    });
}

api.relatorio = function(req, res){

}













api.busca = function(req, res) {
   db.findOne({_id: req.params.fotoId }, function(err, doc) {
        if (err) return console.log(err);
        res.json(doc);
    });
};

api.atualiza = function(req, res) {
    
    db.update({_id : req.params.fotoId }, req.body, function(err, numReplaced) {
        if (err) return console.log(err);
        if(numReplaced) res.status(200).end();
        res.status(500).end();
        console.log('Atualizado com sucesso: ' + req.body._id);
        res.status(200).end();
    });  
};

api.lista = function(req, res) {
    db.find({}).sort({titulo: 1}).exec(function(err, doc) {
        if (err) return console.log(err);
        res.json(doc);
    });
};

api.listaPorGrupo = function(req, res) {
    var grupoId = parseInt(req.params.grupoId);
    db.find({grupo: grupoId}, function(err, doc) {
        if (err) return console.log(err);
        res.json(doc);
    });

};

api.remove = function(req, res) {

    db.remove({ _id: req.params.fotoId }, {}, function (err, numRemoved) {
        if (err) return console.log(err);
        console.log('removido com sucesso');
        if(numRemoved) res.status(200).end();
        res.status(500).end();
    });
};

api.listaGrupos = function(req, res) {

    res.json([
        {
            _id: 1, 
            nome: 'esporte'
        }, 
        { 
            _id: 2, 
            nome: 'lugares', 
        }, 
        { 
            _id: 3, 
            nome: 'animais'
        }
    ]);
        
};


module.exports = api;