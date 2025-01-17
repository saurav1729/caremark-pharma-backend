const { ApiError } = require('../util/error/ApiError');
const ContactUs = require('../models/contact');
const contact = require('../models/contact');


const getAllcontacts  = async(req,res, next)=>{
   try{
    const data = await contact.find({});
    console.log(data); 
    if(!data){
      throw new ApiError(400, 'data not found'); 
    } 

    res.status(200).json({
      success: true, 
      message: "all contact info are fetched successfully",
      data:data

    });

   }catch(err){
    next(new ApiError(err.statusCode || 500, err.message || 'Failed to fetch contact informations', error.errors));
   }
}

const submitContactForm = async (req, res, next) => {
  try {
    const { name, phoneNumber, email, message } = req.body;

    if (!name || !phoneNumber || !email || !message) {
      throw new ApiError(400, 'All fields are required');
    }

    const contactForm = await ContactUs.create({
      name,
      phoneNumber,
      email,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully',
      data: contactForm
    });
  } catch (error) {
    next(new ApiError(error.statusCode || 500, error.message || 'Failed to submit contact form', error.errors));
  }
};


module.exports ={submitContactForm, getAllcontacts}; 
