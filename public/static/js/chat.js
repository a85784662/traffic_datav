
function create_chart(self,content) {
        if (self == "w"){
            self = "right";
            var spantag = document.createElement("span");
            spantag.innerText= content.send_msg;
            var spantag1 = document.createElement("span");
            spantag1.innerText=':我';
            name = document.getElementById("username").value
        }else{
            self = "left";
            var spantag = document.createElement("span");
            spantag.innerText=content.send_user+':';
            var spantag1 = document.createElement("span");
            spantag1.innerText=content.send_msg;
            name = content.send_user
        }
        if (content.send_msg[0] == "#") {
          command = content.send_msg.split(' ')
          if (command[1] == "setColor") {
            document.getElementById('body').style.backgroundColor = command[2]
          } else if (command[1] == "appendTank") {
            gameconteoller.appendTank(name, command[2], command[3])
          } else if (command[1] == "moveTank") {
            gameconteoller.tankDict[name].move(command[2], command[3])
            console.log(command[2]);
            console.log(command[3]);
          }

        }

        var divtag = document.createElement("div");
        divtag.style="text-align:"+self;
        divtag.appendChild(spantag);
        divtag.appendChild(spantag1);
        var char_window = document.getElementById('chat_window');
        char_window.appendChild(divtag);

    }
    document.getElementById("btn_send").addEventListener("click", sendMessage)

    document.onkeydown = function(e){
      if(e.keyCode == 13){
      	sendMessage()
      } else if (e.keyCode == 87) {
        document.getElementById("send_msg").value = "# moveTank 0 -1"
        sendMessage()
      } else if (e.keyCode == 65) {
        document.getElementById("send_msg").value = "# moveTank -1 0"
        sendMessage()
      } else if (e.keyCode == 83) {
        document.getElementById("send_msg").value = "# moveTank 0 1"
        sendMessage()
      } else if (e.keyCode == 68) {
        document.getElementById("send_msg").value = "# moveTank 1 0"
        sendMessage()
      }
    }
// # appendTank 100 200
    function sendMessage() {
      var send_msg=document.getElementById("send_msg");
      if (send_msg.value == "") {
        return
      }
      ws.send(send_msg.value);
      var s_msg = {send_msg:send_msg.value};
      create_chart('w',s_msg);
      send_msg.value='';

      var chatwindow = document.getElementById('chat_window')
      chatwindow.scrollTop = chatwindow.scrollHeight
      document.getElementById("send_msg").focus()
    }
