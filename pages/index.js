/* eslint-disable react/jsx-no-bind */
/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { useRouter } from 'next/router';
import { useState } from 'react';
import Header from '../src/components/MetaTag';
import db from '../db.json';
import Widget from '../src/components/Widget/index';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';

function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  return (
    <>
      <Header />
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <Widget>
            <Widget.Header>
              <h1>Chelsea FC</h1>
            </Widget.Header>
            <Widget.Content>
              <form onSubmit={function (e) {
                e.preventDefault();
                router.push(`/quiz?${name}`);
                console.log('submitou');
              }}
              >
                <Input
                  name="nomeDoUsuario"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="seu nome"
                  value={name}
                />
                <Button type="submit" disabled={name.length === 0}>
                  {`Jogar ${name}`}
                </Button>
              </form>
            </Widget.Content>
          </Widget>

          <Widget />
          <Footer />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/hiimgui" />
      </QuizBackground>
    </>
  );
}

export default Home;
