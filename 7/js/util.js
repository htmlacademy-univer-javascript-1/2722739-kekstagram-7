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

/*function checkStringLenght(string, maxLenght) {
  return string.length <= maxLenght;
}


/*function checkIfPalindrome (string) {
  string = string.replaceAll(' ', '').toUpperCase();
  let newString = '';
  for (let i = string.length - 1; i >= 0; i = i - 1) {
    newString += string[i];
  }
  return newString === string;
}

/*function extractNumber(value) {
  let newValue = '';
  value = value.toString();
  for (let i = 0; i <= value.length; i++ ) {
    if (!isNaN(value[i]) && value[i] !== ' ') {
      newValue += value[i];
    }
  }
  if (newValue === '') {
    return NaN;
  } else {
    return newValue;
  }
}
*/
