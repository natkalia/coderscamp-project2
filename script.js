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
                                      <input type="radio" name="question-${questionNumber}" id="question-${questionNumber}-answer-${letter}" value="${letter}">`
    }
  }); 
}
quizBuilder();

/* listen for click and filter which answers are checked - in progress */
const userInputsCollection = document.querySelectorAll('input[type="radio"]');
const button = document.querySelector('input[type="submit"]');

function getUserResult() {
  /* get all inputs (checked and unchecked) as an array */
  const allInputsArray = Array.from(userInputsCollection);

  /* verify which input fields are checked */
  let checkedInputsArray = allInputsArray.filter( (element, index) => {
    return allInputsArray[index].checked === true;
  });

  /* map array with quiz questions to get only correct answers */ 
  let corrAnswersArray = questionsList.map(function (element) {
    return element.correct;
  });

  /* verify correct answers - first idea for solution
   to be solved: what to do with unchecked input */
  checkedInputsArray.forEach( item => {
    let counter = 0;
    if (item.value == corrAnswersArray[counter]) {
      console.log("you said " + item.value + " and correct answer is " + corrAnswersArray[counter] + " so you won!");
    } else {
      console.log("you said " + item.value + " and correct answer is " + corrAnswersArray[counter] + " so you lost!");
    }
    counter++;
  });

}

button.addEventListener('click', getUserResult);