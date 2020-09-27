saybutton = document.getElementById("say")
stopbutton = document.getElementById("stop")

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
reco.interimResults = false

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
}

const saystop = function(){
    reco.stop()
    alert(finalresult + "**")
    console.log("Final Result: " + finalresult)
    addToList(finalresult)
}

saybutton.onclick = saystart
stopbutton.onclick = saystop

function addToList(todotext){
    if(todotext!=undefined && todotext.trim()!="")
    {
        parent = document.getElementById("listcontainer")
        todo = document.createElement("li")
        todotext = document.createTextNode(todotext)
        todo.append(todotext)
        parent.append(todo)
        console.info("Todo added")
    }
}
