import React from 'react';
import { get } from "../../../../utils/ApiCaller";
import {
    ACCOUNT__GET_PROFILE
} from "../../../../utils/ApiEndpoint";
import LocalStorageUtils, { LOCAL_STORAGE_KEY } from "../../../../utils/LocalStorage";
import moment from 'moment';
import './viewProfile.css';

import {
    Form, Input, Radio, Icon, DatePicker, Select, Row, Col, Card, Avatar, Spin, Button, Modal
} from 'antd';

const { Option } = Select;
const { Meta } = Card;
const { TextArea } = Input;

class ViewProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            loading: false,
            visibleModalInfo: false,
            loadingModalInfo: false,
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let listParam = ['email', 'name', 'gender', 'phone', 'dayOfBirth', 'address', 'linkFb']
        this.props.form.validateFields(listParam, (err, fieldsValue) => {
            if (err) {
                return;
            }

            // Should format date value before submit.
            const values = {
                ...fieldsValue,
                'dayOfBirth': fieldsValue['dayOfBirth'].format("YYYY-MM-DD HH:mm:ss"),

            };
            console.log('Received values of form: ', values);
        });
    }

    async componentDidMount() {
        this.setState({
            loading: true,
        })
        await get(
            ACCOUNT__GET_PROFILE + LocalStorageUtils.getItem(LOCAL_STORAGE_KEY.STUDENT_ID),
            {},
            {
                Authorization:
                    "Bearer " + LocalStorageUtils.getItem(LOCAL_STORAGE_KEY.JWT)
            }
        ).then(res => {
            this.setState({
                data: res.data,
                loading: false,
            });
            this.setState({
                data: {
                    ...this.state.data,
                    dayOfBirth: this.state.data.dayOfBirth.split("T")[0] + " " + this.state.data.dayOfBirth.split("T")[1].split(".")[0],
                }
            })
        }).catch(err => {
            console.log(ACCOUNT__GET_PROFILE + LOCAL_STORAGE_KEY.STUDENT_ID);
        })
    }

    handleEdit = () => {
        this.setState({
            visibleModalInfo: true,
        });
    }

    handleSubmitModal = (e) => {
        e.preventDefault();
        this.props.form.validateFields(['aboutMe'], (err, values) => {
            if(!err){
                console.log('Received values of form: ', values);
            }
        });
    }

    handleOk = () => {
        this.setState({ loadingModalInfo: true });
        setTimeout(() => {
            this.setState({ loadingModalInfo: false, visibleModalInfo: false });
        }, 3000);
    }

    handleCancel = () => {
        this.setState({ visibleModalInfo: false });
    }

    render() {
        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
        };
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            style: {
                margin: "0 0 0 25px",
            }
        };

        const metaLayout = {
            style: {
                margin: "0 0 10px 0",
            }
        };

        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '84',
        })(
            <Select style={{ width: 70 }}>
                <Option value="84">+84</Option>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );


        return (
            <Spin spinning={this.state.loading}>

                <Row>
                    <Col span={7}>
                        <Card
                            style={{ width: 300 }}
                            cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                            actions={[<Icon type="edit" onClick={this.handleEdit} />, <Icon type="lock" />]}
                        >
                            <Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={this.state.data.name}
                                description={this.state.data.aboutMe}
                            />
                        </Card>

                        <Form layout="inline" onSubmit={this.handleSubmitModal.bind(this)}>
                            <Modal
                                visible={this.state.visibleModalInfo}
                                title="Update Info"
                                onCancel={this.handleCancel}
                                footer={[
                                    <Button key="back" onClick={this.handleCancel}>Return</Button>,
                                    <Button key="submit" type="primary" loading={this.state.loadingModalInfo} onClick={this.handleSubmitModal.bind(this)}>
                                        Submit
                                    </Button>,
                                ]}
                            >
                                <Form.Item
                                    {...formItemLayout}
                                    label="About me"
                                >
                                    {getFieldDecorator('aboutMe')(
                                        <TextArea rows={3} />
                                    )}
                                </Form.Item>
                            </Modal>
                        </Form>

                    </Col>
                    <Col span={17}>
                        <Form className="formProfile" onSubmit={this.handleSubmit.bind(this)} layout="vertical">
                            <Card title="My account">
                                <Card>
                                    <Meta
                                        description="USER INFORMATION"
                                        {...metaLayout}
                                    />
                                    <Row>
                                        <Col span={12}>
                                            <Form.Item
                                                {...formItemLayout}
                                                label={"Student ID"}
                                            >
                                                {getFieldDecorator('studentId', {
                                                    initialValue: this.state.data.studentId
                                                })(
                                                    <Input disabled />
                                                )}
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                {...formItemLayout}
                                                label={"E-mail"}
                                            >
                                                {getFieldDecorator('email', {
                                                    rules: [{
                                                        type: 'email', message: 'The input is not valid E-mail!',
                                                    }, {
                                                        message: 'Please input your E-mail!',
                                                    }],
                                                    initialValue: this.state.data.email
                                                })(
                                                    <Input />
                                                )}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={15} >
                                            <Form.Item
                                                {...formItemLayout}
                                                label={"Full name"}
                                            >
                                                {getFieldDecorator('name', {
                                                    rules: [{ message: 'Please input your nickname!', whitespace: true }],
                                                    initialValue: this.state.data.name,
                                                })(
                                                    <Input />
                                                )}
                                            </Form.Item>
                                        </Col>
                                        <Col span={9}>
                                            <Form.Item
                                                {...formItemLayout}
                                                label="Phone Number"
                                            >
                                                {getFieldDecorator('phone', {
                                                    rules: [{ message: 'Please input your phone number!' }],
                                                    initialValue: this.state.data.phone,
                                                })(
                                                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                                                )}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={15}>
                                            <Form.Item
                                                {...formItemLayout}
                                                label={"Link facebook"}
                                            >
                                                {getFieldDecorator('linkFb', {
                                                    rules: [{ message: 'Please input your link facebook!', whitespace: true }],
                                                    initialValue: this.state.data.linkFb,
                                                })(
                                                    <Input />
                                                )}
                                            </Form.Item>
                                        </Col>
                                        <Col span={9}>
                                            <Form.Item
                                                {...formItemLayout}
                                                label="Gender"
                                            >
                                                {getFieldDecorator('gender', {
                                                    initialValue: this.state.data.gender,
                                                })(
                                                    <Radio.Group>
                                                        <Radio value={true}>Male</Radio>
                                                        <Radio value={false}>Female</Radio>
                                                    </Radio.Group>
                                                )}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Card>
                                <div style={{ width: "100%", border: "1px solid #e8e8e8" }}></div>
                                <Card>
                                    <Meta
                                        description="CONTACT INFORMATION"
                                        {...metaLayout}
                                    />
                                    <Row>
                                        <Col span={17}>
                                            <Form.Item
                                                {...formItemLayout}
                                                label={"Address"}
                                            >
                                                {getFieldDecorator('address', {
                                                    rules: [{ message: 'Please input address!', whitespace: true }],
                                                    initialValue: this.state.data.address,
                                                })(
                                                    <Input />
                                                )}
                                            </Form.Item>
                                        </Col>
                                        <Col span={7}>
                                            <Form.Item
                                                {...formItemLayout}
                                                label="Day of birth"
                                            >
                                                {getFieldDecorator('dayOfBirth', {
                                                    initialValue: moment(this.state.data.dayOfBirth),
                                                }, config)(
                                                    <DatePicker format="YYYY-MM-DD HH:mm:ss" />
                                                )}
                                            </Form.Item>
                                        </Col>


                                    </Row>
                                    <Row>
                                        <Col span={8}>
                                            <Form.Item
                                                {...formItemLayout}
                                                label={"Major"}
                                            >
                                                {getFieldDecorator('major', {
                                                    initialValue: this.state.data.major,
                                                })(
                                                    <Input disabled />
                                                )}
                                            </Form.Item>
                                        </Col>

                                        <Col span={8}>
                                            <Form.Item
                                                {...formItemLayout}
                                                label={"Course"}
                                            >
                                                {getFieldDecorator('course', {
                                                    initialValue: this.state.data.course
                                                })(
                                                    <Input disabled />
                                                )}
                                            </Form.Item>
                                        </Col>

                                        <Col span={8}>
                                            <Form.Item
                                                {...formItemLayout}
                                                label={"Role in F-Code"}
                                            >
                                                {getFieldDecorator('role', {
                                                    initialValue: this.state.data.role,
                                                })(
                                                    <Input disabled />
                                                )}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Card>
                                <Form.Item
                                    style={{ textAlign: "center" }}
                                >
                                    <Button
                                        type="primary"
                                        key="submit"
                                        onClick={this.handleSubmit.bind(this)}
                                    >
                                        Save profile
                                    </Button>
                                </Form.Item>
                            </Card>

                        </Form>
                    </Col>
                </Row>

            </Spin>
        );
    }
}

export default Form.create()(ViewProfile);
