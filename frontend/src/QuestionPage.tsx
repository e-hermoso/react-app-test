/** @jsxRuntime classic /
/* @jsx jsx */
import { css, jsx } from '@emotion/react';
import { gray3, gray6 } from './Styles';

import { FC, useState, Fragment, useEffect } from 'react';
import { Page } from './Page';
import {useParams} from 'react-router-dom';
import { QuestionData, getQuestion, postAnswer } from './QuestionsData';
import {AnswerList} from './AnswerList';
import { Form,required, minLength, Values } from './Form';
import { Field } from './Field';

// We have defined the type for the route paramters
// in a RouteParams interface
type RouteParams = {
    questionId: string;
}

// Create an explicit return statement and create a state
// for the question.
export const QuestionPage:FC = () : JSX.Element=>{
    const { questionId } = useParams<RouteParams>();

    // Note we are using a union type for the state becuase the state will be null
    // by default while the question is being fetched and also null if the question 
    // isn't found.
    const [question,setQuestion] = useState<QuestionData | null>(null);

    // Lets call the getQuestion function during the initial render
    // Note that the second parameter in the useEffect function has
    // a second questionId in an array. This is becuase the function
    // that useEffect runs (the first parameter) is dependent on the
    // questionId value should return if this value changes.
    useEffect(() =>{
        const doGetQuestion = async(questionId: number ) => {
            const foundQuestion = await getQuestion(questionId);
            setQuestion(foundQuestion);
            
        };
        if(questionId){
            console.log("first render fetch question.")
            console.log(questionId)
            const questionIdInt = Number(questionId)
            doGetQuestion(questionIdInt)
        }

    },[questionId]);
    
    // This calls the postAnswerFunction, asynchronously passing in the content
    // from the field values with a hardcoded user name and create date.
    const handleSubmit = async (values: Values) => {
        const result = await postAnswer({
          questionId: question!.questionId, // (!) tells typescript compiler that the variable before it cannot be null/undefined.
          content: values.content,
          userName: 'Fred',
          created: new Date(),
        });
    
        return { success: result ? true : false };
      };

    return(
        <Page>
            <div css={css`
                background-color: white;
                padding: 15px 20px 20px 20px;
                border-radius: 4px;
                border: 1px solid ${gray6};
                box-shadow: 0 3px 5px 0 rgba(0,0,0.16);
            `}>
                <div css={css`
                    font-size: 19px;
                    font-weight: bold;
                    margin: 10px 0px 5px;
                `}>
                    {question === null ? '': question.title}

                </div>
                    {question !== null && (
                    <Fragment>
                        <p css={css`
                            margin-top: 0px;
                            background-color: white;
                        `}>
                            {question.content}
                        </p>
                        <div css={css`
                            font-size:12px;
                            font-style: italic;
                            color: ${gray3};    
                        `}>
                           { `Asked by ${question.userName} on
                           ${ question.created.toLocaleDateString()}
                           ${ question.created.toLocaleTimeString()} `}
                        </div>
                        <AnswerList data={question.answers}/>
                        <div css={css`
                            margin-top: 20px;
                        `}>
                            <Form 
                            validationRules={{
                            content:[{validator:required},{validator: minLength, arg: 50},],}}
                            submitCaption="Submit Your Answer"
                            onSubmit={handleSubmit}
                            failureMessage="There was a problem with your answer"
                            successMessage="Your answer was successfully submitted"
                            >
                                <Field name="content" label="Your Answer" type="TextArea"/>
                            </Form>
                        </div>
                    </Fragment>
                )}
            </div>
        </Page>
    )
    // return <Page>Question Page {questionId}</Page>;
}