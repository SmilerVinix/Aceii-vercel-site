const fetch = global.fetch || require("node-fetch");

const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const LENGTH=5;
const SPEED=3;

function gen(){
  let s="";
  for(let i=0;i<LENGTH;i++){
    s+=chars[Math.floor(Math.random()*chars.length)];
  }
  return s;
}

async function scan(){
  const name=gen();

  const r=await fetch("https://users.roblox.com/v1/usernames/validate",{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({
      username:name,
      birthday:"2000-01-01",
      context:"Signup"
    })
  });

  const d=await r.json();

  if(d.code===0){
    console.log("AVAILABLE:",name);
  }else{
    console.log("TAKEN:",name);
  }
}

setInterval(scan,1000/SPEED);
