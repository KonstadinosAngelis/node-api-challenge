const express = (require('express'))
const actionsDB = (require('../data/helpers/actionModel'))

const router = express.Router();

router.post('/:id', IdChecker, postBodyChecker, (req, res) => {
  const post = {...req.body, project_id: req.params.id}
  actionsDB.insert(post)
  .then(result => {
    res.status(201).json({successMessage: "Created action"})
  })
  .catch(error => {
    res.status(500).json({errorMessage: "Something is wrong with the server"})
  })
})

router.get('/', (req, res) => {
  actionsDB.get()
  .then(result => {
    res.status(200).json(result)
  })
  .catch(error => {
    res.status(500).json({errorMessage: "Something is wrong with the server"})
  })
})

router.get('/:id', IdChecker, (req, res) => {
  actionsDB.get(req.params.id)
  .then(result => {
    res.status(200).json(result)
  })
  .catch(error => {
    res.status(500).json({errorMessage: "Something is wrong with the server"})
  })
})

router.delete('/:id', IdChecker, (req, res) => {
  actionsDB.remove(req.params.id)
  .then(result => {
    res.status(200).json({successMessage: "Marked that action as completed!"})
  })
  .catch(error => {
    res.status(500).json({errorMessage: "Something is wrong with the server"})
  })
})

router.put('/:id', IdChecker, (req, res) => {
  actionsDB.update(req.params.id, req.body)
  .then(result => {
    res.status(200).json({successMessage: "Changed the action"})
  })
  .catch(error => {
    res.status(500).json({errorMessage: "Something is wrong with the server"})
  })
})

//custom middleware

function IdChecker(req, res, next){
  actionsDB.get(req.params.id)
  .then(project => {
    if(project === null){
      res.status(404).json({errorMessage: "That action does not exist"})
    } else {
    next();
    }
  })
  .catch(err => {
    res.status(500).json({errorMessage: "Something is wrong with the server"})
  })
}

function postBodyChecker(req, res, next){
  Object.keys(req.body).length === 0 ? res.status(400).json({errorMessage: "Please enter both a description and notes. Completed is optional"}) :
  Object.keys(req.body).length === 1 ? res.status(400).json({errorMessage: "Please enter both a description and notes. Completed is optional"}) :
  req.body.description.length > 128 ? res.status(400).json({errorMessage: "Description can not be longer than 128 characters"}) :
  next();
}
module.exports = router