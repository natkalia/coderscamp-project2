const quizBox = document.querySelector(".quiz-inner");

function quizBuilder() {
  
  for (item in questionsList) {
    // create and append elements to show question, image, possible answers 
    const questionBox = document.createElement("p");
    const imageBox = document.createElement("img");
    const answersBoxList = document.createElement("ol");
    quizBox.appendChild(questionBox);
    quizBox.appendChild(imageBox);
    quizBox.appendChild(answersBoxList);
    
    // destructure values from objects to get question, image, answers
    const { questionText } = questionsList[item];
    const { questionImage } = questionsList[item];
    const { answersToQuestion } = questionsList[item];

    // function to change question format to string with auto number
    let num = 0;
    function autoNum(str) {
      num = ++num;
      str = `${num}. ${str}`;
      return str;
    }

    // insert question and image to new elements
    questionBox.innerText = autoNum(questionText);
    imageBox.src = questionImage;
    
    // get possible answers looping the object, and insert it with input code to new element
    // unresolved issue with input name and input and label for/id to be created dynamically
    for (letter in answersToQuestion) {
      const answersBoxListItem = document.createElement("li");
      answersBoxList.appendChild(answersBoxListItem);
      answer = answersToQuestion[letter];
      answersBoxListItem.innerHTML = `<label for="letter">${answer}</label>
                                     <input type="radio" name="question" id="letter" value="${letter}">`
    }
  }
  
}

quizBuilder();
