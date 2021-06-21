const { model } = require("mongoose");

const { contactsSchema } = require("./schemas/contact");

const Contact = model("author", contactsSchema);

module.exports = Contact;
