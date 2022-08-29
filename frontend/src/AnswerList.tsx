/** @jsxRuntime classic /
/* @jsx jsx */
import { css, jsx } from '@emotion/react';
import { gray5 } from './Styles';

import { FC } from 'react';
import { AnswerData } from './QuestionsData';
import { Answer } from './Answer';

// Lets define the interface so that it contains a data prop for
// the array of answers
interface Props {
    data: AnswerData[];
}

export const AnswerList: FC<Props> = ({data}) =>(
    <ul css={css`
        list-style: none;
        margin: 10px 0 0 0;
        padding: 0;
    `}>
        {data.map(answer => (
            <li css={css`
                border-top: 1px solid ${gray5};
            `}
            key={answer.answerId}
            >
                <Answer data={answer}/>
            </li>
        ))}    
    </ul>
)