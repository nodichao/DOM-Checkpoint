var panier = [];
var indexToRemove = -1;
var indexToIncrease = -1;
var indexToDecrease = -1;

class Article {
    constructor(idArticle, nomArticle, descArticle, prixArticle){
         this.idArticle = idArticle;
         this.nomArticle = nomArticle;
         this.descArticle = descArticle;
         this.prixArticle = prixArticle;
         this.quantiteArticle = 1;
    }
}

facture();

function add(event){
      let myElement = event.target.parentNode.parentNode.parentNode.parentNode;
      let newArticle = new Article(myElement.getAttribute("id"),
      myElement.querySelector(".card-title").innerText,myElement.querySelector(".card-text").innerText,
      parseInt(myElement.querySelector(".prix").innerText));

      panier.push(newArticle);
      myElement.querySelector('.btn-success').disabled = true;
      afficher(newArticle);
      
}


//fonction qui permet d'afficher la liste des articles avec les boutons specifiques pour chacun d'eux
function afficher(myArticle){
    
    
//Ajout de l'objet Article nouvellement créé dans la liste des articles spécifiés sur la page
    var maListe= document.getElementById("listeProduits");
    var nouvelAjout = document.createElement("li");
    var nomArticle = document.createElement("span");
    nomArticle.appendChild(document.createTextNode(myArticle.nomArticle));

    //Creation des differents boutons d'interractions pour manipuler les articles
    var boutonPlus = document.createElement("button");
        boutonPlus.innerHTML = "+";
        boutonPlus.setAttribute("onclick","increase(event)");
    
    var boutonMoins = document.createElement("button");
        boutonMoins.innerHTML = "-";
        boutonMoins.setAttribute("onclick","decrease(event)");
        boutonMoins.disabled =true;
    
    var quantiteAffichee = (document.createElement("span"));
        quantiteAffichee.setAttribute("class","quantiteAffichee");
        quantiteAffichee.innerText = "1";

    var idAjout = (document.createElement("span"));
         idAjout.innerText = myArticle.idArticle;
    
    var boutonSupprimer = document.createElement("span");
        boutonSupprimer.innerHTML = "<i class=\"fa-solid fa-xmark\" title='supprimer du panier' onclick=\"remove(event)\"></i>";
    
    
    nouvelAjout.appendChild(nomArticle);
    nouvelAjout.appendChild(boutonMoins);
    nouvelAjout.appendChild(quantiteAffichee);
    nouvelAjout.appendChild(boutonPlus);
    nouvelAjout.appendChild(idAjout);
    nouvelAjout.appendChild(boutonSupprimer);
    maListe.appendChild(nouvelAjout);
 
    
    
    nomArticle.style.borderBottom ="1px solid black";
    nomArticle.style.display = "inline-block";
    nomArticle.style.width = "60%";

    boutonSupprimer.style.display = "inline-block";
    boutonSupprimer.style.color = "red";
    boutonSupprimer.style.marginLeft = "25px";
    boutonSupprimer.style.fontSize = "24px";
    boutonSupprimer.style.fontWeight ="bold";
    boutonSupprimer.style.cursor = "pointer";

    
    idAjout.style.display ="none";
    idAjout.setAttribute("class","invisible");

    facture();
    
    
   
}

//Fontion qui permet de supprimer un article
function remove(event){
    var elementToRemove = event.target.parentNode.parentNode;
    var idToRemove = elementToRemove.querySelector(".invisible").innerText;
    
    for(let article of panier){
        if(idToRemove === article.idArticle){
            indexToRemove = panier.indexOf(article);
        }else{
            continue;
        }
    }
    document.getElementById("listeProduits").removeChild(elementToRemove);
    document.getElementById(panier[indexToRemove].idArticle).querySelector(".btn-success").disabled=false;
    panier.splice(indexToRemove,1);
    indexToRemove = -1;

    facture();
}


//fonction qui permet d'augmenter la quantite d'un article ajouté
function increase(event){
    var elementToIncrease =  event.target.parentNode;
    var idToIncrease = elementToIncrease.querySelector(".invisible").innerText;
     
    for(let article of panier){
        if(idToIncrease === article.idArticle){
            indexToIncrease = panier.indexOf(article);
            break;
        }else{
            continue;
        }
    }
    panier[indexToIncrease].quantiteArticle++;
    elementToIncrease.querySelector(".quantiteAffichee").innerText = panier[indexToIncrease].quantiteArticle.toString();
    elementToIncrease.querySelector('button').disabled = false;
    indexToIncrease = -1;
     
    facture();
}

//fonction qui permet d'augmenter la quantite d'un article ajouté
function decrease(event){
    var elementToDecrease = event.target.parentNode;
    
    var idToDecrease = elementToDecrease.querySelector(".invisible").innerText;

    for(let article of panier){
        if(idToDecrease === article.idArticle){
            indexToDecrease = panier.indexOf(article);
            break;
            
        }else{
            continue;
        }
    }
    panier[indexToDecrease].quantiteArticle--;
    elementToDecrease.querySelector(".quantiteAffichee").innerText = panier[indexToDecrease].quantiteArticle.toString();
    if(panier[indexToDecrease].quantiteArticle === 1)
        elementToDecrease.querySelector('button').disabled = true;
   indexToDecrease = -1;

   facture();
}

//Fonction qui permet de liker un article
function like(event){
    var elemToLike = event.target;
      if(elemToLike.getAttribute("class") === "fa-regular fa-heart"){
        elemToLike.setAttribute("class","fa-solid fa-heart");
        elemToLike.style.color = "red";
      }else{
            elemToLike.setAttribute("class","fa-regular fa-heart");
            elemToLike.style.color = "rgb(30,48,80)";
      }
}

//Fonction qui crée la facture
function facture(){
    var total = 0;
    for(let article of panier){
       total += article.prixArticle*article.quantiteArticle;
    }

    document.getElementById('netAPayer').innerText = total+" FCFA";
}






