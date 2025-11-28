// Hämta formuläret och meddelande-elementet
const form = document.getElementById("nyhetsbrev-form");
const meddelande = document.getElementById("form-meddelande");

// Lyssna på formuläret
form.addEventListener("submit", function (event) {
    event.preventDefault();
});

    // Hämta värden
    {
    const förnamn = document.getElementById("förnamn").value.trim();
    const efternamn = document.getElementById("efternamn").value.trim();
    const email = document.getElementById("email").value.trim();
    const ålder = document.getElementById("ålder").value.trim();
    }

    // Kolla om tomt
    if (!förnamn || !efternamn || !email || !ålder) {
        meddelande.textContent = "Fyll i alla fält tack.";
        meddelande.style.color = "red";
        return;
    }

    // Kolla ålder
    const ageNum = Number(ålder);
    if (isNaN(ageNum) || ageNum <= 0 || ageNum > 120) {
        meddelande.textContent = "Skriv en giltig ålder.";
        meddelande.style.color = "red";
        return;
    }

    // Skapa objekt
    const data = {
        förnamn: förnamn,
        efternamn: efternamn,
        email: email,
        ålder: ageNum
    };

    // Skicka data
    fetch("https://http-echo-server.azurewebsites.net", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then((response) => {
        meddelande.textContent = "Tack! Din anmälan är skickad.";
        meddelande.style.color = "green";
        form.reset();
    })
    .catch(() => {
        meddelande.textContent = "Något gick fel. Försök igen senare.";
        meddelande.style.color = "red";
    });
    //List med djur
    const animals = [
        { namn: "Roksi", art: "Hund", ålder: 5, ursprungsland: "Sverige" },
        { namn: "Misse", art: "Katt", ålder: 3, ursprungsland: "Norge" },
        { namn: "Bobby", art: "Hund", ålder: 2, ursprungsland: "Danmark" },
        { namn: "Luna", art: "Katt", ålder: 4, ursprungsland: "Finland" }
    ];
    function
    renderAnimals(animalList) {
        const tbody = document.getElementById("animals-body");
        tbody.innerHTML = "";
        animalList.forEach(animal => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${animal.namn}</td>
                <td>${animal.art}</td>
                <td>${animal.ålder}</td>
                <td>${animal.ursprungsland}</td>
            `;
            tbody.appendChild(row);
        });
    }
    // Initial rendering
    renderAnimals(animals);
    // Sortera efter ålder
    document.getElementById("sort-age").addEventListener("click", () => {
        const sortedAnimals = [...animals].sort((a, b) => a.ålder - b.ålder);
        renderAnimals(sortedAnimals);
    });
    // Filtrera efter hundar
    document.getElementById("filter-dog").addEventListener("click", () => {
        const filteredAnimals = animals.filter(animal => animal.art === "Hund");
        renderAnimals(filteredAnimals);
    });
