/** @jsxRuntime classic /
/* @jsx jsx */
import { css, jsx } from '@emotion/react';
import { FC, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { JsxEmit } from 'typescript';
//import { JsxEmit } from 'typescript';
import { Page } from './Page';
import { QuestionList } from './QuestionList';
import { searchQuestions, QuestionData } from './QuestionsData';

// Lets add RouteComponent Props as the props type for the SearchPage
// type for the SearchPage component and destructure the location object. We'll
// also change the component so that it uses an explicit return statement.
export const SearchPage:FC = () : JSX.Element => {
    const [questions, setQuestions] = useState<QuestionData[]>([]);

    // To get query params from the url(localhost:3000/items?name=pen)
    // use the useLocation() hook in react router v5
    const search = useLocation().search;

    // Lets get Criteria query parameter from the browser.
    const searchParams = new URLSearchParams(search);

    const searchValue = searchParams.get('criteria') || '';
    console.log("searchValue: ",searchValue)
    // Invoke the search when the component first renders and when the search
    // variable changes using the useEffect hook.
    useEffect(() => {
        const doSearch = async(criteria: string) =>{
            const foundResults = await searchQuestions(criteria);
            setQuestions(foundResults);
        };
        doSearch(searchValue);
    },[searchValue]);

    // We are going to render the search criteria under the page title
    return (
        <Page title="Search Results">
            {searchValue && (
                <p css={css`
                    font-size: 16px;
                    font-style: italic;
                    margin-top: 0px;
                `}>
                for "{searchValue}"
                </p>
            )}
            <QuestionList data_array={questions}/>
        </Page>
    )

}

export const SearchPag = () => <Page title="Search Results"/>
