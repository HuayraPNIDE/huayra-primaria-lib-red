
var Red = require('./lib/red');
var servidor = new Red();
servidor.escuchar();
servidor.recibir();
servidor.socket.bind(servidor.port);
