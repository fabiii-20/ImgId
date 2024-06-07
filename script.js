// document.getElementById('processButton').addEventListener('click', async () => {
//     // Get the value of the textarea containing links
//     const linksTextArea = document.getElementById('linksTextArea');
//     const links = linksTextArea.value.trim().split('\n').map(link => link.trim()).filter(link => link);
    
//     // Check if links is an array before calling processLinks
//     if (Array.isArray(links)) {
//         await processLinks(links);
//     } else {
//         console.error('Links is not an array:', links);
//     }
// });
// async function processLinks(links) {
//     const proxyUrl = 'http://localhost:3000/proxy?url=';
//     const allImageIds = new Set();

//     // Process each link asynchronously
//     for (const link of links) {
//         if (link) {
//             try {
//                 const response = await fetch(proxyUrl + encodeURIComponent(link));
//                 const htmlContent = await response.text();
//                 const parser = new DOMParser();
//                 const doc = parser.parseFromString(htmlContent, 'text/html');
//                 const images = Array.from(doc.querySelectorAll('img')).map(img => img.className=='lazyload' ? img.dataset.src : img.src);

//                 // Fetch all images asynchronously
//                 const fetchPromises = images.map(async src => {
//                     try {
//                         const response = await fetch(src);
//                         // Assuming fetch is successful, extract image ID
//                         const id = extractImageId(src);
//                         if (id) {
//                             allImageIds.add(id);
//                         }
//                     } catch (error) {
//                         console.error('Error fetching image:', src, error);
//                     }
//                 });

//                 // Wait for all fetches to complete before moving to the next link
//                 await Promise.all(fetchPromises);

//             } catch (error) {
//                 console.error('Error fetching or parsing URL:', link, error);
//             }
//         }
//     }

//     displayResult(allImageIds);
// }

// function extractImageId(url) {
//     try {
//         const pathPart = url.match(/\/([^/?]+)\?/)[1];
//         return pathPart;
//     } catch (error) {
//         console.error('Invalid URL:', url, error);
//         return null;
//     }
// }

// function displayResult(imageIds) {
//     const resultDiv = document.getElementById('result');
//     resultDiv.innerHTML = `<p>Unique Image IDs (${imageIds.size}):</p>`;
//     resultDiv.innerHTML += '<ul>';
//     imageIds.forEach(id => {
//         resultDiv.innerHTML += `<li>${id}</li>`;
//     });
//     resultDiv.innerHTML += '</ul>';
// }
