import styled from 'styled-components'
import db from '../db.json'
import Widget from '../src/components/Widget/index'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import QuizBackground from '../src/components/QuizBackground'



export const QuizContainer = styled.div`
  max-width:350px;
  padding-top:45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;

}
`


const Home = () => {
  return ( 
    <QuizBackground backgroundImage={db.bg} >
      <QuizContainer>
      <Widget>
          <Widget.Header>
          <h1>Chelsea FC</h1>

          </Widget.Header>
        <Widget.Content>
          <p>lorem ipsum</p>
        </Widget.Content>
      </Widget> 

      <Widget>

      </Widget>
      <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl='https://github.com/hiimgui' />
    </QuizBackground>
      
    
   );
}
 
export default Home;