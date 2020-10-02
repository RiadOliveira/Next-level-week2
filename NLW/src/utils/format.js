const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"
]

const weekday = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]

function getSubject (Subnumber) {
    return subjects[Subnumber]
}

function convertHToM (time) {
    const [hours, min] = time.split(":")
    return Number(hours)*60 + Number(min)
}

module.exports = {subjects, weekday, getSubject, convertHToM}