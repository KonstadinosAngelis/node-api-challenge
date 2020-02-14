const express = (require('express'))
const projectDB = (require('../data/helpers/projectModel'))

const router = express.Router();

router.post('/', postBodyChecker, (req, res) => {
  console.log(req.body)
  projectDB.insert(req.body)
  .then(result => {
    res.status(201).json({successMessage: "Created user"})
  })
  .catch(error => {
    res.status(500).json({errorMessage: "Something is wrong with the server"})
  })
})

router.get('/', (req, res) => {
  projectDB.get()
  .then(result => {
    res.status(200).json(result)
  })
  .catch(error => {
    res.status(500).json({errorMessage: "Something is wrong with the server"})
  })
})

router.get('/:id', IdChecker, (req, res) => {
  projectDB.get(req.params.id)
  .then(result => {
    res.status(200).json(result)
  })
  .catch(error => {
    res.status(500).json({errorMessage: "Something is wrong with the server"})
  })
})

router.get('/:id/actions', IdChecker, (req, res) => {
  projectDB.getProjectActions(req.params.id)
  .then(result => {
    if(result.length === 0){
      res.status(200).json({successMessage: "There are no actions on the project yet"})
    } else {
    res.status(200).json(result)
    }
  })
  .catch(error => {
    res.status(500).json({errorMessage: "Something is wrong with the server"})
  })
})

router.delete('/:id', IdChecker, (req, res) => {
  projectDB.remove(req.params.id)
  .then(result => {
    res.status(200).json({successMessage: "Succesfully deleted that user"})
  })
  .catch(error => {
    res.status(500).json({errorMessage: "Something is wrong with the server"})
  })
})

router.put('/:id', IdChecker, (req, res) => {
  projectDB.update(req.params.id, req.body)
  .then(result => {
    res.status(200).json({successMessage: "Succesfully editted that user"})
  })
  .catch(error => {
    res.status(500).json({errorMessage: "Something is wrong with the server"})
  })
})

//custom middleware

function IdChecker(req, res, next){
  projectDB.get(req.params.id)
  .then(project => {
    if(project === null){
      res.status(404).json({errorMessage: "That post does not exist"})
    } else {
    next();
    }
  })
  .catch(err => {
    res.status(500).json({errorMessage: "Something is wrong with the server"})
  })
}

function postBodyChecker(req, res, next){
  Object.keys(req.body).length === 0 || 1 ? res.status(400).json({errorMessage: "Please enter a name, and description. Completed is optional"}) :
  next();
}

module.exports = router