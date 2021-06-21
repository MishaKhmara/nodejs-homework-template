const add = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = { ...body };

    contacts.push(newContact);

    const dataString = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, dataString);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = add;
