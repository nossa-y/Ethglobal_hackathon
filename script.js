document.addEventListener('DOMContentLoaded', function (){

  // Récupérer les éléments du DOM
  const quantityFromInput = document.getElementById('quantity-from');
  const cryptoFromSelect = document.getElementById('crypto-from');
  const quantityToInput = document.getElementById('quantity-to');
  const cryptoToSelect = document.getElementById('crypto-to');
  const swapButton = document.getElementById('swap-button');
  const swapIcon = document.querySelector('.swap-icon');
  const settingsButton = document.getElementById('settings-button');
  const settingsPanel = document.getElementById('settings-panel');


  // Taux de conversion statiques (à remplacer par les taux en temps réel)
  const conversionRates = {
    btc: {
      eth: 12.34,
      ltc: 23.45,
      xrp: 34.56,
      btc: 1,
    },
    eth: {
      btc: 0.081,
      ltc: 2.4,
      xrp: 3.5,
      eth: 1,
    },
    ltc: {
      btc: 0.043,
      eth: 0.42,
      xrp: 1.3,
      ltc: 1,
    },
    xrp: {
      btc: 0.027,
      eth: 0.29,
      ltc: 0.76,
      xpr: 1,
    },
  };

  if (!isNaN(quantityFrom)) {
    const exchangeRate = conversionRates[selectedCryptoFrom][selectedCryptoTo];
    if (exchangeRate) {
      const quantityTo = quantityFrom * exchangeRate;
      quantityToInput.value = quantityTo.toFixed(2); // Affiche deux décimales
      console.log(quantityToInput.value);
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
      } else {
        quantityToInput.value = 'Taux de conversion introuvable';
      }
    } else {
      quantityToInput.value = '';
    }
  }


// Gérer l'événement de clic sur le bouton "Échanger"
swapButton.addEventListener('click', calculateExchange);
  // Gérer l'événement de clic sur le bouton "Paramètres"
  settingsButton.addEventListener('click', function() {
    // Afficher ou masquer le panneau de réglages en fonction de son état actuel
    if (settingsPanel.style.display === 'none') {
      settingsPanel.style.display = 'block';
    } else {
      settingsPanel.style.display = 'none';
    }
  });

  // Gérer l'événement de clic sur le bouton "Échanger"
  swapButton.addEventListener('click', calculateExchange);

  // Gérer l'événement de changement de sélection de cryptomonnaie
  cryptoFromSelect.addEventListener('change', calculateExchange);
  cryptoToSelect.addEventListener('change', calculateExchange);

  // Gérer l'événement d'entrée de quantité de la cryptomonnaie de départ
  quantityFromInput.addEventListener('input', calculateExchange);

  // Gérer l'événement de clic sur la flèche pour échanger les valeurs
  swapIcon.addEventListener('click', function() {
    const temp = cryptoFromSelect.value;
    cryptoFromSelect.value = cryptoToSelect.value;
    cryptoToSelect.value = temp;
    calculateExchange();
  });

  // Appeler la fonction calculateExchange pour initialiser la valeur de quantiteto
  calculateExchange();

});
