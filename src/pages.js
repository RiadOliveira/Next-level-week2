const { subjects, weekday, getSubject, convertHToM } = require("./utils/format")
const Database = require('./database/db')

var nomes = [
    {name: "numsei",
    idade: 18},
    {name: "numsei2",
    idade: 182}
]

function index(req, res) {
    return res.render("index.html")
}
    
async function study(req,res) {
    const filters = req.query
    
    if(!filters.subject || !filters.weekday || !filters.time) {
        return res.render("study.html", {filters, subjects, weekday, pao: nomes})
    }

    const mins = convertHToM(filters.time)

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${mins}
            AND class_schedule.time_to > ${mins}
        )
        AND classes.subject = "${filters.subject}"
    `
    try {
        const db = await Database
        const proffys = await db.all(query)
        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        })
        return res.render('study.html', {proffys, filters, subjects, weekday })
        
    } catch (error) {
        console.log(error)
    }
    
}

function giveclasses(req, res) {
/*
    const data = req.query
    const isEmpty = Object.keys(data) //var isNotEmpty = Object.keys(data).length > 0, assim bastaria colocar a variável na condição
    if(isEmpty.length != 0) {
        data.subject = getSubject(Number(data.subject))
        proffys.push(data)
    }
    */ //Lógica para pegar os dados e armazená-los de maneira temporária
    //Será substituida pela lógica abaixo

    return res.render("give-classes.html", {weekday, subjects})
}

async function saveClasses(req, res) {
    const data = req.body
    const createProffy = require('./database/createProffy')

    const proffyValue = {
        name: data.name, 
        avatar: data.avatar, 
        wpp: data.wpp, 
        bio : data.bio  
    }

    const classValue = {
        subject: data.subject, 
        cost: data.cost 
    }

    const classScheduleValues = data.weekday.map((value, index) => {
        //Ficando nas posições do array cada object desses, conforme o map for passando
        return {
            weekday: value,
            time_from: convertHToM(data.time_from[index]),
            time_to: convertHToM(data.time_to[index])
        }
    })

    try {
    const db = await Database;
    await createProffy(db, {proffyValue, classValue, classScheduleValues})
    
    let queryString = "?subject=" + data.subject
    queryString += "&weekday=" + data.weekday[0]
    queryString += "&time=" + data.time_from[0]

    return res.redirect('/study' + queryString)
    } catch (error) {
        
    }

}

module.exports = {index, study, giveclasses, saveClasses}