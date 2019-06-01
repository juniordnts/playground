var http = require('http');

var app = require('./app/config/express');
var db = require('./app/config/database');

// http.createServer(app).listen(3000, function() {
//     console.log('Servidor na porta: ' + this.address().port);
// });



const PORT = process.env.PORT || 3000;

http.createServer(app).listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});