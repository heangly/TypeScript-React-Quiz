import React, {useState} from 'react';
import fetchQuestion from '../API';
import {QuestionState} from '../utils';
import {AnswerObject} from '../utils';
import QuestionBox from '../components/QuestionBox';
import '../styles/Quiz.css';

const Quiz = () => {
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [gameOver, setGameOver] = useState(true);

  const totalQuestion = 10;

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuestion(10, 'easy');
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setTimeout(() => {
      setLoading(false);
    }, 500);
 
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver){
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct){
        setScore(prev => prev+1)
      }
      else{
        console.log(e.currentTarget)
        e.currentTarget.style.backgroundColor ='red';
        e.currentTarget.style.border ='none';
      }
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      };
      setUserAnswers(prev => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;

    if (nextQuestion === totalQuestion){
      setGameOver(true);
    }else{
      setNumber(nextQuestion);
    }
  };

  return(
    <div>
      {
        gameOver || userAnswers.length === totalQuestion ? (<button className='btn btn-warning' onClick={startQuiz}>Start Quiz</button>): null
      }
      
      {!gameOver ? <p className='text-light lead font-weight-bold mt-3'>Score: {score} </p> : null}

      {/* spinner */}
      {loading && 
        <div className="spinner">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
          <span> Loading...</span>
        </div>
      }

      {!loading && !gameOver && (
        <QuestionBox
          questionNumber={number + 1}
          totalQuestions={totalQuestion}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        /> 
      )}

      {!gameOver && !loading && userAnswers.length === number + 1 && number !== totalQuestion - 1 ? (
        <button className='btn btn-lg btn-warning mt-3 mb-5' onClick={nextQuestion}>next</button>
      ): null}
    </div>
  )
}

export default Quiz;