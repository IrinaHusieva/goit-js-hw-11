import Notiflix from 'notiflix';
import { getImg } from './api.js';
import { createMarkup } from './markup.js';

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
