const asyncHandler = require('express-async-handler')
const Project = require('../models/projectModel')
const Task = require('../models/taskModel')
const Note = require("../models/noteModel")

//get all projects of user

exports.get_all_projects = asyncHandler(async(req, res) => {
    const _id = req.params.userId
    const projects = await Project.find({ user: _id })
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
    const { name, user } = req.body
    const newProject = await Project.create( {name, user} )
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
    console.log("creating new task...")
    const {name, details, important, date, project} = req.body
    const projectToUpdate = await Project.findById(project)
    if(!projectToUpdate){
        return res.status(500).json({error: "Project doesnt exist"})
    }
    try{
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
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
    

})

//delete a task

exports.delete_task = asyncHandler(async(req, res) => {
    //find project and delete task from taskList array
    const { projId, taskId } = req.params
    console.log("deleting task...")
    const project = await Project.findById(projId)
    const newTaskList = project.taskList.filter(task => {
        return task._id.toString() !== taskId
    })
    project.taskList = newTaskList
    const updatedProject = await project.save()

    //find task and remove from tasks collection
    // const task = await Task.findOneAndDelete({_id: req.params.taskId})
    res.status(200).json(updatedProject)
})

//update task

exports.update_task = asyncHandler(async(req, res) => {
    console.log("editing task...", req.body, req.params)
    const {taskId, projId} = req.params
    try{
        if(!req.body.name){
            throw Error('Must enter a name')
        }
        const project = await Project.findById(projId)
        // const task = await Task.findById(taskId)

        // const updatedTask = {...req.body}
        const updatedTask = await Task.findByIdAndUpdate(taskId, {...req.body }, {new: true})
        
        console.log('updated task: ', updatedTask)
        const updatedTaskList = project.taskList.map(task => {
            return task._id.toString() === taskId ? {...req.body} : task
        })
    
        project.taskList = updatedTaskList;
    
        // await task.save()
        await project.save()
    
        console.log('task edited and project updated!: ', project)
        res.status(200).json(project)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
})

exports.get_notes = asyncHandler(async (req, res) => {
    console.log("DEBUG: Get notes request made")
    try{
        const notes = await Note.find({user: req.params.userId})
        res.status(200).json(notes)
    }
    catch(err){
        res.status(500).json(err.message)
    }
})

exports.post_note = asyncHandler(async(req, res) => {
    console.log("DEBUG: Post note request made")
    const { name, body, user } = req.body
    try{
        const newNote = await Note.create({ name, body, user })
        res.status(200).json(newNote)
    }
    catch(err){
        res.status(500).json({ error: err.message })
    }
})

exports.edit_note = asyncHandler(async(req, res) => {
    const id = req.params.id
    const { name, body, user } = req.body
    try{
        const note = await Note.findById(id)
        // for(let k in req.body){note[k] = req.body[k]}
        // console.log('DEBUG: heres the note: ', note)
        // await note.save()
        note.name = name
        note.body = body
        await note.save()
        console.log(' ok heres the note: ', note)
        res.status(200).json(note)
    }
    catch(err){
        res.status(500).json({ error: err.message }) 
    }
    
})

exports.delete_note = asyncHandler(async(req, res) => {
    const id = req.params.id
    try{
        const deletedNote = await Note.findByIdAndDelete(id)
        res.status(200).json(deletedNote)
    } 
    catch(err){
        res.status(500).json({ error: err.message })
    }

})