const del = async (contactId) => {
  try {
    const contacts = await listContacts();
    const newData = contacts.filter(({ id }) => id.toString() !== contactId);
    const dataString = JSON.stringify(newData);
    await fs.writeFile(contactsPath, dataString);
  } catch (error) {
    throw error;
  }
};

module.exports = del;
