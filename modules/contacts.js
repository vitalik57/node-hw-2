const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "../db/contacts.json");
const listContacts = async () => {
  const list = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(list);
};

// function listContacts() {
//   return fs.readFile(contactsPath, "utf-8", (err, data) => {
//     if (err) {
//       console.log(err.message);
//     }
//     return JSON.parse(data);
//   });
// }
const getContactById = async contactId => {
  const list = await fs.readFile(contactsPath, "utf8");
  const findContactById = JSON.parse(list).find(contact => contact.id.toString() === contactId);

  return findContactById;
};
// function getContactById(contactId) {
//   fs.readFile(contactsPath, "utf-8", (err, data) => {
//     if (err) {
//       console.log(err.message);
//     }
//     const findContactBuId = JSON.parse(data).find(contact => contact.id === contactId);
//     console.table(findContactBuId);
//   });
// }
const removeContact = async contactId => {
  const list = await fs.readFile(contactsPath, "utf8");
  const deleteContact = JSON.parse(list).filter(contact => contact.id.toString() !== contactId);
  console.log(list.length, deleteContact.length);
  if (JSON.parse(list).length === deleteContact.length) {
    return `not found id ${contactId}`;
  }
  await fs.writeFile(contactsPath, JSON.stringify(deleteContact));
  return deleteContact;
};
// function removeContact(contactId) {
//   fs.readFile(contactsPath, "utf-8", (err, data) => {
//     if (err) {
//       console.log(err.message);
//     }
//     const deleteContact = JSON.parse(data).filter(contact => contact.id !== contactId);
//     fs.writeFile(contactsPath, JSON.stringify(deleteContact), err => {
//       if (err) {
//         console.log(err.message);
//       }
//     });
//     console.table(deleteContact);
//   });
// }
const addContacts = async (name, email, phone) => {
  const list = await fs.readFile(contactsPath, "utf8");
  const createContact = [...JSON.parse(list), { id: name, email, phone, name }];
  await fs.writeFile(contactsPath, JSON.stringify(createContact));
  return createContact;
};
// function addContacts(name, email, phone) {
//   fs.readFile(contactsPath, "utf-8", (err, data) => {
//     if (err) {
//       console.log(err.message);
//     }
//     const createContact = [...JSON.parse(data), { id: name, email, phone }];
//     fs.writeFile(contactsPath, JSON.stringify(createContact), err => {
//       if (err) {
//         console.log(err.message);
//       }
//     });
//     console.table(createContact);
//   });
// }
const ChangeContacts = async (body, id) => {
  const list = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  const index = list.findIndex(ele => ele.id.toString() === id);
  if (index === -1) {
    return null;
  }
  list[index] = { ...list[index], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(list));
  return list;
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContacts,
  ChangeContacts
};
