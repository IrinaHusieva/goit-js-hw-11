export { createMarkup };
    
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