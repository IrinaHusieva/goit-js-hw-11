import Notiflix from 'notiflix';
import { getImg } from './api.js';

const form = document.getElementById('search-form');
const gallery = document.getElementById('gallery');

form.addEventListener('submit', onSubmit);

async function onSubmit(event) {
  event.preventDefault();
  const searchQuery = form.elements.searchQuery.value;
  const res = await getImg(searchQuery);
  const images = res.data.hits;

  if (images.length === 0) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  } else {
    const markup = createMarkup(images);
    gallery.innerHTML = markup;
  }
}

function createMarkup(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <a href='${largeImageURL}'>
          <div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <div class="box-likes">
                <b>Лайки</b>
                <span id="value">${likes}</span>
              </div>
              <p class="info-item">
                <b>Перегляди</b>
                ${views}
              </p>
              <p class="info-item">
                <b>Коментарі</b>
                ${comments}
              </p>
              <p class="info-item">
                <b>Завантаження</b>
                ${downloads}
              </p>
            </div>
          </div>
        </a>
      `
    )
    .join('');
}


// async function onSubmit (event) {
//     event.preventDefault();
//     const searchQuery = form.elements.searchQuery.value;
//      const res = await getImg(searchQuery);
//     const images = res.data.hits;
//     if (images.length === 0) {
//         Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//     }
//     else {
//     images.forEach(function(image) {
//       const card = document.createElement('div');
//       card.classList.add('gallery');
  
//       const imageElement = document.createElement('img');
//       imageElement.src = image.webformatURL;
//       imageElement.alt = image.tags;
  
//       card.appendChild(imageElement);
//       gallery.appendChild(card);
//     });
//   }
// };



