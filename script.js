async function processLink() {
    const link = document.getElementById('linkInput').value.trim();
    const proxyUrl = 'http://localhost:3000/proxy?url=';
    const imageIds = new Set();

    if (link) {
        try {
            const response = await fetch(proxyUrl + encodeURIComponent(link));
            const htmlContent = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlContent, 'text/html');
            const images = Array.from(doc.querySelectorAll('img')).map(img => img.src);
            images.forEach(src => {
                const id = extractImageId(src);
                if (id) {
                    imageIds.add(id);
                }
            });
        } catch (error) {
            console.error('Error fetching or parsing URL:', link, error);
        }
    }

    displayResult(imageIds);
}

function extractImageId(url) {
    try {
        const pathPart = url.split('/').pop().split('?')[0];
        return pathPart;
    } catch (error) {
        console.error('Invalid URL:', url, error);
        return null;
    }
}

function displayResult(imageIds) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p>Unique Image IDs (${imageIds.size}):</p>`;
    resultDiv.innerHTML += '<ul>';
    imageIds.forEach(id => {
        resultDiv.innerHTML += `<li>${id}</li>`;
    });
    resultDiv.innerHTML += '</ul>';
}
