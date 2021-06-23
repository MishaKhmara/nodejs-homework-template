const express = require("express");
const router = express.Router();
const Contacts = require("../../controllers/ContactsCtrl");
const validate = require("../../service/validation");

router.get("/", Contacts.listContacts);

router.get("/:contactId", Contacts.getContactById);

router.post("/", validate.createContact, Contacts.addContact);

router.delete("/:contactId", Contacts.removeContact);

router.put("/:contactId", validate.updateContact, Contacts.updateContact);

router.patch("/:contactId/favorite", Contacts.updateStatusContact);

module.exports = router;
