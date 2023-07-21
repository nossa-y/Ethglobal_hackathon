document.addEventListener('DOMContentLoaded', function (){

// Récupérer les éléments du DOM
const quantityFromInput = document.getElementById('quantity-from');
const cryptoFromSelect = document.getElementById('crypto-from');
const quantityToInput = document.getElementById('quantity-to');
const cryptoToSelect = document.getElementById('crypto-to');
const swapButton = document.getElementById('swap-button');

// Taux de conversion statiques (à remplacer par les taux en temps réel)
const conversionRates = {
  btc: {
    eth: 12.34,
    ltc: 23.45,
    xrp: 34.56,
  },
  eth: {
    btc: 0.081,
    ltc: 2.4,
    xrp: 3.5,
  },
  ltc: {
    btc: 0.043,
    eth: 0.42,
    xrp: 1.3,
  },
  xrp: {
    btc: 0.027,
    eth: 0.29,
    ltc: 0.76,
  },
};

// Fonction de calcul de l'échange
function calculateExchange() {
  const quantityFrom = parseFloat(quantityFromInput.value);
  const selectedCryptoFrom = cryptoFromSelect.value;
  const selectedCryptoTo = cryptoToSelect.value;

  if (!isNaN(quantityFrom)) {
    const exchangeRate = conversionRates[selectedCryptoFrom][selectedCryptoTo];
    if (exchangeRate) {
      const quantityTo = quantityFrom * exchangeRate;
      quantityToInput.value = quantityTo.toFixed(2); // Affiche deux décimales
      console.log(quantityToInput.value);
    } else {
      quantityToInput.value = 'Taux de conversion introuvable';
    }
  } else {
    quantityToInput.value = '';
  }
}


// Gérer l'événement de clic sur le bouton "Échanger"
swapButton.addEventListener('click', calculateExchange);

// Gérer l'événement de changement de sélection de cryptomonnaie
cryptoFromSelect.addEventListener('change', calculateExchange);
cryptoToSelect.addEventListener('change', calculateExchange);
// Gérer l'événement d'entrée de quantité de la cryptomonnaie de départ
quantityFromInput.addEventListener('input', calculateExchange);
// Appeler la fonction calculateExchange pour initialiser la valeur de quantiteto
calculateExchange();
});
