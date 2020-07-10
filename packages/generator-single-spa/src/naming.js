const NAMING_CONVENTION = /^[a-z\-]*$/;

module.exports = function isValidName(name) {
  return NAMING_CONVENTION.test(name);
};
