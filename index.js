saybutton = document.getElementById("say")
stopbutton = document.getElementById("stop")
mic = document.getElementById("mic")

listcontainer = document.getElementById("listcontainer")

function showError(error_msg){
    document.getElementById("error").innerText = error_msg
    console.error(error_msg)
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition == undefined)
{
    showError("SpeechRecognition not supported in your browser.")
}

const reco = new SpeechRecognition();
reco.continuous = true
reco.interimResults = true

reco.onstart = function(){
    console.log("reco started")
}

reco.onerror = function(){
    console.log("reco stopped")
}

let finalresult = "this is not";

reco.onresult = function(data){
    result = ""
    for(i=0;i<data.results.length;i++)
        result += data.results[i][0].transcript;
    finalresult = result
}


const saystart = function(){
    finalresult = ""
    reco.start()
    mic.classList.remove("mic-idle");
    mic.classList.add("mic-active");
    stopbutton.disabled = false
    saybutton.disabled = true
}

const saystop = function(){
    reco.stop()
    console.log("Final Result: " + finalresult)
    addToList(finalresult)
    mic.classList.remove("mic-active");
    mic.classList.add("mic-idle");
    stopbutton.disabled = true
    saybutton.disabled = false
}

saybutton.onclick = saystart
stopbutton.onclick = saystop

function addToList(todotext){
    if(todotext!=undefined && todotext.trim()!="")
    {
        parent = document.getElementById("listcontainer")
        todo = document.createElement("li")
        todotext = document.createTextNode(todotext)
        todo.innerHTML = '<i class="fa fa-chevron-right" style="margin-right:10px"></i>'
        todo.append(todotext)
        todo.innerHTML += '<i class="fa fa-trash deleteBtn" onclick="this.parentNode.remove()"></i>'
        todo.classList.add("todo")
        parent.prepend(todo)
        console.info("Todo added")   
    }
    else{
        alert("not recog.")
    }
}


