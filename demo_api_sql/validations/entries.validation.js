const { body, param, query } = require('express-validator');

const validateGetEntries = [
    query('email')
        .optional()
        .isEmail().withMessage('Email must be valid'),
];

const validateCreateEntry = [
    body('title')
        .notEmpty().withMessage('Title is required')
        .isString().withMessage('Title must be a string'),
    body('content')
        .notEmpty().withMessage('Content is required')
        .isString().withMessage('Content must be a string'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email must be valid'),
    body('category')
        .notEmpty().withMessage('Category is required')
        .isString().withMessage('Category must be a string'),
];

const validateUpdateEntry = [
    body('title')
        .notEmpty().withMessage('Title is required')
        .isString().withMessage('Title must be a string'),
    body('content')
        .notEmpty().withMessage('Content is required')
        .isString().withMessage('Content must be a string'),
    body('date')
        .notEmpty().withMessage('Date is required')
        .isISO8601().withMessage('Date must be in ISO8601 format'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email must be valid'),
    body('category')
        .notEmpty().withMessage('Category is required')
        .isString().withMessage('Category must be a string'),
    body('old_title')
        .notEmpty().withMessage('Old title is required')
        .isString().withMessage('Old title must be a string'),
];

const validateDeleteEntry = [
    body('title')
        .notEmpty().withMessage('Title is required')
        .isString().withMessage('Title must be a string'),
];

module.exports = {
    validateGetEntries,
    validateCreateEntry,
    validateUpdateEntry,
    validateDeleteEntry,
};
