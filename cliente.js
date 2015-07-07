
var Red = require('./lib/red');

var cliente = new Red({broadcastAddress: '10.8.0.255'});
cliente.socket.bind(function() {
    cliente.socket.setBroadcast(true);
    setInterval(function(){
        cliente.enviar('Enviando MENSAJE!');
    }, 1000);
});
