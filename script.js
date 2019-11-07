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
