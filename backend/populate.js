#! /usr/bin/env node
require('dotenv').config()

console.log(
    'This script populates some test projects and tasks to the database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
//   const userArgs = process.argv.slice(2);
  
  const Project = require("./models/projectModel");
  const Task = require("./models/taskModel")
  const User = require("./models/userModel")

  
  const projectsArray = [];
  const tasksArray = [];
  const usersArray = [];
 
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
//   const mongoDB = userArgs[0];
    const mongoDb = process.env.MONGO_URI
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDb);
    console.log("Debug: Should be connected?");
    await deleteAll();
    await createUsers();  
    await createProjects();
    await createTasks();
      
    await updateProjects()

    
    
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }

  async function updateProjects() {
    const project = await Project.findById(projectsArray[1]._id.toString())
    console.log("DEBUG: project", project)
    const newTaskList = tasksArray.map(task => {
      console.log(`DEBUG: task.project: ${task.project} ---- proj._id: ${project._id}`)
      console.log(`DEBUG: ${task.project === project._id.toString()}`)
      if(task.project === project._id.toString()){
        return task
      }
    })

    project.taskList = newTaskList
    await project.save()

  }

  async function userCreate(index, email, password) {
    // const user = new User({ email, password })
    // await user.save()
    const user = await User.signup(email, password)
    usersArray[index] = user
    console.log(`Added user: ${email}`);
  }
  
  async function projectCreate(index, name) {
    
    const project = new Project({ name, user: usersArray[2]._id });
    await project.save();
    projectsArray[index] = project;
    console.log(`Added project: ${name}`);
  }
  
  async function taskCreate(index, name, details, date, important, project) {
  
    const task = new Task({ name, details, date, important, project });
  
    await task.save();
    tasksArray[index] = task;
    console.log(`Added task: ${name}`, task);
  }
  
  async function deleteUsers(){
    await User.deleteMany({})
  }

  async function deleteTasks(){
    await Task.deleteMany({})
  }

  async function deleteProjects(){
    await Project.deleteMany({})
  }
  
  async function createUsers() {
    console.log('Creating users');
    await Promise.all([
      userCreate(0, "test_user@website.com", "abc123!"),
      userCreate(1, "guy_man123@emailsite.com", "abc456!"),
      userCreate(2, "clay.nichols@gmail.com", "azmcn1077!")
    ])
  }
  
  async function createProjects() {
    console.log("Adding projects");
    await Promise.all([
      projectCreate(0, "Do a task"),
      projectCreate(1, "And a second task"),
      projectCreate(2, "Always be busy"),
    ]);
    console.log("projectsArray: ")
  }
  
  async function createTasks() {
    console.log("Adding tasks");
    await Promise.all([
      taskCreate(0, "get materials", "go to home depot", new Date("2023-10-31"), true, projectsArray[1].id),
    ]);
  }

  async function deleteAll() {
    console.log("Deleting old data...")
    await Promise.all([
        deleteProjects(),
        deleteTasks(),
        deleteUsers()
    ])
    console.log("Old data deleted!")
  }

  module.exports = main