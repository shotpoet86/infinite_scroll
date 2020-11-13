const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoadedImages = true;
/*unsplash api*/
let initialImageCount = 5;
const apiKey = 'x--y8k_PgC9QSzzBpdGcoXs_dJ6bqaOBb9imE3kgDYw';
let apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&initialImageCount=${initialImageCount}`;


function updateAPIURLWithNewCount() {
    apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&initialImageCount=${initialImageCount}`;
}

/*checks if all images loaded*/
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

/*helper function to set attributes on DOM elements*/
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

/*create elements for links & photos. Add to DOM*/
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
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
        /*event listener, checks when each is image is finished loading*/
        img.addEventListener('load', imageLoaded())

        /*puts image inside anchor , then puts both inside imageContainer element*/
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
        if (isInitialLoadedImages) {
            updateAPIURLWithNewCount(30);
            isInitialLoadedImages = false;
        }
    } catch (error) {
        /*catch error*/
    }
}

/*check to see if scrolling is nearing bottom of page, if so load more photos from API*/
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

/*on load*/
getPhotos();