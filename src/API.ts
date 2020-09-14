import axios from 'axios';
import {shuffleArray, Question} from './utils';


const fetchQuestions = async (amount: number, diffculty: string ) => {
  const apiURL = `https://opentdb.com/api.php?amount=${amount}&difficulty=${diffculty}&category=18`;
  const res = await axios.get(apiURL);
  console.log(res);
  return res.data.results.map((question: Question) => (
    {
      ...question,
      answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
    }
  ))
}

export default fetchQuestions;
