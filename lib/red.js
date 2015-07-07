
var EventEmitter = require('events').EventEmitter;
var dgram = require('dgram');
var os = require('os');
var nodeVersion = process.version.replace('v','').split(/\./gi).map(function (t) { return parseInt(t, 10) });

var Red = function(opciones) {
    var self = this;
//    this.address    = (opciones.address !== undefined) ? opciones.address : '0.0.0.0';
    this.address = (opciones && opciones.address) || '0.0.0.0';
    this.port = (opciones && opciones.port) || 5555;
    this.broadcastAddress = (opciones && opciones.broadcastAddress) || '255.255.255.255';
    this.reuseAddress = false;

    if (nodeVersion[0] === 0 && nodeVersion[1] < 12) {
        //node v0.10 does not support passing an object to dgram.createSocket
	//not sure if v0.11 does, but assuming it does not.
        this.socket = dgram.createSocket('udp4');
    }
    else {
        this.socket = dgram.createSocket({type: 'udp4', reuseAddr: this.reuseAddress });
    }
    
    this.escuchar = function() {
        self.socket.on('listening', function () {
            var address = self.socket.address();
            console.log('UDP Client listening on ' + address.address + ":" + address.port);
            self.socket.setBroadcast(true);
        });
    };
    
    this.recibir = function() {
        self.socket.on('message', function (message, rinfo) {
            console.log('Message from: ' + rinfo.address + ':' + rinfo.port + ' - ' + message);
        });
    };
    
    this.enviar = function(msg) {
        var message = new Buffer(msg);
        self.socket.send(message, 0, message.length, self.port, self.broadcastAddress, function() {
            console.log("Sent '" + message + "'");
        });
    };
};

module.exports = Red;