import React, { Component } from "react";

import { post } from "../../utils/ApiCaller";
import { AUTH__LOGIN } from "../../utils/ApiEndpoint";
import LocalStorageUtils, { LOCAL_STORAGE_KEY } from "../../utils/LocalStorage";

import { Form, Icon, Input, Button, Checkbox, Layout, message } from "antd";

const { Content } = Layout;
const FormItem = Form.Item;

class LoginForm extends Component {
    componentDidMount() {
        if (LocalStorageUtils.isAuthenticated()) {
            this.props.history.push("/admin");
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.onLogin(values.studentId, values.password, token => {
                    console.log(token);
                    if (token) {
                        LocalStorageUtils.setItem(LOCAL_STORAGE_KEY.JWT, token);
                        LocalStorageUtils.setItem(
                            LOCAL_STORAGE_KEY.STUDENT_ID,
                            values.studentId
                        );
                        this.props.history.push("/admin");
                    } else {
                        message.error("Thông tin đăng nhập không chính xác!");
                    }
                });
            }
        });
    };

    onLogin(studentId, password, cb) {
        post(AUTH__LOGIN,{}, {
            studentId,
            password,
        },{'Content-Type': 'application/x-www-form-urlencoded'})
            .then(res => {
                console.log(res.headers);
                cb(res.headers.authorization.replace("Bearer  ", ""));
            })
            .catch(err => {
                cb(null);
            });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Content className="content-container">
                <div
                    style={{
                        display: "flex",
                        background: "#fff",
                        padding: "2rem",
                        minHeight: "100vh",
                    }}
                >
                    <div
                        style={{
                            padding: 20,
                            maxWidth: 400,
                            margin: "auto",
                        }}
                    >
                        <h2>Đăng nhập dành cho admin</h2>
                        <Form
                            onSubmit={this.handleSubmit}
                            className="login-form"
                            style={{ maxWidth: 360 }}
                        >
                            <FormItem>
                                {getFieldDecorator("studentId", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Vui lòng nhập email!",
                                        },
                                    ],
                                })(
                                    <Input
                                        prefix={
                                            <Icon
                                                type="user"
                                                style={{ color: "rgba(0,0,0,.25)" }}
                                            />
                                        }
                                        placeholder="Email"
                                    />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator("password", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Vui lòng nhập mật khẩu!",
                                        },
                                    ],
                                })(
                                    <Input
                                        prefix={
                                            <Icon
                                                type="lock"
                                                style={{ color: "rgba(0,0,0,.25)" }}
                                            />
                                        }
                                        type="password"
                                        placeholder="Mật khẩu"
                                    />
                                )}
                            </FormItem>
                            <FormItem>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                >
                                    Đăng nhập
                            </Button>
                                {getFieldDecorator("remember", {
                                    valuePropName: "checked",
                                    initialValue: true,
                                })(
                                    <Checkbox style={{ float: "right" }}>
                                        Ghi nhớ
                                </Checkbox>
                                )}
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </Content>
        );
    }
}

const Login = Form.create()(LoginForm);

export default Login;
