// A Functional Component (FC) is a generic TypeScript type
// we can use to pass strong-typed props to a function-based component.
// The syntax is FC<Props>, where Props is the interface for the props.
import {FC} from 'react';
/** @jsxRuntime classic /
/* @jsx jsx */
import { css, jsx } from '@emotion/react';
import { gray5, accent2} from './Styles';
import { QuestionData } from './QuestionsData';
import { Question } from './Question';

// We have called the props interface Props and it contains a single
// property to hold an array of questions.
// Note renderItem prop is a function that takes in a parameter containing
// the question and returns a JSX element. Notice that we have made this an optional prop
// so that our app will continue to run just as it was.
interface Props{
    data_array: QuestionData[];
    renderItem?: (item: QuestionData) => JSX.Element;
}

// We have defined props that can be passed into the component of the Props type.
// This means we can pass a data prop into QuestionList when reference it in JSX
// Notice the (key) prop pass into the li element. The key prop helps React detect when the
// element changes or is added or removed. Where we output content in a loop, in React.
// Notice that we're referencing the "data" prop and calling a map function nested inside a List
// Lets destructure the props into a data_array variable in the function paramter.
// Destructing is a special syntax that allows us to unpack objects or arrays into variables.
export const QuestionList: FC<Props> = ({data_array, renderItem}) => {
    console.log('Rendering QuestionList',data_array , renderItem);
    return(
        <ul
        css={css`
            list-style: none;
            margin: 10px 0 0 0;
            padding: 0px 20px;
            background-color: #fff;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
            border-top: 3px solid ${accent2};
            box-shadow: 0 3px 5px 0 rgba(0,0,0.16);
        `}
    >
    {data_array.map(question =>(
        <li
            key={question.questionId}
            css={css`
                border-top: 1px solid ${gray5};
                :first-of-type {
                border-top: none;
                }
            `}
        >
            <Question data_single={question} />
        </li> 
        ))}
    </ul>
    );
}


