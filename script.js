const quizBox = document.querySelector(".quiz-inner");

function quizBuilder() {
  
  questionsList.forEach( (currentItem, indexItem) => {

    // create and append elements to show question, image, possible answers 
    const questionBox = document.createElement("p");
    const imageBox = document.createElement("img");
    const answersBoxList = document.createElement("ol");
    quizBox.appendChild(questionBox);
    quizBox.appendChild(imageBox);
    quizBox.appendChild(answersBoxList);
      
    // destructure values from objects to get question, image, answers from each object in array
    const { questionText, questionImage, answersToQuestion } = questionsList[indexItem]; 

    // insert question and image to new elements
    questionBox.innerText = `${indexItem + 1}. ${questionText}`;
    imageBox.src = questionImage;
    
    // get possible answers looping the object, and insert it with input code to new element
    for (letter in answersToQuestion) {
      const answersBoxListItem = document.createElement("li");
      answersBoxList.appendChild(answersBoxListItem);
      answer = answersToQuestion[letter];
      answersBoxListItem.innerHTML = `<label for="question-${indexItem + 1}-answer-${letter}">                                         ${answer}</label>
                                      <input type="radio" name="question-${indexItem + 1}" id="question-${indexItem + 1}-answer-${letter}" value="${letter}">`
    }
  });
  
}

quizBuilder();

