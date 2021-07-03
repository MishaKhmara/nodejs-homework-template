const mongoose = require('mongoose');
const { Schema, model, SchemaTypes } = mongoose;

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    required: [true, 'This field is required'],
  },
  phone: {
    type: String,
    required: [true, 'This field is required'],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: 'user',
  },
});

const Contact = model('contact', contactSchema);

module.exports = Contact;
