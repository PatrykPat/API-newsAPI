// Selecteer de elementen uit de HTML door hun klassen
let result = document.querySelector('.result');
let result2 = document.querySelector('.result2');
let zoek = document.querySelector('.input_text');
let button = document.querySelector('.submit');
let button2 = document.querySelector('.submit2');
let key = 'dd252344d06f42eeb6450e24d70079da' //als deze key niet werkt kun u uw eigen key hier plakken. een key kunt u opvragen via https://newsapi.org/register

// Voeg een array toe met landcodes voor het dropdown-menu
const landNaam = ["nl", "be", "fr", "de", "gb"];
for(i=0 ; i<landNaam.length ; i++){
  let opt = document.createElement('option');
  opt.innerText = landNaam[i];
  land.appendChild(opt); // land is niet gedefinieerd in de code, vermoedelijk moet dit nog toegevoegd worden
}

// Haal de huidige datum op en zet deze om in een timestamp
const currentDate = new Date();
const timestamp = currentDate.getTime();

// Voeg een klikgebeurtenisluisteraar toe aan de eerste knop
button.addEventListener('click', function(name){
    // haalt de vorige info weg
    result.innerHTML = '';
    let value = land.value;
    // Bouw de URL op voor het ophalen van topnieuws op basis van het geselecteerde land en de API-sleutel
    let url = 'https://newsapi.org/v2/top-headlines?' +
          'country='+value+'&apiKey='+key;
          console.log(url);
    let req = new Request(url);
    // Haal gegevens op via fetch
    fetch(req)
    .then(response => response.json())
    .then(data => 
      {
        // Itereer over de eerste 5 artikelen en voeg ze toe aan de resultatenlijst
        for(i=0 ; i<5 ; i++){
          let title = data['articles'][i]['title']
          var a = document.createElement('a');
          var linkText = document.createTextNode(title);
          a.appendChild(linkText);
          a.title = title;
          var result = document.getElementById('result');
          result.appendChild(a);
          result.appendChild(document.createElement('br'));
        }
    })
})

// Voeg een klikgebeurtenisluisteraar toe aan de tweede knop
button2.addEventListener('click', function(name){
  // haalt de vorige info weg
  result2.innerHTML = '';

  let value = land.value;
  let url = 'https://newsapi.org/v2/everything?q='+zoek.value+'&from='+start+'&to='+eind+'&sortBy=popularity&apiKey='+key;
  let req = new Request(url);
  // Haal gegevens op via fetch
  fetch(req)
  .then(response => response.json())
  .then(data => {
      // Itereer over de eerste 10 artikelen en voeg ze toe aan de resultatenlijst
      for(i=0 ; i<10 ; i++){
          let title = data['articles'][i]['title']
          let link = data['articles'][i]['url']
          console.log(link)  
          var a = document.createElement('a');
          var linkText = document.createTextNode(title);
          a.appendChild(linkText);
          a.title = title;
          a.href = link;
          result2.appendChild(a);
          result2.appendChild(document.createElement('br'));
      }
  })
})