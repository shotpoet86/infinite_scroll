const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

/*unsplash api*/
const count = 10;
const apiKey = 'x--y8k_PgC9QSzzBpdGcoXs_dJ6bqaOBb9imE3kgDYw';
const apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&count=${count}`;

/*helper function to set attributes on DOM elements*/
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

/*create elements for links & photos. Add to DOM*/
function displayPhotos() {
    /*runs function for each object in photosArray*/
    photosArray.forEach((photo) => {
        /*creates anchor to link to Unsplash*/
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        /*create image for photo*/
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        /*puts image inside anchor , then puts both inide imageContainer element*/
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

/*get photos from unsplash api*/
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        /*catch error*/
    }
}

/*on load*/
console.log(getPhotos());