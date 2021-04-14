import images from './gallery-items.js'
// console.log(galleryItem);

// ЗАДАНИЕ
// Создай галерею с возможностью клика по ее элементам и просмотра полноразмерного изображения в модальном окне.

// 1. Создание и рендер разметки по массиву данных и предоставленному шаблону.
// 2. Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// 3. Открытие модального окна по клику на элементе галереи.
// 4. Подмена значения атрибута src элемента img.lightbox__image.
// 5. Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// 6. Очистка значения атрибута src элемента img.lightbox__image.


const galleryBox = document.querySelector('.js-gallery');
const modalBox = document.querySelector('.js-lightbox');
const imageEl = document.querySelector('.gallery__image');

// modalBox.classList.add('is-open');

// ---1. СОЗДАНИЕ РАЗМЕТКИ ГАЛЕРЕИ---

// const makeGalleryCard = ({ preview, original, description }) => {
//     const itemEl = document.createElement('li');
//     itemEl.classList.add('gallery__item');

//     const linkEl = document.createElement('a');
//     linkEl.classList.add('gallery__link');
//     linkEl.href = original;

//     const imgEl = document.createElement('img');
//     imgEl.classList.add('gallery__image');
//     imgEl.src = preview;
//     imgEl.dataSource = original;
//     imgEl.alt = description;
    
//     linkEl.append(imgEl);
//     itemEl.append(linkEl);

//     return itemEl;
// };
// const el = images.map(makeGalleryCard);
// galleryBox.append(...el);

// // 2 способ

const imageCard = makeGalleryCard(images);
galleryBox.insertAdjacentHTML('beforeend', imageCard);

function makeGalleryCard(images) {
    return images.map(({ preview, original, description }) => {
        return `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
    />
    </a>
</li>`;        
    }).join('');
};

// ---2. ДЕЛЕГИРОВАНИЕ НА ГАЛЕРЕИ---

galleryBox.addEventListener('click', onClickImage);

function onClickImage(evt) {
    if (!evt.target.classList.container('.gallery__image')) {
        return;
    }
    
    const openEl = evt.target;
    const parentImgCard = openEl.closest('.gallery__image');

    removeOpenImgCard();
    addOpenImgCard(parentImgCard);
    setModalBgImage(openEl.dataset.original);
}

function setModalBgImage(img) {
modalBox.style.backgroundColor = img;
}

function removeOpenImgCard() {
    const currentActivImg = document.querySelector('.gallery__image.is-open');

    if (currentActivImg) {
        currentActivImg.classList.remove('is-open');
    }
}

function addOpenImgCard(card) {
    card.classList.add('.is-open');
}
    