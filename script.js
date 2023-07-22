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
  const gasFeeDisplay = document.getElementById('gas-fee-display'); 

  // Fonction de calcul de l'échange
  function calculateExchange() {
    const quantityFrom = parseFloat(quantityFromInput.value);
    const selectedCryptoFrom = cryptoFromSelect.value;
    const selectedCryptoTo = cryptoToSelect.value;

    if (!isNaN(quantityFrom)) {
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${selectedCryptoFrom}&vs_currencies=${selectedCryptoTo}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          const exchangeRate = data[selectedCryptoFrom][selectedCryptoTo];
          const quantityTo = quantityFrom * exchangeRate;
          quantityToInput.value = quantityTo.toFixed(2); // Affiche deux décimales
        })
        .catch(error => {
          quantityToInput.value = 'Taux de conversion introuvable';
        });
    } else {
      quantityToInput.value = '';
    }
  }

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

  function displayGasFees() {
    const apiKey = "A174SBG81UYCT7JK2CDJUFMU5CPB3V2512"; // Remplacez par votre clé d'API Etherscan
    const url = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${apiKey}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.status === "1" && data.message === "OK") {
          const proposedGasPrice = data.result.ProposeGasPrice;
          gasFeeDisplay.textContent = `
            Gas Price: ${proposedGasPrice} Wei
          `;
        } else {
          gasFeeDisplay.textContent = "Erreur lors de la récupération des frais de gaz en Wei.";
        }
      })
      .catch(error => {
        gasFeeDisplay.textContent = "Erreur lors de la requête : " + error.message;
      });
  }

  // Appeler la fonction calculateExchange pour initialiser la valeur de quantiteto
  calculateExchange();

  // Appeler la fonction displayGasFees pour afficher les frais de gaz actualisés
  displayGasFees();

  // Rafraîchir les frais de gaz toutes les 10 secondes (ou à la fréquence souhaitée)
  setInterval(displayGasFees, 10000); // 10000 ms = 10 secondes
});
