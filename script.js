const quizBox = document.querySelector(".quiz-inner");

function quizBuilder() {
  for (item in questionsList) {
    const { questionText } = questionsList[item];
    const { questionImage } = questionsList[item];

    const questionBox = document.createElement("p");
    quizBox.appendChild(questionBox);
    questionBox.innerText = questionText;

    const imageBox = document.createElement("img");
    quizBox.appendChild(imageBox);
    imageBox.src = questionImage;

    const { answers } = questionsList[item];

    for (letter in answers) {
      answer = answers[letter];
      const answersBoxList = document.createElement("ul");
      const answersBoxListItem = document.createElement("li");
      quizBox.appendChild(answersBoxList);
      answersBoxList.appendChild(answersBoxListItem);
      answersBoxList.innerText = answer;
    }
  }
}

quizBuilder();
