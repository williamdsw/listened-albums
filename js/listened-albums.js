"use strict";

//-------------------------------------------------------------------//
// ELEMENTS

const albumHeader = document.querySelector ('#albums_header');
const container = document.querySelector ('#albums_container');
const keywordsInput = document.querySelector ("#keywords_input");
const propertySelect = document.querySelector ("#property_select");

//-------------------------------------------------------------------//
// EVENTS

window.addEventListener ("load", function ()
{
    albums = albums.reverse ();

    keywordsInput.addEventListener ("keyup", function ()
    {
        triggerSearch (this.value);
    });

    propertySelect.addEventListener ("change", function ()
    {
        triggerSearch (keywordsInput.value);
    });

    albumHeader.innerHTML = "Latest entries:";
    listAll (albums);
});

//-------------------------------------------------------------------//
// HELPER FUNCTIONS

function listAll (albums)
{
    container.innerHTML = "";
    albums.forEach ((album, index) => 
    {
        container.innerHTML +=
        `<div class="album col-lg-3 col-md-3 col-xs-6 p-2">
            <div class="hover-effect">
                <img src="${album.cover}" class="card-img-top"/>
                <div class="overlay">
                    <div class="info">
                        <h3 class="text-center mt-5"> ${album.name} </h3>
                        <h4 class="text-center"> ${album.artist} </h4>
                        <h6 class="text-center">Released: ${album.releaseYear} </h6>
                        <h6 class="text-center"> ${album.genre} </h6>
                        <a class="listen" href="${album.spotifyLink}" target="_blank">Listen</a>
                    </div>
                </div>
            </div>
        </div>`;
    });
}

function filterList (property, searchString)
{
    let filtered = albums.filter (album => album[property].toString ().toLowerCase ().includes (searchString.toLowerCase ()));
    albumHeader.innerHTML = (filtered.length >= 1 ? `${filtered.length} occurrence(s) found with '${searchString}'` : 'Nothing was found');
    listAll (filtered);
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
        albumHeader.innerHTML = "Latest entries:";
        listAll (albums);
    }
}