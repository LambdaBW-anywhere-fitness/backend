const express = require('express');
const Classes = require('../classes/classModel');

const router = express.Router();

//getClasses --> get a list of all 'classes' --> from endpoint --> /api/classes
router.get('/', (req, res) => {
  Classes.getClasses()
    .then(activity => {
      console.log('inside getClasses', activity);
      res.status(200).json(activity);
    })
    .catch(error => {
      console.log('inside getClasses error', error);
      res.status(500).json({ message: 'Sorry, no classes return from the server', error });
    });
});

//getClassById --> gets a list a single 'class' by 'id' --> from endpoint --> /api/classes/:id

module.exports = router;
