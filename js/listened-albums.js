"use strict";

// ELEMENTS

const albumHeader = document.querySelector('#albums_header');
const yearContainer = document.querySelector('#year_container');
const keywordsInput = document.querySelector("#keywords_input");
const propertySelect = document.querySelector("#property_select");
let listYears = [];
const dataUrls = [
    'js/data/2019.json',
    'js/data/2020.json',
    'js/data/2021.json',
];

// EVENTS

$(document).ready(() => {
    loadJsonData(0);

    keywordsInput.addEventListener('keyup', function () {
        triggerSearch(this.value);
    });

    propertySelect.addEventListener('change', () => triggerSearch(keywordsInput.value));

    albumHeader.innerHTML = 'Latest entries:';
    bindHeadersClick();
});

// HELPER FUNCTIONS

function loadJsonData(index) {

    if (dataUrls.length === index) {
        listYears = listYears.reverse();
        listYears.forEach((item, currentIndex) => {
            listAll(item, (currentIndex == 0));
        });

        bindHeadersClick();
        return;
    }

    fetch(dataUrls[index]).then(response => {
        if (response.ok) {
            response.json().then(json => {
                json.albums = json.albums.reverse();
                listYears.push(json);
                loadJsonData(++index);
            });
        }
        else {
            console.error('Do something with error');
        }
    })
    .catch(error => console.error('Do something with error', error));
}

function listAll(item, toShow) {
    let contentLength = item.albums.length;

    // New year container
    yearContainer.innerHTML +=
    `<div id="year_accordion_${item.year}" class="accordion">
        <div class="card">
            <div id="accordion_header_${item.year}" class="card-header">
                <h1 class="mb-0"> ${item.year} - ${contentLength >= 1 ? contentLength + ' album(s) ' : 'Not found'} </h1>
            </div>

            <div id="accordion_content_${item.year}" class="card-content collapse ${toShow ? 'show' : ''}">
                <div class="card-body">
                    <div id="albums_container_${item.year}" class="row"></div>
                </div>
            </div>
        </div>
    </div>`;

    // List albums content
    let albumContainer = document.querySelector('#albums_container_' + item.year);
    albumContainer.innerHTML = '';
    item.albums.forEach((album) => {
        const fullDescription = `${album.artist} - ${album.name}`;
        albumContainer.innerHTML +=
        `<div class="album col-lg-3 col-md-3 col-xs-6 col-sm-6 p-2">
            <div class="hover-effect" title="${fullDescription}">
                <img src="${album.cover}" class="card-img-top"/>
                <div class="overlay">
                    <div class="info">
                        <h3 class="text-center mt-5"> ${album.name} </h3>
                        <h4 class="text-center"> ${album.artist} </h4>
                        <h6 class="text-center"> Released: ${album.releaseYear} </h6>
                        <h6 class="text-center"> ${album.genre} </h6>
                        <a class="listen" href="${album.streamLink}" target="_blank"> Listen </a>
                    </div>
                </div>
            </div>
        </div>`;
    });
}

function filterList(property, searchString) {
    let filteredYears = [];
    let total = 0;
    listYears.forEach((item) => {
        let filtered = getFiltered(item, property, searchString);
        filteredYears.push(filtered);
        total += filtered.albums.length;
    });

    yearContainer.innerHTML = '';
    albumHeader.innerHTML = (total >= 1 ? `${total} occurrence(s) found including '${searchString}'` : 'Nothing was found');
    filteredYears.forEach((item) => listAll(item, true));

    bindHeadersClick();
}

function getFiltered(item, property, searchString) {
    return {
        year: item.year,
        albums: item.albums.filter(album => album[property].toString().toLowerCase().includes(searchString.toLowerCase()))
    };
}

function triggerSearch(value) {
    if (value !== '') {
        const property = propertySelect[propertySelect.selectedIndex].value;
        const searchString = value;
        filterList(property, searchString);
    }
    else {
        yearContainer.innerHTML = '';
        albumHeader.innerHTML = 'Latest entries:';
        listYears.forEach((item, index) => listAll(item, (index === 0)));

        bindHeadersClick();
    }
}

function bindHeadersClick() {
    const headers = document.querySelectorAll('div.accordion .card-header');
    headers.forEach((header) => {
        let content = header.parentElement.querySelector('.card-content');
        $(header).on('click', () => $(content).toggle('slow', null));
    });
}