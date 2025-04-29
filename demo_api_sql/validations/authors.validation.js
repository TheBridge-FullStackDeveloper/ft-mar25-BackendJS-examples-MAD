const { body, param } = require('express-validator');

const validateGetAuthors = [
    param('email')
        .optional()
        .isEmail().withMessage('Email must be valid'),
];

const validateCreateAuthor = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string'),
    body('surname')
        .notEmpty().withMessage('Surname is required')
        .isString().withMessage('Surname must be a string'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email must be valid'),
    body('image')
        .optional()
        .isURL().withMessage('Image must be a valid URL'),
];

const validateUpdateAuthor = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string'),
    body('surname')
        .notEmpty().withMessage('Surname is required')
        .isString().withMessage('Surname must be a string'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email must be valid'),
    body('image')
        .optional()
        .isURL().withMessage('Image must be a valid URL'),
    body('old_email')
        .notEmpty().withMessage('Old email is required')
        .isEmail().withMessage('Old email must be valid'),
];

const validateDeleteAuthor = [
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email must be valid'),
];

module.exports = {
    validateGetAuthors,
    validateCreateAuthor,
    validateUpdateAuthor,
    validateDeleteAuthor,
};
