var express = require('express');
app = express();
server = require('http').createServer(app);
io = require('socket.io').listen(server);
 
var SerialPort = require("serialport")//.SerialPort
var serialPort = new SerialPort("/dev/cu.usbmodem14201", { baudRate: 9600 });
 
server.listen(8080);
app.use(express.static('public'));             
 
var brightness = 0;
 var tempo=0;
io.sockets.on('connection', function (socket) {
        socket.on('led', function (data) {
                brightness = data.value;
                tempo=data.time;

         
                if (brightness=='2') {
           
                        var blin=0;
                      var lamp=  setInterval(function(){
                                
                                if(brightness=='2'){
                                        
                                        if (blin==1){
                                                blin=0;
                                        }
                                else if(blin==0){
                                                blin=1;
                                        }
                                        
                                        var buf = new Buffer.alloc(1);
                                        buf.writeUInt8(blin, 0);
                                        serialPort.write(buf);
                                   
                        
                                }
                                else {
                                        clearInterval(lamp);
                                        tempo=0;
                                        return
                                };

                        },tempo);
                }
                else if(brightness==0 || brightness==1){
                        
                       
                        var buf = new Buffer.alloc(1);
                        buf.writeUInt8(brightness, 0);
                        serialPort.write(buf);
      
                }
               
                io.sockets.emit('led', {value: brightness});   
        });
       
        socket.emit('led', {value: brightness});
});
 
console.log("Web Server Started go to 'http://localhost:8080' in your Browser.");