async function processLinks() {
    // Get the value from the input element, trim it, and split it into an array of links
    const linkInput = document.getElementById('linkInput').value.trim();
    const links = linkInput ? linkInput.split('\n') : [];
    const proxyUrl = 'http://localhost:3000/proxy?url=';
    const imageIds = new Set();

    // Check if links is correctly an array and has URLs
    if (Array.isArray(links) && links.length > 0) {
        for (const link of links) {
            if (link) {
                try {
                    // Fetch and process each link
                    const response = await fetch(proxyUrl + encodeURIComponent(link.trim()));
                    const htmlContent = await response.text();
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(htmlContent, 'text/html');
                    const images = Array.from(doc.querySelectorAll('img')).map(img => img.className == 'lazyload' ? img.dataset.src : img.src);
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
        }
    }

    // Display the result
    displayResult(imageIds);
}

function extractImageId(url) {
    try {
        const pathPart = url.match(/\/([^/?]+)\?/)[1];
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
