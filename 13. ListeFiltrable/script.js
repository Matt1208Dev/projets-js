const results = document.querySelector('.results');

async function getRandomUserAPIData() {
    try {

        const results = await fetch('https://randomuser.me/api/?nat=fr&results=50');

        if (!results.ok) {
            throw new Error(`Erreur: ${results.status}`);
        }

        const data = await results.json();

        console.log(data.results);
        showResults(data.results);

    } catch (error) {
        console.log(error);
    }
}
getRandomUserAPIData();

function showResults(data) {
    const table = document.querySelector('tbody');
    for (const user of data) {
        const row = document.createElement('tr');
        row.innerHTML = `
                <td>
                    <div class="user-identity">
                    <img class="profile-pic" src="${user.picture.thumbnail}" alt="photo de profil">
                    <p>${user.name.last} ${user.name.first}</p>
                    </div>
                </td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
        `;
        table.appendChild(row);


        // const card = document.createElement('div');
        // card.classList.add('user-card');
        // card.innerHTML =
        //     `<div class="user-identity">
        //     <img class="profile-pic" src="${user.picture.thumbnail}" alt="photo de profil">
        //     <p>${user.name.last} ${user.name.first}</p>
        // </div>
        // <p class="user-mail">${user.email}</p>
        // <p class="user-phone">${user.phone}</p>`;

        // results.appendChild(card);
    }
}