/* eslint-disable import/no-duplicates */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useState, useEffect } from 'react';
import db from '../db.json';
import AlternativesForm from '../src/components/AlternativeForm';
import Widget from '../src/components/Widget/index';
import Button from '../src/components/Button';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Tela do Resultado
      </Widget.Header>

      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {/* {results.reduce((somatoriaAtual, resultAtual) => {
            const isAcerto = resultAtual === true;
            if (isAcerto) {
              return somatoriaAtual + 1;
            }
            return somatoriaAtual;
          }, 0)} */}
          {results.filter((x) => x).length}
          {' '}
          perguntas
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              #
              {index + 1}
              {' '}
              Resultado:
              {result === true
                ? 'Acertou'
                : 'Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}
function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

const QuestionWidget = ({
  question, totalQuestions, questionIndex, onSubmit, addResult,
}) => {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [questionSubmitted, setQuestionSubmitted] = useState(false);
  const hasSelectedAlternative = selectedAlternative !== undefined;
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  return (
    <Widget>
      <Widget.Header>
        <h3>
          Pergunta
          {` ${questionIndex + 1} `}
          de
          {` ${totalQuestions}`}
        </h3>
      </Widget.Header>
      <img
        alt="img1"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>
        <AlternativesForm onSubmit={(e) => {
          e.preventDefault();
          setQuestionSubmitted(true);
          setTimeout(() => {
            addResult(isCorrect);
            onSubmit();
            setQuestionSubmitted(false);
            setSelectedAlternative(undefined);
          }, 3 * 1000);
        }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={
            alternativeId
              }
                data-selected
                data-status={questionSubmitted && alternativeStatus}
              >

                <input
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                  onChange={() => {
                    setSelectedAlternative(alternativeIndex);
                  }}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button
            type="submit"
            disabled={!hasSelectedAlternative}
          >
            Confirmar
          </Button>
          {questionSubmitted && isCorrect && <p>Você acertou</p>}
          {questionSubmitted && !isCorrect && <p>Você errou</p>}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
};
const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};
const Quiz = () => {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }
  useEffect(() => {
    // fetch() ...
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  // nasce === didMount
  }, []);
  const handleSubmit = () => {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  };

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        {screenState === screenStates.QUIZ && (
        <QuestionWidget
          question={question}
          totalQuestions={totalQuestions}
          questionIndex={questionIndex}
          onSubmit={handleSubmit}
          addResult={addResult}
        />
        )}
        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/hiimgui" />
    </QuizBackground>
  );
};

export default Quiz;
