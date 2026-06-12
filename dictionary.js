const apiUrl="https://api.dictionaryapi.dev/api/v2/entries/en/";
const input=document.querySelector(".search-bar input");
const searchBtn=document.querySelector(".search-bar button");
const audioBtn=document.querySelector("#audio");
const clearBtn=document.querySelector(".clear");
let content=document.querySelector(".content");
let currentAudio;
let audioUrl;


async function fetchWord(input){
  let repsonse= await fetch(apiUrl+ `${input.value}`);
  let data = await repsonse.json();
  
  console.log(data);


if(data.title === "No Definitions Found"){
  content.style.display="block";
  document.querySelector(".error").innerHTML="WORD NOT FOUND";
  document.querySelector(".word").innerHTML = "";
  document.querySelector(".speech").innerHTML = "";
  document.querySelector(".definition").innerHTML = "";
  document.querySelector(".example").innerHTML = "";
  audioBtn.style.display="none";
  return;
}else{
  content.style.display="block";
document.querySelector(".word").innerHTML= `Word: ${data[0].word}`;

localStorage.setItem("lastword",data[0].word);

document.querySelector(".speech").innerHTML= `Parts of Speech: ${data[0].meanings[0].partOfSpeech}`;
document.querySelector(".definition").innerHTML= `Definition: ${data[0].meanings[0].definitions[0].definition}`;
document.querySelector(".example").innerHTML=` Example: ${data[0].meanings[0].definitions[0].example}`;

    
    // audio.innerHTML= `Pronunciation: ${data[0].phonetics[0].audio}`;
     audioUrl = data[0].phonetics[0].audio;
     
    if (!audioUrl){
      audioBtn.style.display="none";
      
    }else{
       audioBtn.style.display="block";

    }
  }

}
//key:enter search
input.addEventListener("keydown",(e)=>{
  if(e.key==="Enter"){
fetchWord(input);
  }
});

// call function 
searchBtn.addEventListener("click", ()=>{
  fetchWord(input);
});
// audio
   audioBtn.addEventListener("click",()=>{
    

    if (currentAudio){
      currentAudio.pause();
      currentAudio.currentTime=0;
    }
    if(audioUrl){

    
     currentAudio=new Audio(audioUrl);
     currentAudio.play(); }
    });

const getLastItem=localStorage.getItem("lastword");

if(getLastItem){
  input.value=getLastItem;
  fetchWord(input);
}

clearBtn.addEventListener("click",()=>{
  localStorage.removeItem("lastword");
  input.value="";
 content.style.display="none";
})





