import React from 'react'
import Nav from '../../components/nav/Nav'
import Question from './question/Question'
import './dashboard.css'
import StartSurvey from '../startSurvey/StartSurvey'

const DashBoard = () => {
    return (
        <div>
            <Nav />
            <Question />
            <div className='DisplayQuestions'>
            </div>
        </div>
    )
}

export default DashBoard
