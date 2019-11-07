const quizBox = document.querySelector(".quiz-inner");

function quizBuilder() {
  let num = 0;
  for (item in questionsList) {
    const { questionText } = questionsList[item];
    const { questionImage } = questionsList[item];
    const { answers } = questionsList[item];

    //creating question with number based on object
    const questionBox = document.createElement("p");
    quizBox.appendChild(questionBox);
    function autoNum(x) {
      num = ++num;
      console.log(num, x);
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

    for (letter in answers) {
      answer = answers[letter];
      const answersBoxListItem = document.createElement("li");
      answersBoxList.appendChild(answersBoxListItem);
      answersBoxListItem.innerText = answer;
    }
  }
}

quizBuilder();
