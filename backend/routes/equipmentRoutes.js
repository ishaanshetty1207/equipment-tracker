const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

const path = require("path");
const dataPath = path.join(__dirname, "../data/equipment.json");


// helper functions
const readData = () => {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};

const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// GET all equipment
router.get("/", (req, res) => {
  const data = readData();
  res.json(data);
});

// ADD new equipment
router.post("/", (req, res) => {
  const data = readData();
  const newEquipment = {
    id: uuidv4(),
    ...req.body,
  };
  data.push(newEquipment);
  writeData(data);
  res.status(201).json(newEquipment);
});

// UPDATE equipment
router.put("/:id", (req, res) => {
  let data = readData();
  data = data.map((item) =>
    item.id === req.params.id ? { ...item, ...req.body } : item
  );
  writeData(data);
  res.json({ message: "Equipment updated" });
});

// DELETE equipment
router.delete("/:id", (req, res) => {
  const data = readData().filter(
    (item) => item.id !== req.params.id
  );
  writeData(data);
  res.json({ message: "Equipment deleted" });
});

module.exports = router;
