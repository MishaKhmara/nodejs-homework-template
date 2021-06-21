const getOne = async (contactId) => {
  try {
    const contacts = await listContacts();
    const idData = contacts.find((item) => item.id == contactId);
    return idData;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = getOne;
