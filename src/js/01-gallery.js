import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';

// select gallery container
const galleryList = document.querySelector('.gallery');

// add markup of gallery items to html
galleryList.innerHTML = markup(galleryItems);

// creates markup of gallery items
function markup(items) {
  return items.reduce((acc, { preview, original, description }) => {
    return (
      acc +
      `
        <li class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img class="gallery__image"
                src="${preview}"
                alt="${description}" />
            </a>
        </li>
    `
    );
  }, '');
}

// add lightbox to the gallery items
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});