const getAll = async () => {
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

module.exports = getAll;
