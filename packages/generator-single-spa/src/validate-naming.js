const BEGIN_WITH_LETTER = /^[a-zA-Z]/;
const ALLOWED_CHARACTERS = /^[a-zA-Z0-9\-]+$/;

module.exports = function validateNaming(input) {
  if (!input) {
    return `Cannot be empty!`;
  } else if (!BEGIN_WITH_LETTER.test(input)) {
    return `Must begin with a letter`;
  } else if (!ALLOWED_CHARACTERS.test(input)) {
    return `May only contain letters, numbers, dash or underscore`;
  } else {
    return true;
  }
};
