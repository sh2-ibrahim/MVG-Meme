async function updateTokenInfo() {
    try {
      // Replace with your actual token address
      const tokenAddress = "qRUZaCpgxaRH1s5V6opjPA6Hnpv5BM37LqkDBw7pump";
      const response = await fetch(
        `https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`,
      );
      const data = await response.json();
  
      if (data.pairs && data.pairs[0]) {
        const pair = data.pairs[0];
  
        document.getElementById("token-price").textContent =
          `$${parseFloat(pair.priceUsd).toFixed(8)}`;
        document.getElementById("market-cap").textContent =
          `$${formatNumber(pair.fdv)}`;
        document.getElementById("volume").textContent =
          `$${formatNumber(pair.volume.h24)}`;
        document.getElementById("liquidity").textContent =
          `$${formatNumber(pair.liquidity.usd)}`;
  
        const priceChange = parseFloat(pair.priceChange.h24);
        const priceChangeElement = document.getElementById("price-change");
        priceChangeElement.textContent = `${priceChange.toFixed(2)}%`;
        priceChangeElement.className =
          priceChange >= 0
            ? "font-bold text-green-400"
            : "font-bold text-red-400";
      }
    } catch (error) {
      console.error("Error fetching token info:", error);
    }
  }
  function formatNumber(num) {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(2)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(2)}K`;
    }
    return num.toFixed(2);
  }
  document.addEventListener("DOMContentLoaded", function () {
    updateTokenInfo();
    // Update every 30 seconds
    setInterval(updateTokenInfo, 30000);
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
});

// Copy to clipboard function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        alert('Contract address copied to clipboard!');
    }, function(err) {
        console.error('Could not copy text: ', err);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});