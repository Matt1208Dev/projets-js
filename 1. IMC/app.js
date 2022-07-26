const BMIData = [
  { name: "Maigreur", color: "midnightblue", range: [0, 18.5] },
  { name: "Bonne santé", color: "green", range: [18.5, 25] },
  { name: "Surpoids", color: "lightcoral", range: [25, 30] },
  { name: "Obésité modérée", color: "orange", range: [30, 35] },
  { name: "Obésité sévère", color: "crimson", range: [35, 40] },
  { name: "Obésité morbide", color: "purple", range: 40 },
];

const height = document.querySelector('#height');
const weight = document.querySelector('#weight');
const submit = document.querySelector('button');
const result = document.querySelector('.result-title');
const message = document.querySelector('.result-text');

submit.addEventListener('click', function(e) {
  e.preventDefault();
  
  // Valider la saisie
  if ((height.value === "" || weight.value === "") || (height.value <= 0 || weight.value <= 0)) {
    result.innerHTML = "Oups !";
    message.innerHTML = "Remplissez correctement les champs";
  } else {
    
    // Calculer l'IMC
    // IMC = poids en kg / taille² en m
    IMC = Math.round((weight.value / ((height.value / 100) * (height.value / 100 ))) * 10) / 10;

    // Déterminer le rang à partir de BMIData et afficher le résultat à l'utilisateur.
    for (rank of BMIData) {
      if ((IMC >= rank.range[0] && IMC <= rank.range[1]) || IMC > rank.range) {
        
        result.style.color = rank.color;
        result.innerHTML = IMC;
        message.innerHTML = `Résultat : ${rank.name}`;
      }
    }
  }


});