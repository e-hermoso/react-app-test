// The keyword "interface" is a contract that defines a type with a collection of property and
// method defines a type with a collection of property and method definitions without any implementiation.

import { waitForElementToBeRemoved } from "@testing-library/react";
import Q from "q";

// Interface does not exist in javascript.
export interface QuestionData{
    // Type annotations let us declare varaiables, properties, and function paramters with specific types.
    // This allows the Typescript compiler to check that the code adheres to these types. In short, type 
    // annotations allow TypeScript to catch bugs where our code is using the wrong type.
    questionId: number;
    title: string;
    content: string;
    userName: string;
    created: Date;
    answers: AnswerData[];
}

export interface AnswerData{
    answerId: number;
    content: string;
    userName: string;
    created: Date;
}

const questions: QuestionData[] = [
    {
      questionId: 1,
      title: 'Why should I learn TypeScript?',
      content:
        'TypeScript seems to be getting popular so I wondered whether it is worth my time learning it? What benefits does it give over JavaScript?',
      userName: 'Bob',
      created: new Date(),
      answers: [
        {
          answerId: 1,
          content: 'To catch problems earlier speeding up your developments',
          userName: 'Jane',
          created: new Date(),
        },
        {
          answerId: 2,
          content:
            'So, that you can use the JavaScript features of tomorrow, today',
          userName: 'Fred',
          created: new Date(),
        },
      ],
    },
    {
      questionId: 2,
      title: 'Which state management tool should I use?',
      content:
        'There seem to be a fair few state management tools around for React - React, Unstated, ... Which one should I use?',
      userName: 'Bob',
      created: new Date(),
      answers: [],
    },
    {
      questionId: 3,
      title: 'Why should I learn Civil 3D?',
      content:
        'Civil 3d seems to be getting popular among civil engineers.',
      userName: 'Eric',
      created: new Date(),
      answers: [
        {
          answerId: 1,
          content: 'Its simple to use and provides alot of tools for drafting and designing',
          userName: 'Ben',
          created: new Date(),
        },
        {
          answerId: 2,
          content:
            'Civil 3d provides fine detail on road work.',
          userName: 'Ted',
          created: new Date(),
        },
      ],
    },
    {
      questionId: 4,
      title: 'Which .Net framework should I learn?',
      content:
        'Should I learn .Net Core 3.1 or learn .Net 6',
      userName: 'Tom',
      created: new Date(),
      answers: [],
    },
  ];

// export const getUnansweredQuestions = ():
// QuestionData[] => {
//     return questions.filter(q => q.answers.length ===0);
// }

// The getUnansweredQuestions function above doesn't  simulate a web API call very well becuase it isn't
// asynchronous. Lets change the function to be asynchronous
const wait = (ms: number): Promise<void> =>{
  return new Promise(resolve => setTimeout(resolve,ms));
}

// Lets add our wait function in our getUnansweredQestions function
// to waite half a second
export const getUnansweredQuestions = 
async (): Promise<QuestionData[]> =>{
  await wait(5000);
  return questions.filter(q => q.answers.length ===0);
};

// Lets add a function that wil simulate a web request to get a question
export const getQuestion = async(
  questionId: number
): Promise<QuestionData | null> => {
  await wait(500);
  const results = questions.filter(q => q.questionId === questionId);
  return results.length === 0 ? null : results[0];
};

// Lets create a function to simulate a search via a web request by using
// the filter method and matches the criteria to any part of the question
// title or content.
export const searchQuestions = async(criteria: string,): Promise<QuestionData[]> => {
  await wait(500);
  return questions.filter(q => q.title.toLowerCase().indexOf(criteria.toLowerCase()) >= 0 || q.content.toLowerCase().indexOf(criteria.toLowerCase()) >= 0);
};

// Lets create a function to simulate posting a question
// Note the function adds the question to the questions array using the Math.max
// method to set questionId to the next number.
export interface PostQuestionData{
  title: string;
  content: string;
  userName: string;
  created: Date;
}
export const postQuestion = async(
  question : PostQuestionData,
  ): Promise<QuestionData | undefined> =>{
    await wait(900);
    const questionId = Math.max(...questions.map( q => q.questionId)) + 1;
    const newQuestion: QuestionData = {
      ...question,
      questionId,
      answers: [],
    };
    questions.push(newQuestion);
    return newQuestion;
  }

  // Lets createa function to simulate posting an answer
  // The function finds the question in the questions array and adds
  // answer to it. The rmainder of the preceding code contains strightforward
  // types for the answer to post and the function result.
  export interface PostAnswerData {
    questionId: number;
    content: string;
    userName: string;
    created: Date;
  }
  
  export const postAnswer = async (
    answer: PostAnswerData,
  ): Promise<AnswerData | undefined> => {
    await wait(900);
    const question = questions.filter(q => q.questionId === answer.questionId)[0];
    const answerInQuestion: AnswerData = {
      answerId: 99,
      ...answer,
    };
    question.answers.push(answerInQuestion);
    return answerInQuestion;
  };
