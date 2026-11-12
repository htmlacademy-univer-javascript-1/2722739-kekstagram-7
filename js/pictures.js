import {showBigPicture} from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPictures = (pictures) => {
  const picturesFragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const {url, description, likes, comments} = picture;
    const pictureElement = pictureTemplate.cloneNode(true);
    const pictureImage = pictureElement.querySelector('.picture__img');

    pictureImage.src = url;
    pictureImage.alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    const onPictureClick = (event) => {
      event.preventDefault();
      showBigPicture(picture);
    };

    pictureElement.addEventListener('click', onPictureClick);

    picturesFragment.append(pictureElement);
  });

  picturesContainer.append(picturesFragment);
};

export {renderPictures};
