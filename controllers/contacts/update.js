const update = async (contactId, body) => {
  const contacts = await listContacts();

  const index = contacts.findIndex(({ id }) => id.toString() === contactId);
  if (index === -1) return;
  contacts[index] = { ...contacts[index], ...body };
  const dataString = JSON.stringify(contacts);
  await fs.writeFile(contactsPath, dataString);
  return contacts[index];
};

module.exports = update;
