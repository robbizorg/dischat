$( document ).ready(function() {
   var socket = io();
   $('form').submit(function(){
       socket.emit('chat message', $('#m').val(), $('#u').val());
       $('#m').val('');
       return false;
   });
   socket.on('chat message', function(msg, user) {
   	$('#messages').append($('<li>').text(user + ': ' + msg));
   })
});