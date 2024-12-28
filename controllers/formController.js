const FormData = require("../models/Form");

const submitForm = async (req, res) => {
  try {
    const formData = new FormData(req.body); // Create a new instance with the data from the frontend

    // Save the form data to MongoDB
    const savedData = await formData.save();

    // Send a success response
    res.status(201).json({
      message: 'Form submitted successfully',
      data: savedData,
    });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ message: 'Failed to submit form' });
  }
};

module.exports = {
  submitForm,
};
