const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const caption = bigPicture.querySelector('.social__caption');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const createCommentElement = ({avatar, name, message}) => {
  const commentElement = document.createElement('li');
  const avatarElement = document.createElement('img');
  const textElement = document.createElement('p');

  commentElement.classList.add('social__comment');
  avatarElement.classList.add('social__picture');
  avatarElement.src = avatar;
  avatarElement.alt = name;
  avatarElement.width = 35;
  avatarElement.height = 35;
  textElement.classList.add('social__text');
  textElement.textContent = message;

  commentElement.append(avatarElement, textElement);
  return commentElement;
};

const renderComments = (comments) => {
  const commentsFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    commentsFragment.append(createCommentElement(comment));
  });

  commentsList.replaceChildren(commentsFragment);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onBigPictureKeydown = (event) => {
  if (event.key === 'Escape') {
    closeBigPicture();
    document.removeEventListener('keydown', onBigPictureKeydown);
  }
};

const onBigPictureCloseClick = () => {
  closeBigPicture();
  document.removeEventListener('keydown', onBigPictureKeydown);
};

const showBigPicture = ({url, description, likes, comments}) => {
  bigPictureImage.src = url;
  bigPictureImage.alt = description;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  caption.textContent = description;
  renderComments(comments);

  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onBigPictureKeydown);
};

closeButton.addEventListener('click', onBigPictureCloseClick);

export {showBigPicture};
