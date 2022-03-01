//search phone function is defined
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    // console.log(searchText);
    if (searchText == '') {
        document.getElementById('error-message1').style.display = 'block';
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(searchResult => displayPhone(searchResult.data))
        document.getElementById('error-message1').style.display = 'none';
    }
}

//display 20 phones function is defined
const displayPhone = (phones) => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    // console.log(phones);
    const first20Phones = phones.slice(0, 20);
    // console.log(first20Phones);
    if (phones.length === 0) {
        document.getElementById('error-message2').style.display = 'block';
    }
    else {
        first20Phones.forEach(phone => {
            console.log(phone);
            document.getElementById('error-message2').style.display = 'none';
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100">
                <img src="${phone.image}" class="card-img-top w-75" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.brand}</h5>
                    <p class="card-text">${phone.phone_name}</p>
                    <button onclick="phoneDetails('phone.slug')" class="btn btn-primary">See Details</button>
                </div>
            </div>
            `;
            searchResult.appendChild(div);
        })

    }
}
//display all phones function is defined
// const searchPhoneAll = (phones) => {
// }