const quizBox = document.querySelector(".quiz-inner");

function quizBuilder() {
  
  questionsList.forEach( (currentItem, indexItem) => {

    /* create and append elements to show question, image, possible answers */
    const questionBox = document.createElement("p");
    const imageBox = document.createElement("img");
    const answersBoxList = document.createElement("ol");
    quizBox.appendChild(questionBox);
    quizBox.appendChild(imageBox);
    quizBox.appendChild(answersBoxList);
      
    /* destructure values from objects to get question, image, answers from each object in array */
    const { questionText, questionImage, answersToQuestion, questionNumber } = questionsList[indexItem]; 

    /* insert question and image to new elements */
    questionBox.innerText = `${indexItem + 1}. ${questionText}`;
    imageBox.src = questionImage;
    
    /* get possible answers looping the object, and insert it with input code to new element */
    for (letter in answersToQuestion) {
      const answersBoxListItem = document.createElement("li");
      answersBoxList.appendChild(answersBoxListItem);
      answer = answersToQuestion[letter];
      answersBoxListItem.innerHTML = `<label for="question-${questionNumber}-answer-${letter}">                                         ${answer}</label>
                                      <input type="radio" name="${questionNumber}" id="question-${questionNumber}-answer-${letter}" value="${letter}">`
    }
  }); 
}
quizBuilder();

/* listen for click and filter which answers are checked - in progress */
const userInputsCollection = document.querySelectorAll('input[type="radio"]');
const button = document.querySelector('input[type="submit"]');
const resultBox = document.querySelector(".results");

function getUserResult() {

  /* map array with quiz questions to get only correct answers */ 
  let corrAnswersArray = questionsList.map(function (element) {
    return (element.questionNumber + element.correct);
  });

  /* get all user inputs (checked and unchecked) as an array */
  const allInputsArray = Array.from(userInputsCollection);

  /* format user inputs to array with user answers in same format as correct answers */
  let userAnswersArray = allInputsArray
    .map( element => {
      return (element.name + element.value + element.checked);
    })
    .filter( element => {
      return element.includes("true");
    })
    .map( element => {
      return (element.slice(0, -4)); 
    });

    /* compare user answers with correct answers - problem with unchecked items to be solved - in progress */
    let goodUserAnswers = [];
    let badUserAnswers = [];
    for (let i = 0; i < corrAnswersArray.length; i++) {
      if (corrAnswersArray[i] === userAnswersArray[i]) {
        goodUserAnswers.push(userAnswersArray[i]);
        console.log(corrAnswersArray[i] + userAnswersArray[i] + " are good answers");
      } else {
        badUserAnswers.push(userAnswersArray[i]);
        console.log(corrAnswersArray[i] + userAnswersArray[i] + " are bad answers");
      }
    } 

    /* insert simple result format to DOM - in progress */
    resultBox.innerHTML=`Your good answers are: ${goodUserAnswers} and your bad answers are: ${badUserAnswers}`;
}

button.addEventListener('click', getUserResult);