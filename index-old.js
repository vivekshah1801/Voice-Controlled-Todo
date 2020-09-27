


const saybutton = document.getElementById("say");

const SpeechReco = window.SpeechRecognition || window.webkitSpeechRecognition;
const reco = new SpeechReco();
reco.continuous = true;
reco.interimResults = true;



reco.onresult = (data)=>{
    if (data.results.length > 0)
    {
        let result = ""
        for(i=0;i<data.results.length;i++)
        {
            let text = data.results[i][0].transcript;
            let confidance = data.results[i][0].confidence;
            if (confidance>0.7){
                result += text;
            }
        }
        console.log(result)
    }
    else{
        alert("Not Enought data");
    }    
}

saybutton.onclick = function(){
    let state = saybutton.dataset.listening;
    if (state=='False'){
        saybutton.style.backgroundColor = 'green';
        saybutton.dataset.listening = 'True';
        reco.start();
    }
    else
    {
        saybutton.style.backgroundColor = 'white';
        saybutton.dataset.listening = 'False';
        reco.stop();
    }

}


reco.onresult = function(event) { 
    for (var i = event.resultIndex; i < event.results.length; ++i) {
        final_transcript += event.results[i][0].transcript;
    }
    console.log("hi")
    console.log(final_transcript)
};