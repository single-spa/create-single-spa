const BEGIN_WITH_LETTER = /^[a-z]/;
const ALLOWED_CHARACTERS = /^[a-z0-9\-]+$/;

module.exports = function validateNaming(input) {
  input = input && input.trim();
  if (!input) {
    return `Cannot be empty!`;
  } else if (!BEGIN_WITH_LETTER.test(input)) {
    return `Must begin with a letter`;
  } else if (!ALLOWED_CHARACTERS.test(input)) {
    return `May only use lowercase letters, numbers, underscores, or dashes!`;
  } else {
    return true;
  }
};
