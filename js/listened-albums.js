"use strict";

//-------------------------------------------------------------------//
// ELEMENTS

const albumHeader = document.querySelector ('#albums_header');
const yearContainer = document.querySelector ('#year_container');
const keywordsInput = document.querySelector ("#keywords_input");
const propertySelect = document.querySelector ("#property_select");

//-------------------------------------------------------------------//
// EVENTS

$(document).ready (() =>
{
    albums2019.content = albums2019.content.reverse ();
    albums2020.content = albums2020.content.reverse ();

    keywordsInput.addEventListener ("keyup", function ()
    {
        triggerSearch (this.value);
    });

    propertySelect.addEventListener ("change", function ()
    {
        triggerSearch (keywordsInput.value);
    });

    albumHeader.innerHTML = "Latest entries:";
    listAll (albums2020, true);
    listAll (albums2019, false);
    bindHeadersClick ();
});

//-------------------------------------------------------------------//
// HELPER FUNCTIONS

function listAll (albums, toShow)
{
    let contentLength = albums.content.length;
    // New year container
    yearContainer.innerHTML += 
    `<div id="year_accordion_${albums.year}" class="accordion">
        <div class="card">
            <div id="accordion_header_${albums.year}" class="card-header">
                <h1 class="mb-0"> ${albums.year} - ${contentLength >= 1 ? contentLength + ' album(s) ' : 'Not found' } </h1>
            </div>

            <div id="accordion_content_${albums.year}" class="card-content collapse ${toShow ? 'show' : ''}">
                <div class="card-body">
                    <div id="albums_container_${albums.year}" class="row"></div>
                </div>
            </div>
        </div>
    </div>`;

    // List albums content
    let albumContainer = document.querySelector ('#albums_container_' + albums.year);
    albumContainer.innerHTML = "";
    albums.content.forEach ((album, index) => 
    {
        albumContainer.innerHTML +=
        `<div class="album col-lg-3 col-md-3 col-xs-6 p-2">
            <div class="hover-effect">
                <img src="${album.cover}" class="card-img-top"/>
                <div class="overlay">
                    <div class="info">
                        <h3 class="text-center mt-5"> ${album.name} </h3>
                        <h4 class="text-center"> ${album.artist} </h4>
                        <h6 class="text-center">Released: ${album.releaseYear} </h6>
                        <h6 class="text-center"> ${album.genre} </h6>
                        <a class="listen" href="${album.streamLink}" target="_blank">Listen</a>
                    </div>
                </div>
            </div>
        </div>`;
    });
}

function filterList (property, searchString)
{
    let filtered2020 = getFiltered (albums2020, property, searchString);
    let filtered2019 = getFiltered (albums2019, property, searchString);
    let total = (filtered2020.content.length + filtered2019.content.length);
    yearContainer.innerHTML = "";
    albumHeader.innerHTML = (total >= 1 ? `${total} occurrence(s) found with '${searchString}'` : 'Nothing was found');
    listAll (filtered2020, true);
    listAll (filtered2019, true);
    bindHeadersClick ();
}

function getFiltered (albums, property, searchString)
{
    let filtered = 
    {
        year: albums.year,
        content: albums.content.filter (album => album[property].toString ().toLowerCase ().includes (searchString.toLowerCase ()))
    };

    return filtered;
}

function triggerSearch (value)
{
    if (value != "")
    {
        let property = propertySelect[propertySelect.selectedIndex].value;
        let searchString = value;
        filterList (property, searchString);
    }
    else
    {
        yearContainer.innerHTML = "";
        albumHeader.innerHTML = "Latest entries:";
        listAll (albums2020, true);
        listAll (albums2019, false);
        bindHeadersClick ();
    }
}

function bindHeadersClick ()
{
    let headers = document.querySelectorAll ("div.accordion .card-header");
    headers.forEach ((header, index) => 
    {
        let content = header.parentElement.querySelector (".card-content");
        $(header).on ("click", () => 
        {
            $(content).toggle ("slow", null);
        });
    });
}