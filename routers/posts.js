const express = require("express")

const validationParamId = require("../middlewares/validationParamId");
const postController = require("../controllers/postsController");

const router = express.Router()

//index
router.get('/', postController.index);

// show
router.get('/:id', validationParamId, postController.show);

// create
router.post('/', postController.create);

// update
router.put('/:id', validationParamId, postController.update)

//modify
router.patch('/:id', validationParamId, postController.modify)

//delete
router.delete('/:id', validationParamId, postController.destroy)

module.exports = router;