
//---------------------------------------search phone function is defined-----------------------------------------------//
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    const phoneDetail = document.getElementById('phone-detail');
    phoneDetail.textContent = '';
    //display spinner
    toggleSpinner('block');
    searchField.value = '';
    // console.log(searchText);

    // Error validation Start
    if (searchText == '') {
        document.getElementById('error-message1').style.display = 'block';
        document.getElementById('error-message2').style.display = 'none';
        const searchResult = document.getElementById('search-result');
        searchResult.innerHTML = '';
        const phoneDetail = document.getElementById('phone-detail');
        phoneDetail.textContent = '';
        //turn off spinner
        toggleSpinner('none');
        // Error validation End
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(searchResult => displayPhone(searchResult.data))

        document.getElementById('error-message1').style.display = 'none';
    }
}

//---------------------------display all phones function is defined-----------------------------------------------//
const displayPhone = (phones) => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    // console.log(phones);

    //---------------------------Find and display 20 phones function is defined-----------------------------------------------//
    const first20Phones = phones.slice(0, 20);
    // console.log(first20Phones);

    // Error validation Start
    if (phones.length === 0) {
        document.getElementById('error-message2').style.display = 'block';
        //turn off spinner
        toggleSpinner('none');
        const phoneDetail = document.getElementById('phone-detail');
        phoneDetail.textContent = '';
        // Error validation End
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
        });
        //turn off spinner
        toggleSpinner('none');
    }
}
//---------------------------individual phone function is defined-----------------------------------------------//
const phoneDetails = (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
        .then(res => res.json())
        .then(phoneData => displayPhoneDetail(phoneData.data))
}
//---------------------------individual phone display function is defined-----------------------------------------------//
const displayPhoneDetail = (phoneInfo) => {
    // console.log(phoneInfo);
    const phoneDetail = document.getElementById('phone-detail');
    phoneDetail.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${phoneInfo.image}" class="card-img-top pt-2 w-25 mx-auto" alt="...">
            <div class="card-body">
                    <h5 class="card-title">${phoneInfo.brand}</h5>
                    <h5 class="card-title">${phoneInfo.name}</h5>
                    <p>Released date:${phoneInfo.releaseDate ? phoneInfo.releaseDate : ' No release date found'}</p>

    <div class="row row-cols-md-2">
        <div class="col">
            <h5 class="card-title">Features:</h5>
            <div>
                <ul class="list-group">
                    <li class="list-group-item"><span class="fw-bolder"> Chipset:</span> ${phoneInfo.mainFeatures.chipSet}</li>
                    <li class="list-group-item"><span class="fw-bolder">Display Size:</span> ${phoneInfo.mainFeatures.displaySize}</li>
                    <li class="list-group-item"><span class="fw-bolder">Memory:</span> ${phoneInfo.mainFeatures.memory}</li>
                    <li class="list-group-item"><span class="fw-bolder">Storage:</span> ${phoneInfo.mainFeatures.storage}</li>
                    <li class="list-group-item"><span class="fw-bolder">Sensors:</span> ${phoneInfo.mainFeatures.sensors}</li>
                </ul>
            </div>
        </div>
        <div class="col">
            <h5 class="card-title">Other Features:</h5>
            <ul class="list-group">
                <li class="list-group-item"><span class="fw-bolder"> Bluetooth:</span> ${phoneInfo.others?.Bluetooth ? phoneInfo.others.Bluetooth : 'No features'}</li>
                <li class="list-group-item"><span class="fw-bolder"> GPS:</span> ${phoneInfo.others?.GPS ? phoneInfo.others.GPS : 'No features'}</li>
                <li class="list-group-item"><span class="fw-bolder"> NFC:</span> ${phoneInfo.others?.NFC ? phoneInfo.others.NFC : 'No features'}</li>
                <li class="list-group-item"><span class="fw-bolder"> Radio:</span> ${phoneInfo.others?.Radio ? phoneInfo.others.Radio : 'No features'}</li>
                <li class="list-group-item"><span class="fw-bolder"> USB:</span> ${phoneInfo.others?.USB ? phoneInfo.others.USB : 'No features'}</li>
                <li class="list-group-item"><span class="fw-bolder"> Wifi:</span> ${phoneInfo.others?.WLAN ? phoneInfo.others.WLAN : 'No features'}</li>
            </ul>
        </div>
    </div>
            </div >
    `
    phoneDetail.appendChild(div);
}