const express = require("express");
const router = express.Router();
const Contacts = require("../../model/index");
const validate = require("../../service/validation");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    return res.json({
      status: "Success",
      code: 200,
      message: "Contacts found",
      data: {
        contacts,
      },
    });
  } catch (e) {
    next(e);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId);
    if (contact) {
      return res.json({
        status: "Success",
        code: 200,
        message: "Contact found",
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "Error",
        code: 404,
        message: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
});

router.post("/", validate.createContact, async (req, res, next) => {
  const newContact = await req.body;

  try {
    if (!newContact.name || !newContact.email || !newContact.phone) {
      return res.status(400).json({
        status: "Error",
        code: 400,
        message: "missing required name field.",
      });
    }
    await Contacts.addContact(req.body);
    res.status(201).json({
      status: "Success",
      code: 201,
      message: "Contact successfully created",
      data: {
        newContact,
      },
    });
  } catch (e) {
    next(e);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId);

    if (contact) {
      Contacts.removeContact(req.params.contactId);
      return res.json({
        status: "Success",
        code: 200,
        message: "Contact deleted",
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "Error",
        code: 404,
        message: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
});

router.put("/:contactId", validate.updateContact, async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId);

    if (contact) {
      Contacts.updateContact(req.params.contactId, req.body);
      return res.json({
        status: "Success",
        code: 200,
        message: "Contact updated successfully",
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "Error",
        code: 404,
        message: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
