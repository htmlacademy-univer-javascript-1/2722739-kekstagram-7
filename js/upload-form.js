const MAX_HASHTAGS = 5;
const HASHTAG_PATTERN = /^#[\p{L}\p{Nd}]{1,19}$/u;

const uploadForm = document.querySelector('.img-upload__form');
const fileInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadForm.querySelector('.img-upload__cancel');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__field-error',
}, false);

const getHashtags = (value) => {
  const text = value.trim();
  return text ? text.split(/\s+/) : [];
};

const validateHashtagFormat = (value) => getHashtags(value).every((hashtag) => HASHTAG_PATTERN.test(hashtag));

const validateHashtagCount = (value) => getHashtags(value).length <= MAX_HASHTAGS;

const validateUniqueHashtags = (value) => {
  const hashtags = getHashtags(value.toLowerCase());
  return new Set(hashtags).size === hashtags.length;
};

pristine.addValidator(hashtagInput, validateHashtagFormat, 'Хэш-тег должен начинаться с # и содержать от 1 до 19 букв или цифр после решётки');
pristine.addValidator(hashtagInput, validateHashtagCount, `Укажите не больше ${MAX_HASHTAGS} хэш-тегов`);
pristine.addValidator(hashtagInput, validateUniqueHashtags, 'Хэш-теги не должны повторяться');

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  pristine.reset();
  // Pristine удаляет сообщения, а ссылки на них в полях нужно очистить отдельно.
  [fileInput, hashtagInput, descriptionInput].forEach((input) => {
    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-describedby');
  });
};

const onUploadFormKeydown = (event) => {
  if (event.key === 'Escape') {
    closeUploadForm();
    document.removeEventListener('keydown', onUploadFormKeydown);
  }
};

const onTextFieldKeydown = (event) => {
  if (event.key === 'Escape') {
    event.stopPropagation();
  }
};

const onFileInputChange = () => {
  if (fileInput.files.length > 0) {
    uploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onUploadFormKeydown);
  }
};

const onCloseButtonClick = () => {
  closeUploadForm();
  document.removeEventListener('keydown', onUploadFormKeydown);
};

const onUploadFormSubmit = (event) => {
  if (!pristine.validate()) {
    event.preventDefault();
  }
};

fileInput.addEventListener('change', onFileInputChange);
closeButton.addEventListener('click', onCloseButtonClick);
hashtagInput.addEventListener('keydown', onTextFieldKeydown);
descriptionInput.addEventListener('keydown', onTextFieldKeydown);
uploadForm.addEventListener('submit', onUploadFormSubmit);
