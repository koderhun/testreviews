function generateReviewTypes(reviewTypes) {
  return reviewTypes
    .map(
      (type) => `
      <div class="reviews-type__item reviews-type__item--${type.cssName.toLowerCase()}">
        ${type.platform}
        <span class="count">${type.rating}</span>
      </div>
    `
    )
    .join("");
}

function generateStars(rating) {
  const activeStars = Math.floor(rating);
  const inactiveStars = 5 - activeStars;

  const activeStarsHtml = Array(activeStars)
    .fill('<div class="star-block__item star-block__item--active"></div>')
    .join("");
  const inactiveStarsHtml = Array(inactiveStars)
    .fill('<div class="star-block__item"></div>')
    .join("");

  return `${activeStarsHtml}${inactiveStarsHtml}`;
}

function generateReviewHtml(reviews) {
  return reviews
    .map(
      (review) => `
        <div class="carousel__item">
          <div class="review-item">
            <div class="ava">
              <div class="ava__container">
                <div class="ava__picture">
                  <img src="${review.picture}" alt="${review.author}" />
                </div>
                <div class="ava__content">
                  <div class="ava__name">${review.author}</div>
                  <div class="text-info-block">
                    ${review.date} на
                    <a href="#">${review.platform}</a>
                  </div>
                </div>
              </div>
              <div class="ava__stars">
                <div class="star-block">
                  ${generateStars(review.rating)}
                </div>
              </div>
            </div>
            <div class="text-content">
              ${review.content}
            </div>
          </div>
        </div>
      `
    )
    .join("");
}

function generateFullHtml({ header, reviews }) {
  return `
	  <section class="section">
      <div class="container">
        <h2 class="text-center">Что говорят посетители</h2>
        <div class="reviews-header">
          <div class="result-block">
            <div class="result-block__rating">${header.overallRating}</div>
            <div class="result-block__star">
              <div class="star-block">
                ${generateStars(header.overallRating)}
              </div>
              <div class="info-text-block">${header.totalReviews} отзыва</div>
            </div>
          </div>
          <div class="reviews-type">
            <div class="reviews-type__item reviews-type__item--no-padding">
              <a href="#" class="btn btn--outline">Все отзывы</a>
            </div>
						${generateReviewTypes(header.reviewTypes)}
          </div>
          <div class="reviews-buttons">
            <a href="#" class="btn btn--primary">Оставить отзыв</a>
          </div>
        </div>
        <div class="carousel container">
          <button class="carousel-btn carousel-btn--prev"></button>
          <div class="carousel-container">
            ${generateReviewHtml(reviews)}
          </div>
          <button class="carousel-btn carousel-btn--next"></button>
        </div>
      </div>
    </section>
	
	`;
}

document.addEventListener("DOMContentLoaded", function () {
  fetch("./reviews.json")
    .then((response) => response.json())
    .then((data) => {
      const $review = document.getElementById("review");

      $review.innerHTML = generateFullHtml(data);
    })
    .catch((error) => console.error("Ошибка при загрузке отзывов:", error));
});
