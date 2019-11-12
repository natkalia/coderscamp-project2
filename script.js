const quizBox = document.querySelector(".quiz-inner");

function quizBuilder() {
  let num = 0;
  for (item in questionsList) {
    const { questionText } = questionsList[item];
    const { questionImage } = questionsList[item];
    const { answersToQuestion } = questionsList[item];

    //creating question with number based on object
    const questionBox = document.createElement("p");
    quizBox.appendChild(questionBox);
    function autoNum(x) {
      num = ++num;
      x = `${num}. ${x}`;
      return x;
    }
    questionBox.innerText = autoNum(questionText);

    //creating image based on object
    const imageBox = document.createElement("img");
    quizBox.appendChild(imageBox);
    imageBox.src = questionImage;
    
    //creating answers based on object
    const answersBoxList = document.createElement("ol");
    quizBox.appendChild(answersBoxList);

    for (letter in answersToQuestion) {
      answer = answersToQuestion[letter];
      const answersBoxListItem = document.createElement("li");
      answersBoxList.appendChild(answersBoxListItem);
      answersBoxListItem.innerHTML = `<label for="${letter}">${answer}</label>
                                     <input type="radio" name="question${num}" id="${letter}" value="${letter}">`
    }
  }
  
}

quizBuilder();
