async function fetchHumidity() {
    try {
        let response = await fetch('/data');
        let data = await response.json();
        
        if (data.humidity !== undefined) {
            document.getElementById('humidity').innerText = data.humidity + '%';
        } else {
            document.getElementById('humidity').innerText = "Donnée invalide";
        }
    } catch (error) {
        document.getElementById('humidity').innerText = "Erreur de connexion";
    }
}

setInterval(fetchHumidity, 2000);
fetchHumidity();
