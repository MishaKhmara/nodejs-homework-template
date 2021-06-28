const express = require("express");
const router = express.Router();
const Contacts = require("../../controllers/ContactsCtrl");
const validate = require("../../service/validation");
const Auth = require("./userAuth")

router.get("/", Auth, Contacts.listContacts);

router.get("/:contactId",Auth, Contacts.getContactById);

router.post("/",Auth, validate.createContact, Contacts.addContact);

router.delete("/:contactId",Auth, Contacts.removeContact);

router.put("/:contactId",Auth, validate.updateContact, Contacts.updateContact);

router.patch("/:contactId/favorite",Auth, Contacts.updateStatusContact);

module.exports = router;
