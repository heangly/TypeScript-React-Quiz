import React from 'react';
import {AnswerObject} from '../utils';
import '../styles/QuestionBox.css';

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestions: number;
}

const QuestionBox: React.FC<Props> = ({question, answers, callback, userAnswer, questionNumber,totalQuestions}) => {
  return(
    <div className='QuestionBox'>
    <p>Question: {questionNumber} / {totalQuestions}</p>
      <p className='lead font-weight-bold' dangerouslySetInnerHTML={{ __html: question }}/>
      <div className='QuestionBox-answers'>
        {answers.map(answer => (
          <div key={answer}>
            <button className={userAnswer?.correctAnswer === answer ? 'btn btn-block btn-success' : 'btn btn-block btn-light'}
              disabled={userAnswer ? true: false}
              onClick={callback}
              value={answer}
            >
              <span dangerouslySetInnerHTML = {{ __html: answer }} />
            </button>
          </div>
        ))}
      </div>
    </div> 

  )
}

export default QuestionBox;