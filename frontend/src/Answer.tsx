/** @jsxRuntime classic /
/* @jsx jsx */
import { css, jsx } from '@emotion/react';
import { gray3 } from './Styles';

import { FC } from 'react';
import { AnswerData } from './QuestionsData';

interface Props{
    data: AnswerData;
}

export const Answer: FC<Props> = ({ data }) => (
    <div css={css`
        padding: 10px 0px;
    `}
    >
        <div css={css`
            padding: 10px 0px;
            font-size: 13px;
        `}>
            {data.content}
        </div>
        <div css={css`
        font-size: 12px;
        font-style: italic;
        color: ${gray3};
        `}>
            {`Answer by ${data.userName} on
            ${data.created.toLocaleDateString()}
            ${data.created.toLocaleTimeString()}
            `}
        </div>
    </div>
)