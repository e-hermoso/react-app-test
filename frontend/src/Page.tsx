import { FC } from 'react';
/** @jsxRuntime classic /
/* @jsx jsx */
import { css, jsx } from '@emotion/react';
import { PageTitle } from './PageTitle';

interface Props{
    title?: string;
}

// Notice that we didn't need to define children in our Props interface. This
// is because already been made available via the FC type.
// Also note the children prop alows a consumer to render custome content
// within the component; also its a function prop.
export const Page: FC<Props> = 
({title, children}) =>(
    <div
        css={css`
            margin: 50px auto 20px auto;
            padding: 30px 20px;
            max-width: 600px;
        `}
    >
        {title && <PageTitle>{title}</PageTitle>}
        {children}
    </div>
)