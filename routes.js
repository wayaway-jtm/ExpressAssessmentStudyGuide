//import { isNull, isNullOrUndefined, isUndefined } from 'util';
const util = require('util');
const express = require('express');
const routes = express.Router();

let students = [{
        id: 1,
        firstName: "Obi-wan",
        lastName: "Kenobi"
    },
    {
        id: 2,
        firstName: "Boba",
        lastName: "Fett"
    },
    {
        id: 3,
        firstName: "Luke",
        lastName: "Skywalker"
    },
    {
        id: 4,
        firstName: "Anakin",
        lastName: "Skywalker"
    },
    {
        id: 5,
        firstName: "Jango",
        lastName: "Fett"
    }
]

let nextId = students.length;

routes.get('/students', (req, res) => {
    res.status(200).json(students);
});

routes.get('/students/:id', (req, res) => {
    let targetId = parseInt(req.params.id);
    let foundStudent = false;
    for (const student of students) {
        if (student.id == targetId) {
            foundStudent = true;
            res.status(200).json(students[targetId]);
        }
    }
    if (!foundStudent) {
        res.status(404).json(`Student with id ${req.params.id} not found`);
    }
});

routes.get('/students/lastname/:lastname', (req, res) => {
    let resArray = [];
    for (const student of students) {
        if (student.lastName.toString().toLowerCase() == req.params.lastname.toLowerCase()) {
            resArray.push(student);
        }
    }
    if (resArray.length > 0) {
        res.status(200);
    } else {
        res.status(404);
    }
    res.json(resArray);
});

routes.put('/students/:id', (req, res) => {
    let targetId = req.params.id;
    if (!util.isUndefined(students[targetId])) {
        let newFirstName = req.body.firstName;
        let newLastName = req.body.lastName;
        if (!util.isNullOrUndefined(newFirstName)) {
            students[targetId].firstName = newFirstName;
        }
        if (!util.isNullOrUndefined(newLastName)) {
            students[targetId].lastName = newLastName;
        }
        res.status(200).json(students[targetId]);
    } else {
        res.status(404).end();
    }
});

routes.post('/students', (req, res) => {
    let newId = nextId++;
    let newFirstName = req.body.firstName;
    let newLastName = req.body.lastName;
    if (!util.isUndefined(students[newId])) {
        res.status(409).end();
    } else if (util.isNullOrUndefined(newId)) {
        res.status(400).json('No ID provided');
    } else if (util.isNullOrUndefined(newFirstName)) {
        res.status(400).json('No first name provided');
    } else if (util.isNullOrUndefined(newLastName)) {
        res.status(400).json('No last name provided');
    } else {
        students[newId] = {
            id: newId,
            firstName: newFirstName,
            lastName: newLastName
        };
        res.status(201).json(students); // for testing
        //res.status(201).end();
    }
});

routes.delete('/students/:id', (req, res) => {
    let targetId = req.params.id;
    if (util.isNullOrUndefined(targetId)) {
        res.status(400).json('No ID provided');
    } else if (util.isNullOrUndefined(students[targetId])) {
        res.status(400).json(`No student found with ID = ${targetId}`);
    } else {
        let deletedStudent = students.splice(targetId - 1, 1);
        res.status(200).json(deletedStudent);
    }
});

module.exports = routes;