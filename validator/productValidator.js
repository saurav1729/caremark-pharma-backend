// const { body } = require('express-validator');

// const validateProduct = [
//     body.product('name')
//         .isString().withMessage('Name must be a string.')
//         .notEmpty().withMessage('Name is required.'),
    
//     body.product('manufacturer')
//         .isString().withMessage('Manufacturer must be a string.')
//         .notEmpty().withMessage('Manufacturer is required.'),
    
//     body.product('composition')
//         .isString().withMessage('Composition must be a string.')
//         .notEmpty().withMessage('Composition is required.'),
    
//     body('price')
//         .isObject().withMessage('Price must be an object.')
//         .bail()
//         .custom((value) => {
//             if (value.original == null || value.discounted == null) {
//                 throw new Error('Original and discounted price are required.');
//             }
//             if (typeof value.original !== 'number' || typeof value.discounted !== 'number') {
//                 throw new Error('Price values must be numbers.');
//             }
//             return true;
//         }),
    
//     body('price.original')
//         .isNumeric().withMessage('Original price must be a number.')
//         .notEmpty().withMessage('Original price is required.'),
    
//     body('price.discounted')
//         .isNumeric().withMessage('Discounted price must be a number.')
//         .notEmpty().withMessage('Discounted price is required.'),
    
//     body('price.discount_percentage')
//         .isInt({ min: 0, max: 100 }).optional()
//         .withMessage('Discount percentage must be between 0 and 100.'),
    
//     body('price.includes_taxes')
//         .isBoolean().withMessage('Include taxes must be a boolean.')
//         .notEmpty().withMessage('Include taxes field is required.'),
    
//     body('package_size')
//         .isString().withMessage('Package size must be a string.')
//         .notEmpty().withMessage('Package size is required.'),
    
//     body('stock_quantity')
//         .isInt({ min: 0 }).withMessage('Stock quantity must be a positive integer.')
//         .notEmpty().withMessage('Stock quantity is required.'),
    
//     body('availability')
//         .isIn(['in stock', 'out of stock']).withMessage('Availability must be "in stock" or "out of stock".')
//         .notEmpty().withMessage('Availability is required.'),
    
//     body('description.short')
//         .isString().withMessage('Short description must be a string.')
//         .notEmpty().withMessage('Short description is required.'),
    
//     body('description.long')
//         .isString().withMessage('Long description must be a string.')
//         .notEmpty().withMessage('Long description is required.'),
    
//     body('usage.dosage')
//         .isString().withMessage('Dosage must be a string.')
//         .notEmpty().withMessage('Dosage is required.'),
    
//     body('usage.instructions')
//         .isString().withMessage('Instructions must be a string.')
//         .notEmpty().withMessage('Instructions are required.'),
    
//     body('usage.side_effects')
//         .isString().withMessage('Side effects must be a string.')
//         .notEmpty().withMessage('Side effects are required.'),
    
//     body('usage.precautions')
//         .isString().withMessage('Precautions must be a string.')
//         .notEmpty().withMessage('Precautions are required.'),
    
//     body('storage')
//         .isString().withMessage('Storage information must be a string.')
//         .notEmpty().withMessage('Storage information is required.'),
    
//     body('manufacturer_details.name')
//         .isString().withMessage('Manufacturer name must be a string.')
//         .notEmpty().withMessage('Manufacturer name is required.'),
    
//     body('manufacturer_details.address')
//         .isString().withMessage('Manufacturer address must be a string.')
//         .notEmpty().withMessage('Manufacturer address is required.'),
    
//     body('manufacturer_details.license')
//         .isString().withMessage('Manufacturer license must be a string.')
//         .notEmpty().withMessage('Manufacturer license is required.'),
    
//     body('batch_info.number')
//         .isString().withMessage('Batch number must be a string.')
//         .notEmpty().withMessage('Batch number is required.'),
    
//     body('batch_info.manufacturing_date')
//         .isDate().withMessage('Manufacturing date must be a valid date.')
//         .notEmpty().withMessage('Manufacturing date is required.'),
    
//     body('batch_info.expiry_date')
//         .isDate().withMessage('Expiry date must be a valid date.')
//         .notEmpty().withMessage('Expiry date is required.'),
    
//     body('prescription_required')
//         .isBoolean().withMessage('Prescription required must be a boolean value.')
//         .notEmpty().withMessage('Prescription required is required.'),
    
//     body('marketing.company')
//         .isString().withMessage('Marketing company must be a string.')
//         .notEmpty().withMessage('Marketing company is required.'),
    
//     body('marketing.address')
//         .isString().withMessage('Marketing address must be a string.')
//         .notEmpty().withMessage('Marketing address is required.'),
    
//     body('images')
//         .isArray().withMessage('Images must be an array of strings.')
//         .custom((value) => {
//             if (!value.every(url => typeof url === 'string' && url.startsWith('http'))) {
//                 throw new Error('Each image must be a valid URL.');
//             }
//             return true;
//         }).withMessage('Images must contain valid URLs.')
// ];

// module.exports = { validateProduct };
