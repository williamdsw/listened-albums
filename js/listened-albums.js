"use strict";

window.addEventListener ("load", function ()
{
    const keywordsInput = document.querySelector ("#keywords_input");
    const propertySelect = document.querySelector ("#property_select");

    keywordsInput.addEventListener ("keyup", function ()
    {
        if (this.value != "")
        {
            let property = propertySelect[propertySelect.selectedIndex].value;
            let searchString = this.value;
            filterList (property, searchString);
        }
        else
        {
            listAll (albums);
        }
    });

    listAll (albums);
});

function listAll (albums)
{
    const container = document.querySelector ('#albums_container');
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
    listAll (filtered);
}