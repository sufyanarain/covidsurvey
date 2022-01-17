import React from "react";
import { Form, Input, Button } from "antd";
import { Row, Col } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
    let navigate = useNavigate();

    // admin hardcodded email and password on firebaseauth email: sufyan@gmail.com  pass: 123456

    const onFinish = (adminObj) => { // ant.design's function ,gives form data on finish
        signInWithEmailAndPassword(auth, adminObj.email, adminObj.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                navigate("/dashboard");

                // ...
            })
            .catch((error) => { });
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <>
            <h2>Login for Admin</h2>
            <Row>
                <Col span={12} offset={4}>
                    <Form
                        style={{ marginTop: 140 }}
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: "Please input your email!" }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                { required: true, message: "Please input your password!" },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Signin
                            </Button>

                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default SignIn;
