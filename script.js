const accessKey = 'EheOXXx0vYnm4FVTc2ZF8D_CCAGha8dx69oT2Bml4sY';
const container = document.getElementById('image-container');


const fetchImages = async () => {
    try {
        const response = await fetch('https://api.unsplash.com/search/photos?page=1&query=javascript', {
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

const displayImages = async () => {
    try {
        const imagesData = await fetchImages();
        if (Array.isArray(imagesData) && imagesData.length > 0) {
            imagesData.forEach((item) => {
                console.log(item?.urls?.full);
                const image = document.createElement('img');
                image.className = 'img';
                image.src = item?.urls?.small;
                container.append(image);
            });
        } else {
            console.log('No images found.');
        }

    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
}


displayImages();