var api = require('../api');
var path = require('path');

module.exports  = function(app) {

    app.route('/api/projetos')
        .post(api.adicionaProjeto);

    app.route('/api/pagamentos')
        .post(api.inserePagamento);

    app.route('/api/retirada')
        .post(api.insereRetirada);

    app.route('/api/indices')
        .post(api.alteraIndice);

// --------------------------------------------

    app.route('/projetos')
        .get(api.projetos);

    app.route('/usuarios')
        .get(api.usuarios);

    app.route('/astronauta')
        .get(api.astronauta);

    

// --------------------------------------------

    app.all('/', function(req, res) {
        res.sendFile(path.resolve('public/home.html'));
    });
    app.all('/carteira', function(req, res) {
        res.sendFile(path.resolve('public/carteira.html'));
    });








    // app.route('/v1/fotos')
    //     .post(api.adiciona)
    //     .get(api.lista);

    // app.route('/v1/fotos/:fotoId')
    //     .delete(api.remove)
    //     .get(api.busca)
    //     .put(api.atualiza);

    // app.get('/v1/grupos', api.listaGrupos)
    // app.get('/v1/fotos/grupo/:grupoId', api.listaPorGrupo);
        

    // habilitando HTML5MODE
    // app.all('/*', function(req, res) {
    //     res.sendFile(path.resolve('public/index.html'));
    // });


};