/** @jsxRuntime classic /
/* @jsx jsx */
import { css, jsx } from '@emotion/react';
import { fontFamily, fontSize, gray2 } from './Styles';

import React from 'react';
import {Header} from './Header';
import {HomePage} from './HomePage';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { AskPage } from './AskPage';
import { SearchPage } from './SearchPage';
import { SignInPage } from './SignInPage';
import { NotFoundPage } from './NoFoundPage';
import { QuestionPage } from './QuestionPage';

// The BrowserRouter component will look for Route component nested within it
// and render the component defined if the route matches the location in the browser

const App: React.FC = () =>{
  return(
      <BrowserRouter>
      <div css={css`
      font-family: ${fontFamily};
      font-size: ${fontSize};
      color: ${gray2};
      `}>
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/ask" element={<AskPage/>}/>
          <Route path="/signin" element={<SignInPage />}/>
          <Route path="/questions/:questionId" element={<QuestionPage />}/>
          <Route path="*" element={<NotFoundPage />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

// function App() {
//   return (
//     <div>
//       <Header/>
//       <HomePage/>
//     </div>
//   );
// }

export default App;
