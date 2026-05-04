let map;
let lang="en";

const t={
en:{title:"Smart Voting Assistant",age:"Enter age",aadhaar:"Aadhaar",voter:"Voter ID",reg:"Registered",eligible:"Eligible",not:"Not eligible"},
te:{title:"ఓటింగ్ సహాయకుడు",age:"వయస్సు నమోదు చేయండి",aadhaar:"ఆధార్",voter:"ఓటర్ ఐడి",reg:"నమోదైంది",eligible:"అర్హుడు",not:"అర్హత లేదు"},
kn:{title:"ಮತ ಸಹಾಯಕ",age:"ವಯಸ್ಸು ನಮೂದಿಸಿ",aadhaar:"ಆಧಾರ್",voter:"ಮತದಾರ ಐಡಿ",reg:"ನೋಂದಾಯಿತ",eligible:"ಅರ್ಹ",not:"ಅರ್ಹತೆ ಇಲ್ಲ"},
ta:{title:"வாக்கு உதவி",age:"வயதை உள்ளிடவும்",aadhaar:"ஆதார்",voter:"வாக்காளர் அட்டை",reg:"பதிவு",eligible:"தகுதி",not:"தகுதி இல்லை"},
ml:{title:"വോട്ടിംഗ് സഹായം",age:"വയസ്സ് നൽകുക",aadhaar:"ആധാർ",voter:"വോട്ടർ ഐഡി",reg:"രജിസ്റ്റർ",eligible:"യോഗ്യം",not:"യോഗ്യമല്ല"},
hi:{title:"मतदान सहायक",age:"अपनी उम्र दर्ज करें",aadhaar:"आधार",voter:"वोटर आईडी",reg:"पंजीकृत",eligible:"योग्य",not:"योग्य नहीं"}
};

function changeLang(l){
lang=l;
title.innerText=t[l].title;
age.placeholder=t[l].age;
aadhaarText.innerText=t[l].aadhaar;
voterText.innerText=t[l].voter;
regText.innerText=t[l].reg;
}

function check(){
let s=0;
if(age.value>=18)s++;
if(a.checked)s++;
if(v.checked)s++;
if(r.checked)s++;

score.innerText="Score "+s+"/4";
fill.style.width=(s/4*100)+"%";

result.innerText = s==4 ? "✅ "+t[lang].eligible : "❌ "+t[lang].not;
}

function dark(){
document.body.classList.toggle("dark");
}

function voice(){
if(!('webkitSpeechRecognition'in window))return;
let r=new webkitSpeechRecognition();
r.onresult=e=>{
let n=e.results[0][0].transcript.match(/\d+/);
if(n)age.value=n[0];
};
r.start();
}

function getLocation(){
navigator.geolocation.getCurrentPosition(pos=>{
let lat=pos.coords.latitude;
let lon=pos.coords.longitude;

if(!map){
map=L.map('map').setView([lat,lon],13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
}
L.marker([lat,lon]).addTo(map).bindPopup("You are here").openPopup();
});
}

function send(){
let m=msg.value;
chat.innerHTML+="<div>👤 "+m+"</div>";

fetch(`/api/chat?message=${encodeURIComponent(m)}`)
.then(r=>r.json())
.then(d=>{
chat.innerHTML+="<div>🤖 "+d.reply+"</div>";
});
}
