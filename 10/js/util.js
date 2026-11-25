const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

// Создаёт генератор случайных чисел без повторений.
const createUniqueRandomIntegerGenerator = (min, max) => {
  const availableNumbers = [];

  for (let number = min; number <= max; number++) {
    availableNumbers.push(number);
  }

  const getUniqueNumber = () => {

    const randomIndex = getRandomInteger(0, availableNumbers.length - 1);
    const number = availableNumbers[randomIndex];

    availableNumbers.splice(randomIndex, 1);

    return number;
  };

  return getUniqueNumber;
};

export {getRandomInteger, createUniqueRandomIntegerGenerator};
