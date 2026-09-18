/* 1) Функция для проверки длины строки. Она принимает строку, которую нужно проверить,
и максимальную длину и возвращает true, если строка меньше
или равна указанной длине, и false, если строка длиннее */

function checkStringLenght(string, maxLenght) {
  return string.length <= maxLenght;
}

/* 2)Функция для проверки, является ли строка палиндромом ,c пробелами */

function checkIfPalindrome (string) {
  string = string.replaceAll(' ', '').toUpperCase();
  let newString = '';
  for (let i = string.length - 1; i >= 0; i = i - 1) {
    newString += string[i];
  }
  return newString === string;
}

/*3)Функция принимает строку, извлекает содержащиеся
в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
Если в строке нет ни одной цифры, функция должна вернуть NaN */

function extractNumber(value) {
  let newValue = '';
  if (typeof value !== 'string') {
    value = value.toString();
  }
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

checkStringLenght('Hello', 10); // true
checkIfPalindrome('A man a plan a canal Panama'); // true
extractNumber('abc123def'); // 123
