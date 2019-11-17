/* get necessary already existing elements from DOM */
const quizOuter = document.querySelector('.quiz-outer');
const btnSubmit = document.querySelector('.submit');
const btnReset = document.querySelector('.reset');
const resultBox = document.querySelector('.results');

function quizBuilder() {
  questionsList.forEach( (question, index) => {
    /* create elements to structure a card with quiz question, image, possible answers */
    const quizInner = document.createElement('div');
    const questionBox = document.createElement('div');
    const imageBox = document.createElement('img');
    const answersBoxList = document.createElement('ol');
    quizOuter.appendChild(quizInner);
    quizInner.appendChild(questionBox);
    quizInner.appendChild(imageBox);
    quizInner.appendChild(answersBoxList);

    /* add class with styles to each quiz question card */
    quizInner.setAttribute('class', 'quiz-inner');
      
    /* destructure values to get question, image, answers from each question object in array */
    const { questionText, questionImage, answersToQuestion, questionNumber } = question; 

    /* insert question and image to new elements */
    questionBox.innerHTML= `<h4>Question ${questionNumber} of ${questionsList.length}</h4><p>${questionText}</p>`;
    imageBox.src = questionImage;
    
    /* get possible answers looping the question objects, and insert them to DOM */
    for (letter in answersToQuestion) {
      const answersBoxListItem = document.createElement('li');
      answersBoxList.appendChild(answersBoxListItem);
      answer = answersToQuestion[letter];
      answersBoxListItem.innerHTML = `<input type='radio' name='${questionNumber}' value='${letter}' 
                                     id='${questionNumber}${letter}'>
                                     <label for='${questionNumber}${letter}'>${answer}</label>`
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
      element.parentElement.parentElement.parentElement.classList.add('answered');
    });
  });
}

function getUserResult() {
  /* get necessary dynamically created input elements from DOM */
   const userInputsCollection = document.querySelectorAll('input[type="radio"]');
   let userAnswersArray = Array.from(userInputsCollection);

  /* create object for each user to keep his/her answers */
  function Person() {
  }
  let person = new Person();

  /* add checked answers (based on checked input) with question numbers (based on input name equal to question number) to user object as properties */
  userAnswersArray.forEach(element => {
      if (element.checked === true) {
        person[element.name] = element.value;
      }
  });

  /* create variables with arrays to store user good and bad answers */
  let goodAnswersArray = [];
  let badAnswersArray = [];

  /* verify if user answered given question and add to good or bad answers array */
  questionsList.forEach(element => { 
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

  /* change style to show good and bad answers without reference to user results */
  let corrNumbersLetters = questionsList.map(element => { 
    return element.questionNumber + element.correct;
  });

  for (let i=0; i<userInputsCollection.length; i++) {
    if (corrNumbersLetters.includes(userInputsCollection[i].id) === true) {
      userInputsCollection[i].nextElementSibling.classList.add('good-answer');
    } else {
      userInputsCollection[i].nextElementSibling.classList.add('bad-answer');
    }
  }

  /* insert user result to DOM and show message depending on the user result */
  resultBox.style.display='block';

  const messageStandard1 = `<p>Your result is ${goodAnswersArray.length} / ${badAnswersArray.length + goodAnswersArray.length}.</p>`;
  const messageStandard2 = `<p>See below to compare your answers with correct ones.</p>`;
  const messageHigh = `${messageStandard1}
                      <p>Wow, this is impressive.</p>
                      ${messageStandard2}`;
  const  messageMedium = `${messageStandard1}
                          <p>Not bad, but could be better.</p>
                          ${messageStandard2}`;
  const messageLow = `${messageStandard1}
                      <p>Disappointed? Well, many celebrities did not go above that score too.</p>
                      ${messageStandard2}`;
                  
  const ratio = goodAnswersArray.length / (badAnswersArray.length + goodAnswersArray.length);

  if (ratio >= 0.7) {
    resultBox.innerHTML = messageHigh;
  } else if (ratio < 0.7 && ratio >= 0.5) {
    resultBox.innerHTML = messageMedium;
  } else {
    resultBox.innerHTML = messageLow;
  }

  /* move user to top to let him/her see results */
  window.scrollTo(0,0);
}

function resetAnswers() {
  const userInputsCollection = document.querySelectorAll('input[type="radio"]');

  /* remove style corresponding to user answers */
  for (let i=0; i<userInputsCollection.length; i++) {
    userInputsCollection[i].checked=false;
    userInputsCollection[i].parentElement.classList.remove('good-answer');
    userInputsCollection[i].parentElement.classList.remove('bad-answer');
    userInputsCollection[i].parentElement.parentElement.parentElement.classList.remove('answered');
  }

  /* remove results from top page */
  resultBox.style.display='none';
}

/* execute functions and listen for further events */ 
quizBuilder();
markAnswered();

btnSubmit.addEventListener('click', getUserResult);
btnReset.addEventListener('click', resetAnswers);