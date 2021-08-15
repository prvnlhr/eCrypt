const { check } = require("express-validator");

const formValidators = {
  validateRegister: [
    check("name", "Name is required")
      .isEmpty()
      .isLength({
        min: 4,
        max: 32,
      })
      .withMessage("Name must be between 3 to 32 characters"),
    check("email").isEmpty().withMessage("Must be a valid email address"),
    check("password", "password is required").notEmpty(),
    check("password")
      .isLength({
        min: 6,
      })
      .withMessage("Password must contain at least 6 characters")
      .matches(/\d/)
      .withMessage("Password must contain a number"),
  ],

  validateLogin: [
    check("email").isEmail().withMessage("Must be a valid email address"),
    check("password", "password is required").notEmpty(),
    check("password")
      .isLength({
        min: 6,
      })
      .withMessage("Password must contain at least 6 characters")
      .matches(/\d/)
      .withMessage("Password must contain a number"),
  ],

  validateForgotPass: [
    check("email")
      .not()
      .isEmpty()
      .isEmail()
      .withMessage("Must be a valid email address"),
  ],
  validateResetPass: [
    check("email")
      .not()
      .isEmpty()
      .isEmail()
      .isLength({
        min: 6,
      })
      .withMessage("Must be a valid email address"),
  ],
};

module.exports = formValidators;
