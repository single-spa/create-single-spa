const ALLOWED_CHARACTERS = /^[a-zA-Z0-9\-]+$/;

module.exports = function validateCLIVersion(input) {
  if (!input) {
    return `Cannot be empty!`;
  } else if (!ALLOWED_CHARACTERS.test(input)) {
    return `May only contain letters, numbers, dash or underscore`;
  } else {
    return true;
  }
};
