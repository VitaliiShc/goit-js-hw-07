/*
Завдання 2 - бібліотека SimpleLightbox
Зроби таку саму галерею як в першому завданні, але використовуючи бібліотеку SimpleLightbox (https://simplelightbox.com/), яка візьме на себе обробку кліків по зображеннях, відкриття і закриття модального вікна, а також гортання зображень за допомогою клавіатури. Відко:
https://user-images.githubusercontent.com/17479434/127714821-4b7527c8-01db-42d3-83f0-8c1578561982.mp4

Необхідно трохи змінити розмітку картки галереї, використовуй цей шаблон.

<li class="gallery__item">
   <a class="gallery__link" href="large-image.jpg">
      <img class="gallery__image" src="small-image.jpg" alt="Image description" />
   </a>
</li>

Виконуй це завдання у файлах 02-lightbox.html і 02-lightbox.js. Розбий його на декілька підзавдань:

✅ 1. Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї. Використовуй готовий код з першого завдання.
✅ 2. Підключення скрипту і стилів бібліотеки, використовуючи CDN сервіс cdnjs (https://cdnjs.com/libraries/simplelightbox). Необхідно додати посилання на два файли: simple-lightbox.min.js і simple-lightbox.min.css.
3. Ініціалізація бібліотеки після створення і додання елементів галереї у ul.gallery. Для цього ознайомся з документацією SimpleLightbox (https://simplelightbox.com/) - насамперед секції «Usage» і «Markup».
4. Подивися в документації секцію «Options» і додай відображення підписів до зображень з атрибута alt. Нехай підпис буде знизу і з'являється через 250 мілісекунд після відкриття зображення.
*/

import { galleryItems } from './gallery-items.js';
// Change code below this line

const imgGallery = document.querySelector('ul.gallery');

createMurkup(galleryItems);

function createMurkup(arrObj) {
  const markup = arrObj
    .map(
      ({ preview, original, description }) =>
        `
        <li class="gallery__item">
   <a class="gallery__link" href="${original}">
      <img class="gallery__image" src="${preview}" alt="${description}" />
   </a>
</li>`
    )
    .join('');
  return (imgGallery.innerHTML = markup);
};

const lightbox = new SimpleLightbox('.gallery__link', {
  captionDelay: 250,
  captionsData: 'alt',
});