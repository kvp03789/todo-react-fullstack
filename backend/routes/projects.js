const express = require('express');
const router = express.Router()
const {
    get_all_projects,
    get_single_project,
    create_new_project,
    delete_project,
    update_project,
    get_single_task,
    create_new_task,
    delete_task,
    update_task
} = require('../controllers/projectController')
const requireAuth = require('../middleware/requireAuth')

//middleware to require auth to all routes
router.use(requireAuth)

//GET all projects of user
router.get("/:userId", get_all_projects)

//GET single project
router.get("/:id", get_single_project)

//POST new project
router.post("/", create_new_project)

//DELETE single project
router.delete("/:id", delete_project)

//UPDATE single project
router.patch("/:id", update_project)

//GET single task on a project
router.get("/:id/tasks/:id", get_single_task)

//POST single task on a project's task list
router.post("/:projId/tasks", create_new_task)

//DELETE task
router.delete("/:projId/tasks/:taskId", delete_task)

//edit task
router.patch("/:projId/tasks/:taskId", update_task)

module.exports = router