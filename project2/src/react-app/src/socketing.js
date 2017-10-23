
 import SockJS from 'sockjs-client';
 import Stomp from '@stomp/stompjs'
 
// var socket = io('http://localhost', {
// 	port: 80
// });


// socket.on('connect', () => {
//   console.log(socket.id); // 'G5p5...'
// })

// socket.emit('hello', 'world');


    var socket = new SockJS('http://localhost:8080/chat');
    var stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
       
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/greetings', function (greeting) {
            //showGreeting(JSON.parse(greeting.body).content);
        });
    });

function sendMessage() {

	stompClient.send("/app/hello", {}, "da");
}

function onNewMessage(result) {

	console.log("message");
}



 // socket.onopen = function() {
 //     console.log('open');
 // };
 // socket.onmessage = function(e) {
 //     console.log('message', e.data);
 // };
 // socket.onclose = function() {
 //     console.log('close');
 // };
 // 