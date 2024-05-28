const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS middleware
const dotenv = require('dotenv');

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3003;

// Connect to MongoDB
mongoose.connect('mongodb+srv://khamareclarke:khamareclarke@cluster0.tdxrvkr.mongodb.net', {
  
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

// Define a schema for the data
const formDataSchema = new mongoose.Schema({
  name: String,
  contactNumber: String,
  email: String
});

// Define a schema for the contact form data
const contactFormSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  phone: Number,
  message: String,
  terms_and_policy: Boolean
});

// Create a model based on the schema
const FormData = mongoose.model('FormData', formDataSchema);
// Create a model based on the contact form schema
const ContactForm = mongoose.model('ContactForm', contactFormSchema);

// Middleware to parse JSON bodies
app.use(express.json());

// Add CORS middleware to allow requests from all origins
app.use(cors());
app.get('/', async (req, res) => {
res.send('Server is Running');
});
// Route to handle form submission
app.post('/submit', async (req, res) => {
  try {
    // Create a new FormData document with the submitted data
    const formData = new FormData({
      name: req.body.name,
      contactNumber: req.body.contactNumber,
      email: req.body.email
    });

    // Save the document to the database
    await formData.save();

    res.json({ success: true, message: 'Form data saved successfully' });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ success: false, message: 'Error saving form data' });
  }
});

// Route to handle contact form submission
app.post('/submitContactForm', async (req, res) => {
  try {
    // Create a new ContactForm document with the submitted data
    const contactForm = new ContactForm({
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      phone: req.body.phone,
      message: req.body.message,
      terms_and_policy: req.body.terms_and_policy
    });

    // Save the document to the database
    await contactForm.save();

    res.json({ success: true, message: 'Contact form data saved successfully' });
  } catch (error) {
    console.error("Error saving contact form data:", error);
    res.status(500).json({ success: false, message: 'Error saving contact form data' });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
