const express = require('express');
const router = express.Router()
const Project = require('../models/projectModel')
const Task = require('../models/taskModel')

//GET all projects
router.get("/", (req, res) => {
    res.json({message: "GET all projects"})
})

//GET single project
router.get("/:id", (req, res) => {
    res.json({message: "GET single project"})
})

//POST new project
router.post("/", async (req, res) => {
    const name = req.body.name
    try{
        const newProject = await Project.create( {name} )
        res.status(200).json(newProject)
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
})

//DELETE single project
router.delete("/:id", (req, res) => {
    res.json({message: "DELETE single project"})
})

//UPDATE single project
router.patch("/:id", (req, res) => {
    res.json({message: "UPDATE single project"})
})

//GET single task on a project
router.get("/:id/tasks/:id", (req, res) => {
    res.json({message: "GET single task in a project"})
})

//POST single task on a project's task list
router.post("/:projId/tasks", async (req, res) => {

    const {name, details, important} = req.body
    const project = req.params.projId

    try{
        const newTask = {
            name, details, important, project
        }

        await Task.create(newTask)

        await Project.updateOne(
            {_id: project},
            {$push: {taskList: newTask }}
        )
        
        
        res.status(200).json(newTask)

    }
    catch(err){
        res.status(400).json({error: err.message})
    }
})

router.delete("/:projId/tasks/:taskId", async(req, res) => {
    try{
        //find project and delete task from taskList array
        // const project = await Project.findById(req.params.projId)
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.projId,
            {$pull: {taskList: {_id: req.params.taskId}}}, {new: true}
        )

        //find task and remove from tasks collection
        const task = await Task.findOneAndDelete({_id: req.params.taskId})
        res.status(200).json({task, updatedProject})
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
})

module.exports = router