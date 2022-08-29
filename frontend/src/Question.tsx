/** @jsxRuntime classic /
/* @jsx jsx */
import { css, jsx } from '@emotion/react';
import {QuestionData} from './QuestionsData';
import { gray2, gray3 } from './Styles';

import {FC} from 'react';
import {Link} from 'react-router-dom';

// Create props for the Question component, which will contain
// a prop for the data:
interface Props {
    data_single: QuestionData;
    showContent?: boolean; // Lets make showContent prop optional "?"
}

// Creating components
// Notice the Javascript ternary operation to truncate the content (> ? :).
// A javascript ternary is a short way of implementing a conditonal statement
// that results in one of two branches of logic being executed.

export const Question:
FC<Props> = ({data_single},{showContent}) =>(
    <div
        css={css`
        padding: 10px 0px;
        `}
    >
        <div
            css={css`
                padding: 10px 0px;
                font-size: 19px;
            `}
        >
        <Link css={css`
            text-decoration: none;
            color: ${gray2};
            `}
            to={`questions/${data_single.questionId}`}
        >
            {data_single.title}
        </Link>
        </div>
        {showContent && (
            <div
                css={css`
                    padding-bottom: 10px;
                    font-size: 15px;
                    color: ${gray2};
                `}
            >
                {data_single.content.length > 50
                ? `${data_single.content.substring(0, 50)}...`
                : data_single.content}
            </div>
        )}
        <div
            css={css`
                font-size: 12px;
                font-style: italic;
                color: ${gray3};
            `}
        >
            {`Asked by ${data_single.userName} on
            ${data_single.created.toLocaleDateString()} ${data_single.created.toLocaleTimeString()}`}
        </div>
     </div>
);

// Show the question content by default by setting a special
// object  literal called defaultProps
Question.defaultProps = {
    showContent: true,
}
