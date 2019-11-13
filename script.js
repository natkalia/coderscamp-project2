const quizOuter = document.querySelector(".quiz-outer");

function quizBuilder() {
  
  questionsList.forEach( (currentItem, indexItem) => {

    /* create and append elements to show question, image, possible answers */
    const quizBox = document.createElement("div");
    const questionBox = document.createElement("p");
    const imageBox = document.createElement("img");
    const answersBoxList = document.createElement("ol");
    quizOuter.appendChild(quizBox);
    quizBox.appendChild(questionBox);
    quizBox.appendChild(imageBox);
    quizBox.appendChild(answersBoxList);

    quizBox.setAttribute("class", "quiz-box");
      
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

  /* create object for each user with his/her answers */
  function Person() {
  }
  let person = new Person();

  let userAnswersArray = Array.from(userInputsCollection)
    .forEach( element => {
      if (element.checked === true) {
        person[element.name] = element.value;
      }
  });
    
  questionsList.forEach((element, index) => { 
    if (person.hasOwnProperty(element.questionNumber)) {
      if (person[element.questionNumber] === element.correct) {
        console.log(`Question no.${element.questionNumber}: user answered ${person[element.questionNumber]}. The correct answer is: ${element.correct}. So you were RIGHT!`);
      } else {
        console.log(`Question no.${element.questionNumber}: user answered ${person[element.questionNumber]}. The correct answer is: ${element.correct}. So user's answer is WRONG.`);
      }
    } else {
      console.log("not all answers");
    }
  });

  /* insert simple result format to DOM - in progress */

  /* count correct answers and bad answers - in progress */

}

button.addEventListener('click', getUserResult);