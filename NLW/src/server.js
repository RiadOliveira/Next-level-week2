//const proffys = [
//    {name:"Diego Fernandes", avatar:"https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", wpp:"899873478", bio:"Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", subject:"Química", cost:"20,00", weekday: [0], time_from: [720], time_to: [1220]}, 
//    {name:"Ríad Oliveira", avatar:"https://avatars2.githubusercontent.com/u/69125013?s=460&u=cfaeb20e12b9299d9497ed661b50085c1264959d&v=4", wpp:"988845152", bio:"Programador profissional e proplayer de LOL nas horas vagas, por mais que seja um jogo muito divertido.", subject:"Estudos gerais", cost:"250,00", weekday: [1,3,5], time_from: [840], time_to: [1080]}
//]
const {index, study, giveclasses, saveClasses} = require('./pages.js')
const express = require('express')
const server = express()
const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
    express: server,
    NoCache: true
})

server
.use(express.urlencoded( {extended:true} ))
.use(express.static("public"))
.get("/", index)
.get("/study", study)
.get("/give-classes", giveclasses)
.post('/save-classes', saveClasses)
.listen('5500')