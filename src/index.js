import Notiflix from 'notiflix';
import { getImg } from './api.js';

const form = document.getElementById('search-form');
const gallery = document.getElementById('gallery');

form.addEventListener('submit', onSubmit);

async function onSubmit (event) {
    event.preventDefault();
    const searchQuery = form.elements.searchQuery.value;
     const res = await getImg(searchQuery);
    const images = res.data.hits;
    if (images.length === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
    else {
    images.forEach(function(image) {
      const card = document.createElement('div');
      card.classList.add('gallery');
  
      const imageElement = document.createElement('img');
      imageElement.src = image.webformatURL;
      imageElement.alt = image.tags;
  
      card.appendChild(imageElement);
      gallery.appendChild(card);
    });
  }
};




//       .then(function(response) {
//           const images = response.data.hits;
//           console.log(images);

//         if (images.length === 0) {
//           Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//         } else {
//           images.forEach(function(image) {
//             const card = document.createElement('div');
//             card.classList.add('gallery');

//             const imageElement = document.createElement('img');
//             imageElement.src = image.webformatURL;
//             imageElement.alt = image.tags;

//             card.appendChild(imageElement);
//             document.body.appendChild(card);
//           });
//         }
//       })
//       .catch(function(error) {
//         Notiflix.Notify.failure('An error occurred while fetching images. Please try again later.');
//       });

// });
