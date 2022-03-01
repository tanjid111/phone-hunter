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
            // console.log(phone);
            document.getElementById('error-message2').style.display = 'none';
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100">
                <img src="${phone.image}" class="card-img-top w-75" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.brand}</h5>
                    <h5 class="card-text">${phone.phone_name}</h5>
                    <button onclick="phoneDetails('${phone.slug}')" class="btn btn-primary">See Details</button>
                </div>
            </div>
            `;
            searchResult.appendChild(div);
        })
    }
}

phoneDetails = (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
        .then(res => res.json())
        .then(phoneData => displayPhoneDetail(phoneData.data))
}

const displayPhoneDetail = (phoneInfo) => {
    console.log(phoneInfo);
    const phoneDetail = document.getElementById('phone-detail');
    phoneDetail.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    // div.classList.add('text-center');

    div.innerHTML = `
    <img src="${phoneInfo.image}" class="card-img-top pt-2 w-25 mx-auto" alt="...">
            <div class="card-body">
                    <h5 class="card-title">${phoneInfo.brand}</h5>
                    <h5 class="card-title">${phoneInfo.name}</h5>
                    <p>Released date: noReleaseDate(${phoneInfo.releaseDate})</p>
                    <p id="error-message3" class="text-danger">No release date found</p>
                <div class="row row-cols-md-2">
                    <div class="col">
                        <h5 class="card-title">Features:</h5>
                        <div>
                            <ul class="list-group">
                                <li class="list-group-item">${phoneInfo.mainFeatures.chipSet}</li>
                                <li class="list-group-item">${phoneInfo.mainFeatures.displaySize}</li>
                                <li class="list-group-item">${phoneInfo.mainFeatures.memory}</li>
                                <li class="list-group-item">${phoneInfo.mainFeatures.storage}</li>               
                            </ul>
                        </div>
                    </div>
                    <div class="col">
                        <h5 class="card-title">Other Features:</h5>
                        <ul class="list-group">
                            <li class="list-group-item">${phoneInfo.others.Bluetooth}</li>
                            <li class="list-group-item">${phoneInfo.others.GPS}</li>
                            <li class="list-group-item">${phoneInfo.others.NFC}</li>
                            <li class="list-group-item">${phoneInfo.others.Radio}</li>
                            <li class="list-group-item">${phoneInfo.others.USB}</li>
                            <li class="list-group-item">${phoneInfo.others.WLAN}</li>
                        </ul>
                    </div>
                </div>
            </div>
    `
    phoneDetail.appendChild(div);

    if (phoneInfo.releaseDate === 0) {
        document.getElementById('error-message3').style.display = 'block';
    }

}
//display all phones function is defined
// const searchPhoneAll = (phones) => {
// }
{/* <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
                <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a> */}