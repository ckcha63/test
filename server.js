var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var b = require('bonescript');
var led = "P8_8";
b.pinMode(led, 'out');
var motion = "P8_7";
var longCount=0
  var motionInterval=null;
b.pinMode(motion, b.INPUT);

app.get('/', function (req, res) {
//send the index.html file for all requests
res.sendFile(__dirname + '/index.html');
});
http.listen(3001, function () {
console.log('listening on *:3001');
});

io.on('connection', function (socket) {
console.log('Get a connection');
   
    socket.on('ledToggle', function (status) {
        console.log('ledToggle')
        b.digitalWrite(led, status);
    });
    
    socket.on('motionToggle', function (status) {
         if (status===1){
             var count=0;
             var longCount=0;
             var shortCount=0;
             var currentCount=0;
             motionInterval=setInterval(checkPIR, 1500); // Checks the Sensor Every 2.5 Seconds
            
            function checkPIR(){
            b.digitalRead(motion, printStatus);
            }
            
            function printStatus(x) {
                if(x.value === 1){
                console.log("Motion Detected");
                count+=1
                currentCount+=1
                
                socket.emit('motionDetected', count);
                }
                else{
                console.log("No Motion Detected");
                     console.log(longCount)
                     if (currentCount>=5){
                         console.log('long');
                         longCount+=1;
                         socket.emit('longMotionPoll',longCount)
                         currentCount=0;
                     }
                     else if(currentCount>=1){
                         console.log('short')
                         shortCount+=1;
                         socket.emit('shortMotionPoll',shortCount)
                         currentCount=0;
                     }
                }
            }
         }
         else{
             console.log('stop');
             clearInterval(motionInterval);
             
         }

    });
    
});

