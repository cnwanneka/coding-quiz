

setInterval(function(){
    console.log("hello world")
},1000);

let timer = 75;
let intervalId =setInterval(function(){
    timer--
    console.log(timer);
},1000);
clearInterval(intervalId);
