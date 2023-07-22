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
    const apiKey = "A174SBG81UYCT7JK2CDJUFMU5CPB3V2512";
    const url = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${apiKey}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.status === "1" && data.message === "OK") {
          const proposedGasPrice = data.result.ProposeGasPrice;
          const gasInWei = proposedGasPrice * 1888 * 151000 / 1000000000;
          gasFeeDisplay.textContent = `
            Gas Price: ${proposedGasPrice} Wei
            and Max Estimated Gas Fee: ${gasInWei.toFixed(2)} $
          `;
        } else {
          gasFeeDisplay.textContent = "Erreur lors de la récupération des frais de gaz en Wei.";
        }
      })
      .catch(error => {
        gasFeeDisplay.textContent = "Erreur lors de la requête : " + error.message;
      });
  }

// Initialiser Web3.js avec WalletConnectProvider
const provider = new WalletConnectProvider({
  infuraId: 'b374158ffb53410c8f11515d15ca7aae',
});

let web3;
if (provider.wc.connected) {
  web3 = new Web3(provider);
} else {
  console.log('Veuillez connecter votre portefeuille via WalletConnect.');
}

// Attacher un gestionnaire d'événements au bouton "Connecter avec WalletConnect"
const walletConnectButton = document.getElementById('wallet-connect-button');
walletConnectButton.addEventListener('click', function() {
    requestAccount();
});

// Fonction pour demander la permission à l'utilisateur pour accéder à son compte Ethereum via WalletConnect
async function requestAccount() {
  try {
    await provider.enable();
    web3 = new Web3(provider);
    console.log('Compte Ethereum connecté avec succès via WalletConnect.');
  } catch (error) {
    console.error('Erreur lors de la connexion au compte Ethereum via WalletConnect :', error);
    alert('Erreur lors de la connexion au compte Ethereum via WalletConnect.');
  }
}

  // Appeler la fonction calculateExchange pour initialiser la valeur de quantiteto
  calculateExchange();

  // Appeler la fonction displayGasFees pour afficher les frais de gaz actualisés
  displayGasFees();

  // Rafraîchir les frais de gaz toutes les 10 secondes (ou à la fréquence souhaitée)
  setInterval(displayGasFees, 10000); // 10000 ms = 10 secondes
});
