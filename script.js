//initial data
let currentQuestion = 0
let correctAnswers = 0








//functions
showQuestion()

function showQuestion() {

    //events
    document.querySelector('button').addEventListener('click', resetEvent)

    if (questions[currentQuestion]) {
        let q = questions[currentQuestion]

        let pct = Math.floor((currentQuestion / questions.length) * 100)

        document.querySelector('.progress--bar').style.width = `${pct}%`



        document.querySelector('.scoreArea').style.display = 'none'
        document.querySelector('.questionArea').style.display = 'block'

        document.querySelector('.question').innerHTML = q.question
        document.querySelector('.options').innerHTML = ''

        let optionsHtml = ''
        for (let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option"><span>${ parseInt(i)}</span>${q.options[i]}</div>`
        }
        document.querySelector('.options').innerHTML = optionsHtml

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionclickEvent)
        })
    } else {

        finishQuiz()
    }
}

function optionclickEvent(e) {

    let clickedOption = parseInt(e.target.getAttribute('data-op'))

    if (questions[currentQuestion].answer === clickedOption) {
        correctAnswers++
    }

    currentQuestion++
    showQuestion()
}

function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100)

    if (points <= 40) {
        document.querySelector('.scoreText1').innerHTML = 'Precisa melhorar'
        document.querySelector('.scorePct').style.color = 'red'
    } else if (points >= 50 && points < 70) {
        document.querySelector('.scoreText').innerHTML = 'Ta ficando bom continue assim'
        document.querySelector('.scorePct').style.Color = 'yellow'

    } else {
        document.querySelector('.scoreText1').innerHTML = 'Excelente parabéns'
        document.querySelector('.scorePct').style.Color = 'green    '
    }
    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}`

    document.querySelector('.scoreArea').style.display = 'block'
    document.querySelector('.questionArea').style.display = 'none'
    document.querySelector('.progress--bar').style.width = `100%`

}

function resetEvent() {
    correctAnswers = 0
    currentQuestion = 0
    showQuestion()
}