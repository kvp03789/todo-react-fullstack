#! /usr/bin/env node
require('dotenv').config()

console.log(
    'This script populates some test projects and tasks to the database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
//   const userArgs = process.argv.slice(2);
  
  const Project = require("./models/projectModel");
  const Task = require("./models/taskModel")

  
  const projectsArray = [];
  const tasksArray = []
 
  
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
    await createProjects();
    await createTasks();
    
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  async function projectCreate(index, name) {
    const project = new Project({ name });
    await project.save();
    projectsArray[index] = project;
    console.log(`Added genre: ${name}`);
  }
  
  async function taskCreate(index, name, details, date, important, project) {
  
    const task = new Task({ name, details, date, important, project });
  
    await task.save();
    tasksArray[index] = task;
    console.log(`Added task: ${name}`);
  }
  
  async function deleteTasks(){
    await Task.deleteMany({})
  }

  async function deleteProjects(){
    await Project.deleteMany({})
  }
  
  
  async function createProjects() {
    console.log("Adding projects");
    await Promise.all([
      projectCreate(0, "Do a task"),
      projectCreate(1, "And a second task"),
      projectCreate(2, "Always be busy"),
    ]);
  }
  
  async function createTasks() {
    console.log("Adding tasks");
    await Promise.all([
      taskCreate(0, "get materials", "go to home depot", "2023-10-31", true, projectsArray[1].id),
    ]);
  }

  async function deleteAll() {
    console.log("Deleting old data...")
    await Promise.all([
        deleteProjects(),
        deleteTasks()
    ])
    console.log("Old data deleted!")
  }

  module.exports = main