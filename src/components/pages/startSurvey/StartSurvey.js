
import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase';
import Nav from '../../nav/Nav';
import './startSurvey.css'
import { Button, Radio, Checkbox, Input, Typography } from 'antd';

const { Title } = Typography;

const StartSurvey = () => {
    const [questions, setQuestions] = useState([]);
    let [quesCounterStart, setQuesCounterStart] = useState(0);
    let [singleAns, setSingleAns] = useState({});
    let [multiAns, setMultiAns] = useState({});
    let ansss = { ...multiAns };
    let [ansNo, setAnsNo] = useState('ans');

    const [ansGet, setAnsGet] = useState([]);
    let ansArr = [...ansGet];
    console.log(ansGet);

    // console.log(questions[quesCounterStart]);

    useEffect(() => {

        onSnapshot(doc(db, "questions", "12345"), (doc) => {
            setQuestions(doc.data().questions);
        });

    }, [])

    const singleHandler = (e) => {
        let anss = { ans: e.target.value };
        setSingleAns(anss);

    }

    const multipleHandler = (e) => {
        ansss[e.target.value] = e.target.value;
        setMultiAns(ansss);
        console.log(multiAns);
    }

    const increment = () => {
        setQuesCounterStart(++quesCounterStart);
        setAnsNo('ans' + quesCounterStart);
        ansArr.push(singleAns);
        setAnsGet(ansArr);


        setMultiAns({})
    }
    return (
        <div>
            <Nav />
            <h1>start survey</h1>
            <div className='displayQuestions'>
                {questions[quesCounterStart] &&

                    <div>
                        <Title className='questHead' level={4}>Question {quesCounterStart}</Title>
                        <Title className='quest' level={4}>{questions[quesCounterStart].question}</Title>

                        {questions[quesCounterStart].responseType === 'single' ? <div className='radioGroup'>

                            <Radio.Group  >
                                <Radio onChange={singleHandler} value={'yes'} >Yes</Radio><br /><br />
                                <Radio onChange={singleHandler} value={'no'} >No</Radio>
                            </Radio.Group>

                        </div> : ''}
                        {questions[quesCounterStart].responseType === 'multiple' ? <div className='checkBoxDiv'>
                            {questions[quesCounterStart].options.map((op) => {

                                return <div> <Checkbox onChange={multipleHandler} className='checkBoxes' value={op.option} >{op.option}</Checkbox><br /><br /></div>

                            })}
                        </div> : ''}

                        {questions[quesCounterStart].responseType === 'data' ? <div className='dataInput'>

                            <Input placeholder="input and" />

                        </div> : ''}


                    </div>

                }


                {questions.length > quesCounterStart ? <Button className='nextBtn' onClick={increment}>Next</Button> : 'Completed'}

            </div>
        </div>
    )
}

export default StartSurvey
