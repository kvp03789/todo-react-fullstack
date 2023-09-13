const express = require('express');
const router = express.Router()

//GET all projects
router.get("/", (req, res) => {
    res.json({message: "GET all projects"})
})

//GET single project
router.get("/:id", (req, res) => {
    res.json({message: "GET single project"})
})

//POST new project
router.post("/", (req, res) => {
    res.json({message: "POST new project"})
})

//DELETE single project
router.delete("/:id", (req, res) => {
    res.json({message: "DELETE single project"})
})

//UPDATE single project
router.patch("/:id", (req, res) => {
    res.json({message: "UPDATE single project"})
})


router.get("/:id/tasks/:id", (req, res) => {
    res.json({message: "GET single task in a project"})
})

router.post("/:id/tasks/:id", (req, res) => {
    res.json({message: "POST single task in a project"})
})

module.exports = router