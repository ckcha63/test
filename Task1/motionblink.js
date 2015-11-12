var script = require('bonescript');
var led = "P8_8";
var motionInput='P8_7';
script.pinMode(motionInput, script.INPUT);
script.pinMode(led, 'out');

function checkMotion(){     // function to recieve input from motion sensor
script.digitalRead(motionInput, printStatus);
}

function printStatus(motionInput) {  //function to give the output (respond) according to the input
    if(motionInput.value === 1){
         script.digitalWrite(led, 1);  // turn on led on when motion detected
    console.log("Motion Detected");
    }
    else{
    console.log("No Motion Detected");  
         script.digitalWrite(led, 0);   // turn off led on when no motion detected
    }
}

setInterval(checkMotion, 1500); // sensor check in 1.5 sec interval

