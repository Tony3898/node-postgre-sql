const express = require('express');
const router = express.Router();
const axios = require("axios").default
const github = require("../apis/github")

module.exports = router
    .post('/', (req, res, next) => {
      axios.get('https://api.github.com/users/mralexgray/repos').then(r => {
        return github.insert(r.data)
      }).then(r => {
        res.send(r)
      }).catch(e => {
        res.status(400).send(e.message)
      })
    }).get('/', (req, res, next) => {
      github.getAllUsers()
          .then(r => {
            res.send(r.rows)
          }).catch(e => {
        res.status(400).send(e.message)
      })
    }).get('/:id', (req, res, next) => {
      const id = req.params.id
      github.getUserById(id)
          .then(r => {
            res.send(r.rows)
          }).catch(e => {
        res.status(400).send(e.message)
      })
    })