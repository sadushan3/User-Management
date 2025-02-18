import express from "express";
import EMP from "../model/employee.js"; // Import model

const router = express.Router();

// Create a new employee
router.post("/add", async (req, res) => {
  try {
    const newEMP = new EMP(req.body);
    await newEMP.save();
    res.status(201).json({ message: "Employee added successfully" });
  } catch (err) {
    console.error("Error adding employee:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get all employees
router.get("/", async (req, res) => {
  try {
    const employees = await EMP.find();
    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: error.message });
  }
});

// Get a single employee by ID
router.get("/:id", async (req, res) => {
  try {
    const employee = await EMP.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (error) {
    console.error("Error fetching employee by ID:", error);
    res.status(500).json({ message: error.message });
  }
});

// Update an employee by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedEmployee = await EMP.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEmployee) return res.status(404).json({ message: "Employee not found" });
    res.json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: error.message });
  }
});

// Delete an employee by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedEmployee = await EMP.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
