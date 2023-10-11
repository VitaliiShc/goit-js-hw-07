/*
Завдання 1 - галерея зображень
Створи галерею з можливістю кліку по її елементах і перегляду повнорозмірного зображення у модальному вікні.Подивися демо відео роботи галереї.
https://user-images.githubusercontent.com/17479434/127711719-4e293f5b-fbaa-4851-8671-fc841963d961.mp4

Виконуй це завдання у файлах 01-gallery.html і 01-gallery.js. Розбий його на декілька підзавдань:
// 1. Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.
// 2. Реалізація делегування на ul.gallery і отримання url великого зображення.
// 3. Підключення скрипту і стилів бібліотеки модального вікна basicLightbox (https://basiclightbox.electerious.com/). Використовуй CDN сервіс jsdelivr (https://www.jsdelivr.com/package/npm/basiclightbox?path=dist) і додай у проект посилання на мініфіковані (.min) файли бібліотеки.
// 4. Відкриття модального вікна по кліку на елементі галереї. Для цього ознайомся з документацією (https://github.com/electerious/basicLightbox#readme) і прикладами (https://basiclightbox.electerious.com/).
// 5. Заміна значення атрибута src елемента <img> в модальному вікні перед відкриттям. Використовуй готову розмітку модального вікна із зображенням з прикладів бібліотеки basicLightbox (https://basiclightbox.electerious.com/).

Розмітка елемента галереї
Посилання на оригінальне зображення повинно зберігатися в data-атрибуті source на елементі <img>, і вказуватися в href посилання. Не додавай інші HTML теги або CSS класи, крім тих, що містяться в цьому шаблоні.

<li class="gallery__item">
  <a class="gallery__link" href="large-image.jpg">
    <img
      class="gallery__image"
      src="small-image.jpg"
      data-source="large-image.jpg"
      alt="Image description"
    />
  </a>
</li>

Зверни увагу на те, що зображення обгорнуте посиланням, отже по кліку за замовчуванням користувач буде перенаправлений на іншу сторінку. Заборони цю поведінку за замовчуванням.

Закриття з клавіатури
УВАГА
Наступний функціонал не обов'язковий для здавання завдання, але буде хорошою додатковою практикою.
Додай закриття модального вікна після натискання клавіші Escape. Зроби так, щоб прослуховування клавіатури було тільки доти, доки відкрите модальне вікно. Бібліотека basicLightbox (https://basiclightbox.electerious.com/) містить метод для програмного закриття модального вікна.
*/

// Options
// The option object can include the following properties:
// {
// 	/*
// 	 * Prevents the lightbox from closing when clicking its background.
// 	 */
// 	closable: true,
// 	/*
// 	 * One or more space separated classes to be added to the basicLightbox element.
// 	 */
// 	className: '',
// 	/*
// 	 * Function that gets executed before the lightbox will be shown.
// 	 * Returning false will prevent the lightbox from showing.
// 	 */
// 	onShow: (instance) => {},
// 	/*
// 	 * Function that gets executed before the lightbox closes.
// 	 * Returning false will prevent the lightbox from closing.
// 	 */
// 	onClose: (instance) => {}
// }

import { galleryItems } from './gallery-items.js';
// Change code below this line

const imgGallery = document.querySelector('ul.gallery');
imgGallery.addEventListener('click', onImgCllick);

createMurkup(galleryItems);

function createMurkup(arrObj) {
  const markup = arrObj
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
     <a class="gallery__link" href="${original}">
     <img
     class="gallery__image"
       src="${preview}"
      data-source="${original}"
     alt="${description}"
    />
    </a>
    </li>`
    )
    .join('');
  return (imgGallery.innerHTML = markup);
}

function onImgCllick(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  const bigImgLink = e.target.dataset.source;
  const modalImg = basicLightbox.create(
    `<img src="${bigImgLink}" width="800" height="600">`,
    {
      onShow: () => {
        document.addEventListener('keydown', onEscClick);
      },
      onClose: () => {
        document.removeEventListener('keydown', onEscClick);
      },
    }
  );

  modalImg.show();

  function onEscClick(e) {
    if (e.code === 'Escape') modalImg.close();
  }
}
