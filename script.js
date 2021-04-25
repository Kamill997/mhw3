function descr(event)
{
  const testo=event.currentTarget;
  
  const desc=testo.parentNode.querySelector(".descrizione");
  desc.classList.remove("hidden");
  testo.textContent="Nascondi Ingredienti";

  testo.removeEventListener("click",descr);
  testo.addEventListener("click",nodescr);
}


function nodescr(event)
{
  const testo=event.currentTarget;
 
  const desc=testo.parentNode.querySelector(".descrizione");
  desc.classList.add("hidden");
  testo.textContent="Mostra Ingredienti";

  testo.removeEventListener("click",nodescr);
  testo.addEventListener("click",descr);
}

let cont=0;

function Aggiungi(event)
{
  const aggiungipref=event.currentTarget.parentNode;

  const elem=document.querySelector("#pref");
  elem.classList.remove("hidden");

  const section=document.querySelector("#pref-elem");
  section.classList.add("dishes-grid");

  const h2=document.createElement("h2");
  h2.textContent=aggiungipref.querySelector("h2").textContent;

  const img=document.createElement("img");
  img.src=aggiungipref.querySelector("img").src;
  
  
  const bottone=aggiungipref.querySelector(".preferiti");
  bottone.innerHTML="Aggiunto ai preferiti";
  bottone.removeEventListener("click",Aggiungi);

  const bottone2=document.createElement("button");
  bottone2.innerHTML="Rimuovi dai preferiti";
  bottone2.addEventListener("click",Rimuovi);

  const pref=document.createElement("div");
  pref.classList.add("flex-item");

  pref.appendChild(h2);
  pref.appendChild(img);
  pref.appendChild(bottone2);
  section.appendChild(pref);

  cont++;
}

function Rimuovi(event)
{
  const article=document.getElementById("pref");

  const pref=event.currentTarget.parentNode.querySelector("h2").textContent;

  const rim=event.currentTarget.parentNode;


  const buttons=document.querySelectorAll(".preferiti");
  for(const button of buttons)
  {
    const gen=button.parentNode.querySelector("h2").textContent;

    if(gen===pref)
    {
      button.innerHTML="Aggiungi ai preferiti";
      button.addEventListener("click",Aggiungi);
    }
    
  }
  rim.remove();
  cont--;

  if(cont===0)
  {
    article.classList.add("hidden");
  }  
}

function CercaPiatti()
{
  const cerca=document.getElementById("barra").value;
  const piatti=document.querySelectorAll("#general .flex-item");

  for(let piatto of piatti)
  {
    if(piatto.querySelector("h2").textContent.toLowerCase().indexOf(cerca.toLowerCase())===-1)
    {
      piatto.classList.add("hidden");
    }
    
    else
    {
      piatto.classList.remove("hidden");
    }
  }
}

function onRecipeJson(json)
{
  const primi = document.querySelector('#antipasto');
  const secondi=document.querySelector('#primo-secondo');
  const dolci=document.querySelector('#dolce');

  primi.innerHTML = '';
  secondi.innerHTML= '';
  dolci.innerHTML='';

  const results = json.hits
  for(result of results)
  {
    const container = document.createElement("div");
    container.classList.add("flex-item");

    const title = document.createElement("h2");
    title.textContent = result.recipe.label;

    const immagine = document.createElement("img");
    immagine.src = result.recipe.image;

    const testo = document.createElement("span");
    testo.classList.add("mostra");
    testo.textContent = "Mostra Ingredienti";
    
    const descrizione=document.createElement("ol");
    descrizione.classList.add("hidden");
    descrizione.classList.add("descrizione");
    for(ris of result.recipe.ingredientLines)
    {
      const desc = document.createElement("li");
      desc.textContent = ris;
      descrizione.appendChild(desc);
    }
    const bottone = document.createElement("button");
    bottone.classList.add("preferiti");
    bottone.innerHTML = "Aggiungi ai preferiti";
   
    container.appendChild(title);
    container.appendChild(immagine);
    container.appendChild(testo);
    container.appendChild(descrizione);
    container.appendChild(bottone);
    testo.addEventListener("click",descr);
    bottone.addEventListener("click",Aggiungi);

  if(result.recipe.dishType == "starter" || result.recipe.dishType == "bread" || result.recipe.dishType == "salad")
  {
    primi.appendChild(container);
  }
  else if(result.recipe.dishType == "main course" || result.recipe.dishType == "omelet" || result.recipe.dishType == "sandwiches" || result.recipe.dishType == "soup")
  {
    secondi.appendChild(container);
  }
  else if(result.recipe.dishType == "desserts" || result.recipe.dishType == "pancake" || result.recipe.dishType == "biscuits and cookies")
  {
    dolci.appendChild(container);
  }

  }
}

function onJImgInte(json)
{
    const photo=document.querySelector("#Intestazione");
   
    const photores=json.image;
    console.log(photores);
    
    photo.style.backgroundImage='url('+photores+')';
}

function onResponse(response)
{
  console.log("ricevuto");
  return response.json();
}

function ricerca(event)
{
  event.preventDefault();
  const content = document.querySelector("#dish").value;
  console.log(content);

      const text = encodeURIComponent(content);
      const ricette = recipe_endpoint + "?q=" + text + "&app_id=" + app_id + "&app_key=" + key;
      fetch(ricette).then(onResponse).then(onRecipeJson);
  
}

function changeImg()
{
    imgchang=photo_api_endpoint;
    fetch(imgchang).then(onResponse).then(onJImgInte);
}

const photo_api_endpoint='https://foodish-api.herokuapp.com/api/'

const recipe_endpoint='https://api.edamam.com/search'
const key='39669bcae60bef89c7b526135bc2a819'
const app_id='3805f8bf'

const form = document.querySelector("#ricerca");
form.addEventListener("submit",ricerca);

window.onload=changeImg;