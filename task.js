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
const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');
const overlayBoxEl = modalBox.querySelector('.lightbox__overlay');
const overlayImgEl = modalBox.querySelector('.lightbox__image');

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
    return images.map(
        el => { 
        const { preview, original, description } = el;
        return `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
        data-index="${images.indexOf({el})}"
    />
    </a>
</li>`;        
    }).join('');
};


galleryBox.addEventListener('click', onClickImage);

let currentSlide = 0;
let slidesEl = document.querySelectorAll('.gallery__image');

function onClickImage(evt) {
    if (!evt.target.classList.contains('gallery__image')) {
        return;
    };
    
    evt.preventDefault();
    
    currentSlide = evt.target;
    console.log(currentSlide);

    slidesChanges(currentSlide);
    
    if (!modalBox.classList.contains('is-open')) {
        modalBox.classList.add('is-open');
    };

    if (modalBox.classList.contains('is-open')) {
        window.addEventListener('keydown', onKeyPress);
    };

    closeModalBtn.addEventListener('click', onCloseModal);
    overlayBoxEl.addEventListener('click', onCloseModal);
    window.addEventListener('keydown', onEscPress);
};

function slidesChanges(currentSlide) {
    overlayImgEl.src = currentSlide.dataset.source;
    overlayImgEl.alt = currentSlide.alt;
};

function onEscPress(evt) {
    const ESC_KEY_CODE = 'Escape';
    const isEscKey = evt.code === ESC_KEY_CODE;
    if (isEscKey) {
        onCloseModal()
    }
};

function onCloseModal() { 
    modalBox.classList.remove('is-open');
    lightboxImageSrcCleaning();
    window.removeEventListener('keydown', onKeyPress);
};

function lightboxImageSrcCleaning() {
    overlayImgEl.src = '';
    overlayImgEl.alt = '';
};

function onKeyPress(evt) {
    const PREV_IMG_KEY_CODE = 'ArrowLeft';
    const NEXT_IMG_KEY_CODE = 'ArrowRight';

    let isPrevImgKey = evt.code === PREV_IMG_KEY_CODE;
    let isNextImgKey = evt.code === NEXT_IMG_KEY_CODE;

    if (isPrevImgKey) {
        console.log('ArrowLeft');
        showPrevImg();
    } else if (isNextImgKey) {
        console.log('ArrowRight');
        showNextImg();
    }
};

function showPrevImg() {
    if (currentSlide.dataset.index > 0) {
        currentSlide = slidesEl[Number(currentSlide.dataset.index) - 1];
    } else {
        currentSlide = slidesEl[8];
    };

    overlayImgEl.src = currentSlide.dataset.source;
    overlayImgEl.alt = currentSlide.alt;
};

function showNextImg() {
    if (currentSlide.dataset.index < 8) {
        currentSlide = slidesEl[Number(currentSlide.dataset.index) + 1];
    } else {
        currentSlide = slidesEl[0];
    };
    
    overlayImgEl.src = currentSlide.dataset.source;
    overlayImgEl.alt = currentSlide.alt;
}