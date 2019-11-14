/* get necessary elements from DOM */
const quizOuter = document.querySelector(".quiz-outer");
const button = document.querySelector('input[type="submit"]');
const resultBox = document.querySelector(".results");

function quizBuilder() {
  
  questionsList.forEach( (question, index) => {

    /* create and append elements to show question, image, possible answers */
    const quizInner = document.createElement("div");
    const questionBox = document.createElement("p");
    const imageBox = document.createElement("img");
    const answersBoxList = document.createElement("ol");
    quizOuter.appendChild(quizInner);
    quizInner.appendChild(questionBox);
    quizInner.appendChild(imageBox);
    quizInner.appendChild(answersBoxList);

    /* add class with styles */
    quizInner.setAttribute("class", "quiz-inner");
      
    /* destructure values to get question, image, answers from each question object in array */
    const { questionText, questionImage, answersToQuestion, questionNumber } = question; 

    /* insert question and image to new elements */
    questionBox.innerText = `${questionNumber}. ${questionText}`;
    imageBox.src = questionImage;
    
    /* get possible answers looping the question objects, and insert them with input code to new element */
    for (letter in answersToQuestion) {
      const answersBoxListItem = document.createElement("li");
      answersBoxList.appendChild(answersBoxListItem);
      answer = answersToQuestion[letter];
      answersBoxListItem.innerHTML = `<label for="${questionNumber}${letter}">${answer}</label>
                                      <input type="radio" name="${questionNumber}" id="${questionNumber}${letter}" value="${letter}">`
    }
  }); 
}

function markAnswered() {
  /* get necessary dynamically created input elements from DOM */
  const userInputsCollection = document.querySelectorAll('input[type="radio"]');
  let userAnswersArray = Array.from(userInputsCollection);

  /* add event listener to check which question is answered and change style */
  userAnswersArray.forEach( (element) => {
    element.addEventListener('click', function() {
      element.parentElement.parentElement.parentElement.classList.add("answered");
    });
  });
}

function getUserResult() {
  /* get necessary dynamically created input elements from DOM */
   const userInputsCollection = document.querySelectorAll('input[type="radio"]');
   let userAnswersArray = Array.from(userInputsCollection);

  /* create object for each user */
  function Person() {
  }
  let person = new Person();

  /* add checked answers with question numbers to user object */
  userAnswersArray.forEach( element => {
      if (element.checked === true) {
        person[element.name] = element.value;
      }
  });

  /* create variables to store user results */
  let goodAnswersArray = [];
  let badAnswersArray = [];

  /* verify if user answered given question from question list and check if user answer is correct */
  questionsList.forEach((element) => { 
    if (person.hasOwnProperty(element.questionNumber)) {
      if (person[element.questionNumber] === element.correct) {
        goodAnswersArray.push(element.questionNumber);
      } else {
        badAnswersArray.push(element.questionNumber);
      }
    } else {
      badAnswersArray.push(element.questionNumber);
    }
  });

  /* change style to show good and bad answers - in progress - now there is no comparison with user answers */
  let corrNumbersLetters = questionsList.map((element) => { 
    return element.questionNumber + element.correct;
  });

  for (let i=0; i<userInputsCollection.length; i++) {
    if (corrNumbersLetters.includes(userInputsCollection[i].id) === true) {
      userInputsCollection[i].parentElement.classList.add("good-answer");
    } else {
      userInputsCollection[i].parentElement.classList.add("bad-answer");
    }
  }

  /* insert simple result format to DOM */
  resultBox.innerHTML = `<p>Your result is ${goodAnswersArray.length} / ${badAnswersArray.length}</p>
                        <p>See above to compare your answers with correct ones !</p>`;
}

/* execute functions and listen for further events */ 
quizBuilder();

markAnswered();

button.addEventListener('click', getUserResult);