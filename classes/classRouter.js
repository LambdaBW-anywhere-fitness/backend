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
router.get('/:id', (req, res) => {
  const classId = req.params.id;

  Classes.getClassById(classId)
    .then(activity => {
      console.log('inside getClassById', activity);
      if (activity) {
        res.status(200).json(activity);
      } else {
        res.status(401).json({ message: 'Sorry, class with that id not found' });
      }
    })
    .catch(error => {
      console.log('inside getClassById error', error);
      res.status(500).json({ message: 'Sorry, class with that id not returned from the server', error });
    });
});


//PUT Update Class 

router.put('/:id', (req, res) => {
  
  Classes.updateClass(req.params.id, req.body)
    .then(item => {
      res.status(201).json(item)
    }) 
    .catch(err => {
      console.log(err)
      res.status(500).json({message: "something went wrong in the server"})
    })
})


// DELET a Classs

router.delete('/:id', (req, res) => {
  Classes.deleteClass(req.params.id)
  .then(result => {
    res.status(201).json(4)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({message: "Something went wrong in the server"})
  })
})



// GET CLASSS BY USER ID

router.get('/:id/user_classes', (req, res) => {
  Classes.getClassByUserId(req.params.id)
    .then( result => {
      res.status(201).json(result)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: "sorry something is wrong with the server"})
    })
})

module.exports = router;
