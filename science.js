const quizData = [
    {
        question: "What does HTML stand for? Sec Science",
        options: [
            "Hypertext Markup Language",
            "Hyper Transfer Markup Language",
            "Hypertext Machine Language",
            "Hyperlink and Text Markup Language",
        ],
        correct: 0,
    },
    {
        question: "Which CSS property is used to control the spacing between elements?",
        options: ["margin", "padding", "spacing", "border-spacing"],
        correct: 1,
    },
    {
        question: "What is the JavaScript function used to select an HTML element by its id?",
        options: [
            "document.query",
            "getElementById",
            "selectElement",
            "findElementById",
        ],
        correct: 1,
    },
    {
        question: "Which of the following is not a valid HTML tag?",
        options: ["<ul>", "<li>", "<ol>", "<dl>"],
        correct: 3,
    },
];

let currentQuiz = 0;
let score = 0;
const userSelections = new Array(quizData.length).fill(null);

const questionElement = document.getElementById("question");
const optionElements = [
    document.getElementById("option_1"),
    document.getElementById("option_2"),
    document.getElementById("option_3"),
    document.getElementById("option_4"),
];
const answerElements = document.querySelectorAll(".answer");
const submitBtn = document.querySelector("#submit");
const previousBtn = document.querySelector("#previous");
const nextBtn = document.querySelector("#next");

const loadQuiz = () => {
    const { question, options } = quizData[currentQuiz];
    questionElement.innerText = question;
    options.forEach((curOption, index) => {
        optionElements[index].innerText = curOption;
        optionElements[index].previousElementSibling.checked = false;
    });

    if (userSelections[currentQuiz] !== null) {
        answerElements[userSelections[currentQuiz]].checked = true;
    }
};

const getSelectedOption = () => {
    let selectedOptionIndex = -1;
    answerElements.forEach((curElem, index) => {
        if (curElem.checked) {
            selectedOptionIndex = index;
        }
    });
    return selectedOptionIndex;
};

submitBtn.addEventListener("click", () => {
    const selectedOptionIndex = getSelectedOption();
    if (selectedOptionIndex === quizData[currentQuiz].correct) {
        score++;
    }
    userSelections[currentQuiz] = selectedOptionIndex;
    currentQuiz++;
    if (currentQuiz < quizData.length) {
        loadQuiz();
    } else {
        showFinalResult();
    }
});

previousBtn.addEventListener("click", () => {
    if (currentQuiz > 0) {
        userSelections[currentQuiz] = getSelectedOption();
        currentQuiz--;
        loadQuiz();
    }
});

nextBtn.addEventListener("click", () => {
    if (currentQuiz < quizData.length - 1) {
        userSelections[currentQuiz] = getSelectedOption();
        currentQuiz++;
        loadQuiz();
    }
});

const showFinalResult = () => {
    const quizSection = document.querySelector(".quiz-section");
    quizSection.innerHTML = `
        <div class="card">
            <h2>Quiz Completed</h2>
            <p>Your score is ${score}/${quizData.length}</p>
            <button id="restart">Restart Quiz</button>
        </div>
    `;
    document.getElementById("restart").addEventListener("click", restartQuiz);
};

const restartQuiz = () => {
    currentQuiz = 0;
    score = 0;
    userSelections.fill(null);
    loadQuiz();
    document.querySelector(".quiz-section").innerHTML = `
        <div class="card">
            <div id="quiz1">
                <h2 class="question" id="question">Quiz Question 1</h2>
                <hr />
                <ul>
                    <li>
                        <input type="radio" name="answer" class="answer" id="a1">
                        <label for="a1" id="option_1">Option A</label>
                    </li>
                    <li>
                        <input type="radio" name="answer" class="answer" id="b1">
                        <label for="b1" id="option_2">Option B</label>
                    </li>
                    <li>
                        <input type="radio" name="answer" class="answer" id="c1">
                        <label for="c1" id="option_3">Option C</label>
                    </li>
                    <li>
                        <input type="radio" name="answer" class="answer" id="d1">
                        <label for="d1" id="option_4">Option D</label>
                    </li>
                </ul>
            </div>
        </div>
    `;
    loadQuiz();
};

loadQuiz();
