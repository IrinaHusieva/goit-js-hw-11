
import Notiflix from 'notiflix';
import { createMarkup } from './markup.js';
import LoadMoreBtn from './LoadMoreBtn.js';
import NewsAPIService from './api.js';

const form = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const totalHits = document.getElementById("totalHits");

const loadMoreBtn = new LoadMoreBtn({
  selector: "#loadMore",
  isHidden: true,
});
const newsAPIService = new NewsAPIService();


form.addEventListener('submit', onSubmit);
loadMoreBtn.button.addEventListener("click", fetchArticles);


async function onSubmit(event) {
  event.preventDefault();
  const searchQuery = form.elements.searchQuery.value.trim();
  const res = await newsAPIService.getImg(searchQuery);
  const images = res.data.hits;

  if (images.length === 0 || searchQuery === "") {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    clearNewsList();
  } else {
    const markup = createMarkup(images);
    gallery.innerHTML = markup;
  }
  onReset();
}

function onReset() {
  form.reset();
}

function clearNewsList() {
  gallery.innerHTML = "";
}

async function fetchArticles() {
  loadMoreBtn.disable();

  try {
    const markup = await generateArticlesMarkup();
    if (markup === undefined) throw new Error("No data!");
    appendNewToNewsList(markup);
  } catch (err) {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
  }

  loadMoreBtn.enable();
}

async function generateArticlesMarkup() {
  try {
    const { hits, totalHits } = await newsAPIService.getImg();
    const nextPage = newsAPIService.page;
    const maxPage = Math.ceil(totalHits / 40);
    // 17 / 6 -> 2.8 > 3 -> 6 + 6 + 5
    if (nextPage > maxPage) {
      loadMoreBtn.hide();
    }

    if (hits.length === 0) throw new Error("Not found");

    totalHits.textContent = `Total: ${totalHits}`;
    return hits.reduce(
      (markup, currentNews) => markup + createMarkup(currentNews),
      ""
    );
  } catch (err) {
    onError(err);
  }
}

function appendNewToNewsList(markup) {
  gallery.insertAdjacentHTML("beforeend", markup);
}