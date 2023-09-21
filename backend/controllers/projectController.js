const asyncHandler = require('express-async-handler')
const Project = require('../models/projectModel')
const Task = require('../models/taskModel')

//get all projects

exports.get_all_projects = asyncHandler(async(req, res) => {
    const projects = await Project.find({})
    console.log("PROJECTS: ", projects)
    res.status(200).json(projects)
})

//get single project

exports.get_single_project = asyncHandler(async(req, res) => {
    const { id } = req.params
    const project = Project.findById(id)
    res.status(200).json(project)
})

//create new project

exports.create_new_project = asyncHandler(async(req, res) => {
    const name = req.body.name
    const newProject = await Project.create( {name} )
    res.status(200).json(newProject)
    
})

//delete a project

exports.delete_project = asyncHandler(async(req, res) => {
    const id = req.params.id
    console.log(id)
    const deletedProject = await Project.findByIdAndDelete(id)
    if(deletedProject){
        res.status(200).json({message: "DELETE single project", deletedProject})
    }
    if(!deletedProject){
        res.json({error: 'something went wrong'})
    }
})

//update a project

exports.update_project = asyncHandler(async(req, res) => {
    const { name, _id } = req.body
    const updatedProject = await Project.findOneAndUpdate({ _id }, { name }, {new: true})
    res.json({message: "UPDATE single project", body: updatedProject})
})

//get single task

exports.get_single_task = asyncHandler(async(req, res) => {
    res.json({message: "GET single task in a project"})
})

//create new task

exports.create_new_task = asyncHandler(async(req, res) => {
    const {name, details, important, date, project} = req.body
    // const project = req.params.projId
    const task = {
        name, details, date, important, project
    }

    const newTask = await Task.create(task)

    console.log(newTask)

    const updatedProject = await Project.updateOne(
        {_id: project},
        {$push: {taskList: newTask }}
    )
    console.log(updatedProject) 
    res.status(200).json(newTask)

})

//delete a task

exports.delete_task = asyncHandler(async(req, res) => {
    //find project and delete task from taskList array
    const updatedProject = await Project.findByIdAndUpdate(
        req.params.projId,
        {$pull: {taskList: {_id: req.params.taskId}}}, {new: true}
    )

    //find task and remove from tasks collection
    const task = await Task.findOneAndDelete({_id: req.params.taskId})
    res.status(200).json({task, updatedProject})
})

//update task

exports.update_task = asyncHandler(async(req, res) => {
    const {taskId, projId} = req.params

    const updatedTask = await Task.findOneAndUpdate({ _id: taskId }, { ...req.body }, {new: true})
    
    const updatedProject = await Project.findOneAndUpdate(
        { taskList: { $elemMatch: { _id: taskId } } },
        { ...req.body },
        {new: true}
    )

    res.status(200).json({ updatedTask, updatedProject })
})