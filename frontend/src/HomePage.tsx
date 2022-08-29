/** @jsxRuntime classic /
/* @jsx jsx */
import { css, jsx } from '@emotion/react';
import { PrimaryButton } from './Styles';
import { QuestionList } from './QuestionList';
import { getUnansweredQuestions, QuestionData} from './QuestionsData'; // Lets try our renderItem prop by adding the Question interface
import { Page } from './Page';
import { PageTitle } from './PageTitle';
import { useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

export const HomePage = () => {
    // useState function returns an array containing the state variable in the first element
    // and a function to set the state in the second element.
    const [questions, setQuestions] = useState<QuestionData[] | null>(null);
    
    // We have initialized this state to true becuase the questions are being fetched immediately
    // in the first rendering cycle. 
    const [questionLoading, setQuestionLoading] = useState(true);
    
    let navigate = useNavigate();

    // Now we can call the useEffect hook before we return the JSX:
    // The useEffect hook is a function that allows a side effect
    // such as fetching data, to be performed in a component.
    useEffect(() => {
        // console.log('First rendered');
        const doGetUnansweredQuestions = async () =>{
            const UnansweredQuestions = await getUnansweredQuestions();

            // Now we need to set the questions and questionsLoading states when we have retrieved the data
            setQuestions(UnansweredQuestions);
            setQuestionLoading(false);
        };
 
        doGetUnansweredQuestions();
    },[]);
    console.log("Lets understand how components are rendered.")
    
    const handleAskQuestionClick = () => {
        console.log('TODO - move to the AskPage');
        navigate('/ask')
    }

    return(
        // Lets add an explicit return statement since we want to write some
        // Javascript logic in the component
        <Page>
            <div 
                css={css`
                    margin: 50px auto 20px auto;
                    padding: 30px 20px;
                    max-width: 600px;
                `}
            >
                <div 
                    css={css`
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    `}
                >
                    <PageTitle>Unanswered Questions</PageTitle>
                    <PrimaryButton onClick={handleAskQuestionClick}>Ask a question</PrimaryButton>
                </div>
            </div>
            {/*Here we are rendering a loading message while the questions are being fetched. 
            Pass in our "questions" state. If the question state is null then an empty array is passed into the data prop.*/}
            {
                questionLoading ? (
                    <div css={css`
                        font-size:16px;
                        font-style: italic;
                    `}
                    >
                        Loading...
                    </div>
                ):(
                    <QuestionList data_array={questions || []}/>
                )
            }
        </Page>
    );
};