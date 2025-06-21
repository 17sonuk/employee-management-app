const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

// Home Route - List Employees
router.get('/', async (req, res) => {
  const employees = await Employee.find();
  res.render('index', { employees });
});

// Add Employee Form
router.get('/add', (req, res) => {
  res.render('addEmployee');
});

// Add Employee
router.post('/add', async (req, res) => {
  const { name, position, department, salary } = req.body;
  const newEmployee = new Employee({ name, position, department, salary });
  await newEmployee.save();
  res.redirect('/');
});

// Edit Employee Form
router.get('/edit/:id', async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  res.render('editEmployee', { employee });
});

// Update Employee
router.post('/edit/:id', async (req, res) => {
  const { name, position, department, salary } = req.body;
  await Employee.findByIdAndUpdate(req.params.id, { name, position, department, salary });
  res.redirect('/');
});

// Delete Employee
router.get('/delete/:id', async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

module.exports = router;
