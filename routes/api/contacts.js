const express = require("express");
const router = express.Router();
const Contacts = require("../../model/index");

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

router.post("/", async (req, res, next) => {
  const newContact = await req.body;
  console.log(newContact);
  try {
    if (!newContact.name || !newContact.email || !newContact.phone) {
      return res.status(400).json({
        status: "Error",
        code: 400,
        message: "missing required name field.",
      });
    }

    const contact = await Contacts.addContact(req.body);
    res.status(201).json({
      status: "Success",
      code: 201,
      message: "Contact successfully created",
      data: {
        result: contacts,
      },
    });
  } catch (e) {
    next(e);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId);
    if (contact) {
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

// router.delete("/:contactId", async (req, res, next) => {
//   const contact = await req.params.contactId;

//   if (contact) {
//     Contacts.removeContact(contact);
//     return res.json({
//       status: "Success",
//       code: 200,
//       message: "contact deleted",
//       data: {
//         contact,
//       },
//     });
//   } else {
//     return res.status(404).json({
//       status: "Error",
//       code: 404,
//       message: "Not Found",
//     });
//   }
// });

router.patch("/:contactId", async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: "Error",
        code: 400,
        message: "Bad request",
      });
    }
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body
    );
    if (contact) {
      return res.json({
        status: "Success",
        code: 200,
        message: "Contact updated successfully",
        data: {
          contacts,
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
