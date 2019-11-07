const quizBox = document.querySelector('.quiz-inner');

function quizBuilder() {
  
  for (item in questionsList) {
    const { questionText } = questionsList[item];
    const { questionImage } = questionsList[item];

    const questionBox = document.createElement('div');
    quizBox.appendChild(questionBox);
    questionBox.innerText = questionText;

    const imageBox = document.createElement('img');
    quizBox.appendChild(imageBox);
    imageBox.src = questionImage;
  }

}

quizBuilder();