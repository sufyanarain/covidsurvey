import { Form, Input, Button, Switch, Select, Space, Col } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './question.css'
import { useState } from 'react';
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import {db} from '../../../components/firebase'



const { Option } = Select;
const Question = () => {
    const [form] = Form.useForm();


    const [responseType, setResponseType] = useState('single')
    const [questions, setQuestions] = useState([]);
    const questionsArr = [...questions];


    const onFinish = (questionObj) => { //ant.design functin,gives data on save question form,

        if (questionObj.failResponse === undefined) {
            questionObj.failResponse = true
        }

        if (questionObj.failPass === undefined) {
            questionObj.failPass = true
        }
        questionsArr.push(questionObj)
        setQuestions(questionsArr)

        if (questionObj.responseType === 'multiple') {
            questionObj.options.forEach(element => {
                if (element.failPass === undefined) {
                    element.failPass = true;
                }
            });

        }
        onReset()

    };

    const createSurveyHandler = () => {
        setDoc(doc(db, "questions", '12345'), {
            questions,
            createdDate: serverTimestamp()
        }).then(() => {
            console.log('data sent');
        })
    }
    const onFinishFailed = (errorInfo) => {
    };

    function onChange(checked) {
    }

    function handleChange(value) {
        setResponseType(value)
    }

    const onReset = () => {
        form.resetFields();
    };

    return (
        <div className='questionDiv'>

            <Form
                name="questionForm"
                form={form}
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    offset: 0,
                    span: 8,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="EN"
                    name="question"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                {responseType !== 'multiple' ?
                    <Form.Item
                        label="Fail response"
                        name="failResponse"
                        rules={[
                            {
                                required: false,

                            },
                        ]}
                    >
                        <Switch autoFocus='true' defaultChecked='false' checkedChildren="Yes" unCheckedChildren="No" onChange={onChange} />
                    </Form.Item>
                    : ''
                }

                <Form.Item
                    label="Type of Response"
                    name="responseType"
                    rules={[
                        {
                            required: true,

                        },
                    ]}
                >
                    <Select defaultValue="Please Select response type" Selected='single' style={{ width: 259 }} onChange={handleChange}>
                        <Option >Please Select response type</Option>
                        <Option value="single">Single</Option>
                        <Option value="multiple">Multiple</Option>
                        <Option value="data">Data</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    {/* *********** start  multiple options ********* */}
                    {responseType === 'multiple' ?
                        <Form.List name="options">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'option']}
                                                rules={[{ required: true, message: 'input option' }]}
                                            >
                                                <Input placeholder="Option" />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'failPass']}

                                            >
                                                <Switch autoFocus='true' defaultChecked='false' checkedChildren="Yes" unCheckedChildren="No" onChange={onChange} />
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button style={{ width: 260 }} type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add options
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>

                        : ''
                    }
                    {/* *********** end  multiple options ********* */}
                    <Form.Item
                        label="Fail/Pass"
                        name="failPass"
                        rules={[
                            {
                                required: false,

                            },
                        ]}
                    >
                        <Switch autoFocus='true' defaultChecked='false' checkedChildren="Fail/Pass" unCheckedChildren="Data" onChange={onChange} />
                    </Form.Item >
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
            <Button onClick={createSurveyHandler} >Create Form</Button>
        </div >
    );
};

export default Question;