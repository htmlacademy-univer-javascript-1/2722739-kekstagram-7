const COMMENTS_PER_PAGE = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const shownCommentsCount = bigPicture.querySelector('.comments-shown-count');
const commentsList = bigPicture.querySelector('.social__comments');
const caption = bigPicture.querySelector('.social__caption');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

let pictureComments = [];
let renderedCommentsCount = 0;

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

  commentsList.append(commentsFragment);
};

const renderNextComments = () => {
  const nextComments = pictureComments.slice(
    renderedCommentsCount,
    renderedCommentsCount + COMMENTS_PER_PAGE
  );

  renderComments(nextComments);
  renderedCommentsCount += nextComments.length;
  shownCommentsCount.textContent = renderedCommentsCount;

  if (renderedCommentsCount === pictureComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
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

const onCommentsLoaderClick = () => {
  renderNextComments();
};

const showBigPicture = ({url, description, likes, comments}) => {
  bigPictureImage.src = url;
  bigPictureImage.alt = description;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  caption.textContent = description;
  pictureComments = comments;
  renderedCommentsCount = 0;
  commentsList.replaceChildren();
  renderNextComments();

  commentCount.classList.remove('hidden');
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onBigPictureKeydown);
};

closeButton.addEventListener('click', onBigPictureCloseClick);
commentsLoader.addEventListener('click', onCommentsLoaderClick);

export {showBigPicture};
