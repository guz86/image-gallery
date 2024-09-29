const accessKey = 'EheOXXx0vYnm4FVTc2ZF8D_CCAGha8dx69oT2Bml4sY';
const container = document.getElementById('image-container');
const searchInput = document.getElementById('search-input');
const searchIcon = document.getElementById('search-icon');
const clearIcon = document.getElementById('clear-icon');


const fetchImages = async (phrase) => {
    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${phrase}`, {
            method: 'GET',
            headers: {
                'Authorization': `Client-ID ${accessKey}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();

        return data.results;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const displayImages = async (phrase) => {
    try {
        const imagesData = await fetchImages(phrase);
        if (Array.isArray(imagesData) && imagesData.length > 0) {

            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }

            imagesData.forEach((item) => {
                const divContainer = document.createElement('div');
                divContainer.className = 'container-img';

                const image = document.createElement('img');
                image.className = 'img';
                image.alt = `image`;
                image.src = item?.urls?.small;

                image.addEventListener('click', () => {
                    const link = document.createElement('a');
                    link.href = item.urls.full;
                    link.download = '';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                });

                const authorImage = document.createElement('img');
                authorImage.className = 'overlay-image';
                authorImage.alt = `author image`;
                authorImage.src = item?.user?.profile_image?.medium;
                container.append(authorImage);

                divContainer.appendChild(image);
                divContainer.appendChild(authorImage);

                container.append(divContainer);

            });
        } else {
            console.log('No images found.');
        }

    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
}

searchIcon.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        displayImages(query);
    }
});

searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
            displayImages(query);
        }
    }
});

window.onload = () => {
    searchInput.focus();
};

searchInput.addEventListener('input', () => {
    if (searchInput.value.trim()) {
        clearIcon.style.display = 'block';
    } else {
        clearIcon.style.display = 'none';
    }
});

clearIcon.addEventListener('click', () => {
    searchInput.value = '';
    clearIcon.style.display = 'none';
    searchInput.focus();
});


displayImages('javascript');