import { getRandomInteger, createUniqueRandomIntegerGenerator } from './util.js';

const NAMES = [
  'Артём',
  'Анна',
  'Виктория',
  'Максим',
  'София',
  'Даниил',
  'Мария',
  'Иван',
  'Екатерина',
  'Алексей',
];

const DESCRIPTIONS = [
  'Тёплый вечер в городе.',
  'Прогулка по осеннему парку.',
  'Вид на море перед закатом.',
  'Уютное кафе в центре города.',
  'Небо после летнего дождя.',
  'Любимый кот отдыхает дома.',
  'Горная дорога на рассвете.',
  'Яркие огни ночного города.',
  'Выходные за городом.',
  'Солнечный день на пляже.',
  'Чашка кофе для хорошего утра.',
  'Цветы в саду после дождя.',
  'Небольшое путешествие с друзьями.',
  'Красивый вид из окна.',
  'Зимняя прогулка в парке.',
  'Вкусный домашний завтрак.',
  'Старые улицы любимого города.',
  'Закат над спокойным озером.',
  'День, который хочется запомнить.',
  'Лёгкий ветер и хорошее настроение.',
  'Встреча с близкими людьми.',
  'Красота природы без фильтров.',
  'Новая точка на карте путешествий.',
  'Вечерняя прогулка у реки.',
  'Момент полного спокойствия.',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS_COUNT = 25;

const generatePhotoId = createUniqueRandomIntegerGenerator(
  1,
  DESCRIPTIONS_COUNT
);

const generatePhotoNumber = createUniqueRandomIntegerGenerator(
  1,
  DESCRIPTIONS_COUNT
);

// Максимум 25 фотографий по 30 комментариев — 750 уникальных id.
const generateCommentId = createUniqueRandomIntegerGenerator(
  1,
  DESCRIPTIONS_COUNT * 30
);

const createComment = () => {
  let message = MESSAGES[getRandomInteger(0, MESSAGES.length - 1)];

  // Случайным образом добавляем второе сообщение.
  if (getRandomInteger(1, 2) === 2) {
    message = `${message} ${MESSAGES[getRandomInteger(0, MESSAGES.length - 1)]}`;
  }

  return {
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: message,
    name: NAMES[getRandomInteger(0, NAMES.length - 1)],
  };
};

const createDescription = () => {
  const pictureDescription = {
    id: generatePhotoId(),
    url: `photos/${generatePhotoNumber()}.jpg`,
    description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
    likes: getRandomInteger(15, 200),
    comments: Array.from({ length: getRandomInteger(0, 30) }, createComment),
  };

  return pictureDescription;
};

const createDescriptions = () => Array.from(
  { length: DESCRIPTIONS_COUNT },
  createDescription
);

export {createDescriptions};
