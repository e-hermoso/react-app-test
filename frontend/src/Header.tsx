/** @jsxRuntime classic /
/* @jsx jsx */
import { css, jsx } from '@emotion/react';
import { fontFamily, fontSize, gray1, gray2, gray5 } from './Styles';
import { ChangeEvent, FC, useState, FormEvent } from 'react';

import {UserIcon} from './Icons';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';


export const Header:FC = () : JSX.Element=> {
    // Add explicit return statement and implement
    // the handleSearchInputChange
    const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("handleSearchInputChange: ",e.currentTarget.value);

        // Update the state in this function
        setSearch(e.currentTarget.value)
    };

    let navigate = useNavigate();
    const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(`/search?criteria=${search}`);

    }

    // To get query params from the url(localhost:3000/items?name=pen)
    // use the useLocation() hook in react router v5
    const searchLocation = useLocation().search;

    // The default value for the search box is going to be the criteria
    // route query parameter.
    const searchParams = new URLSearchParams(searchLocation);
    const searchValue = searchParams.get('criteria') || '';

    // Lets create some state to store the search value in, defaulting it to
    // the 'criteria'
    const [search,setSearch] = useState(searchValue);

    return(
        <div css={css`
            position: fixed;
            box-sizing: border-box;
            top: 0;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 20px;
            background-color: #fff;
            border-bottom: 1px solid ${gray5};
            box-shadow: 0 3px 7px 0 rgba(110, 112, 114, 0.21);
        `}
        >
            <Link to="/" css={css`
                font-size: 24px;
                font-weight: bold;
                color: ${gray1};
                text-decoration: none;
                `}>AMC Q & A
            </Link>
            <form onSubmit={handleSearchSubmit}>
                <input 
                    type="text" 
                    placeholder="Search..."
                    value={search}
                    onChange={handleSearchInputChange}
                    css={css`
                    box-sizing: border-box;
                    font-family: ${fontFamily};
                    font-size: ${fontSize};
                    padding: 8px 10px;
                    border: 1px solid ${gray5};
                    border-radius: 3px;
                    color: ${gray2};
                    background-color: white;
                    width: 200px;
                    height: 30px;
                    :focus {
                    outline-color: ${gray5};
                    }
                `}
                />
            </form>
            <Link to="./signin" css={css`
                font-family: ${fontFamily};
                font-size: ${fontSize};
                padding: 5px 10px;
                background-color: transparent;
                color: ${gray2};
                text-decoration: none;
                cursor: pointer;
                span {
                margin-left: 10px;
                }
                :focus {
                outline-color: ${gray5};
                }
        `}>
                <UserIcon/>
                <span>SignIn</span>
            </Link>
        </div>
    )
};
