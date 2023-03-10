const router = require("express").Router();
const { listContacts, getContactById, removeContact, addContacts, ChangeContacts } = require("../modules/contacts");
const validateBody = require("../middlewares/validateBody");
const Joi = require("joi");

const addContactsChema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()
});
const schemaUpdate = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string()
}).or("name", "email", "phone");
router.get("/", async (req, res) => {
  const data = await listContacts();
  res.send(data);
});
router.get("/:id", async (req, res) => {
  console.log(req);
  console.log("====================================");
  console.log(req.params);
  console.log("====================================");
  const data = await getContactById(req.params.id);
  res.send(data);
});
router.post("/", validateBody(addContactsChema), async (req, res) => {
  const { name, email, phone } = req.body;
  const data = await addContacts(name, email, phone);
  res.status(201).send(data);
  //   res.status(207).json({ mesage: `hello ${req.body.name} age:${req.body.age}`, status: "succsess", code: 201 });
});
router.delete("/:id", async (req, res) => {
  const data = await removeContact(req.params.id);

  res.send(data);
});
router.put("/:id", validateBody(schemaUpdate), async (req, res) => {
  const data = await ChangeContacts(req.body, req.params.id);

  res.send(data);
});

module.exports = router;
