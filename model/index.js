const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const file = await fs.readFile(contactsPath);
    const data = JSON.parse(file);
    return data;
  } catch (error) {
    if (error.code === "ENOENT") {
      error.message = "Неправильное имя или путь к файлу";
    }
    if (error.message.includes("Unexpected token")) {
      error.message = "Неправильный формат JSON-файла";
    }

    throw new Error(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const idData = contacts.find((item) => item.id == contactId);
    return idData;
  } catch (error) {
    throw new Error(error.message);
  }
};

// const removeContact = async (contactId) => {
//   try {
//     const contacts = await listContacts();
//     const newData = contacts.filter(({ id }) => id.toString() !== contactId);
//     const dataString = JSON.stringify(newData);
//    await fs.writeFile(contactsPath, dataString);
//   } catch (error) {
//     throw error;
//   }
// };

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = { id: v4(), ...body };

    contacts.push(newContact);

    const dataString = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, dataString);
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();

  const index = contacts.findIndex(({ id }) => id.toString() === contactId);
  if (index === -1) return;
  contacts[index] = { ...contacts[index], ...body };
  const dataString = JSON.stringify(contacts);
  await fs.writeFile(contactsPath, dataString);
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
