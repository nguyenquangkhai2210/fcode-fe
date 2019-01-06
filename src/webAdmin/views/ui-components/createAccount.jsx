import React from 'react';
import { get, post } from '../../../utils/ApiCaller';
import {
	COURSE__GET_ALL_COURSE,
	COURSE__CREATE_COURSE,
	MAJOR__GET_ALL_MAJOR, 
	ACCOUNT__CREATE_ACCOUNT, 
} from '../../../utils/ApiEndpoint';
import LocalStorageUtils, { LOCAL_STORAGE_KEY } from '../../../utils/LocalStorage';
import {
	Form, Input, Radio, Button, Card, Row, Col, Modal, Select, message
} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;

class CreateAccount extends React.Component {
	state = {
		confirmDirty: false,
		dataCourse: [],
		dataMajor: [], 
		visible: false,
		loading: false,
	};

	async componentDidMount() {
		await get(COURSE__GET_ALL_COURSE,
			{},
			{
				Authorization:
					"Bearer " + LocalStorageUtils.getItem(LOCAL_STORAGE_KEY.JWT)
			})
			.then(res => {
				this.setState({
					dataCourse: res.data,
				})
			})

		await get(MAJOR__GET_ALL_MAJOR, 
			{},
			{
				Authorization:
					"Bearer " + LocalStorageUtils.getItem(LOCAL_STORAGE_KEY.JWT)
			})
			.then( res => {
				this.setState({
					dataMajor: res.data,
				})
			})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		let listParam = ['name', 'confirm', 'course', 'major', 'gender', 'password', 'studentId']
		this.props.form.validateFieldsAndScroll(listParam, (err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				post(ACCOUNT__CREATE_ACCOUNT, 
					values,
					{},
					{
						Authorization: 
							"Bearer: " + LocalStorageUtils.getItem(LOCAL_STORAGE_KEY.JWT)
					})
					.then( res => {
						message.success("Finish");
					})
					.catch ( err => {
						message.error("Can't create");
					})
			}
		});
	}

	handleConfirmBlur = (e) => {
		const value = e.target.value;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	}

	compareToFirstPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
			callback('Two passwords that you enter is inconsistent!');
		} else {
			callback();
		}
	}

	validateToNextPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && this.state.confirmDirty) {
			form.validateFields(['confirm'], { force: true });
		}
		callback();
	}

	handleSubmitCourse = (e) => {
		e.preventDefault();
		this.props.form.validateFields(['newCourseName'], (err, values) => {
			if (!err) {
				console.log(values);
			}
		})
	}

	handleCancel = () => {
		this.setState({
			visible: false,
		})
	}

	showModal = () => {
		this.setState({
			visible: true,
		})
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 8 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 },
			},
		};
		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0,
				},
				sm: {
					span: 16,
					offset: 8,
				},
			},
		};

		return (
			<Card title="Create account"
				bordered={false}
				style={{ width: "100%" }}
				extra={<Button type="primary" onClick={this.showModal}>More course</Button>}
			>
				<Form onSubmit={this.handleSubmitCourse.bind(this)}>
					<Modal
						title="Add course"
						visible={this.state.visible}
						onCancel={this.handleCancel}
						footer={[
							<Button key="back" onClick={this.handleCancel}>Return</Button>,
							<Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleSubmitCourse.bind(this)}>
								Submit
							</Button>,
						]}
					>
						<Form.Item
							label="Course name"
						>
							{
								getFieldDecorator('newCourseName', {
									rules: [{ required: true, message: 'Please input course name!', whitespace: true }],
								})(
									<Input />
								)
							}
						</Form.Item>
					</Modal>
				</Form>

				<Row>
					<Col span={12} offset={6}>
						<Form onSubmit={this.handleSubmit.bind(this)}>
							<FormItem
								{...formItemLayout}
								label="StudentID"
							>
								{getFieldDecorator('studentId', {
									rules: [{ required: true, message: 'Please input your studentID!', whitespace: true }],
								})(
									<Input />
								)}
							</FormItem>
							<FormItem
								{...formItemLayout}
								label="Password"
							>
								{getFieldDecorator('password', {
									rules: [{
										required: true, message: 'Please input your password!',
									}, {
										validator: this.validateToNextPassword,
									}],
								})(
									<Input type="password" />
								)}
							</FormItem>
							<FormItem
								{...formItemLayout}
								label="Confirm Password"
							>
								{getFieldDecorator('confirm', {
									rules: [{
										required: true, message: 'Please confirm your password!',
									}, {
										validator: this.compareToFirstPassword,
									}],
								})(
									<Input type="password" onBlur={this.handleConfirmBlur} />
								)}
							</FormItem>
							<FormItem
								{...formItemLayout}
								label="Name"
							>
								{getFieldDecorator('name', {
									rules: [{ required: true, message: 'Please input your name!', whitespace: true }],
								})(
									<Input />
								)}
							</FormItem>
							<FormItem
								{...formItemLayout}
								label="Gender"
							>
								{getFieldDecorator('gender')(
									<RadioGroup>
										<Radio value="a">Male</Radio>
										<Radio value="b">Female</Radio>
									</RadioGroup>
								)}
							</FormItem>
							<FormItem
								{...formItemLayout}
								label="E-mail"
							>
								{getFieldDecorator('email', {
									rules: [{
										type: 'email', message: 'The input is not valid E-mail!',
									}, {
										required: true, message: 'Please input your E-mail!',
									}],
								})(
									<Input />
								)}
							</FormItem>
							<FormItem
								{...formItemLayout}
								label="Course"
							>
								{getFieldDecorator('course', { initialValue: 1 })(
									<Select>
										{this.state.dataCourse.map((course) => (
											<Option key={course.courseId} value={course.courseId}>{course.courseName}</Option>
										))}
									</Select>
								)}
							</FormItem>
							<FormItem
								{...formItemLayout}
								label="Major"
							>
								{getFieldDecorator('major', { initialValue: 1 })(
									<Select>
										{this.state.dataMajor.map((major) => (
											<Option key={major.majorId} value={major.majorId}>{major.majorName}</Option>
										))}
									</Select>
								)}
							</FormItem>

							<FormItem {...tailFormItemLayout}>
								<Button type="primary" htmlType="submit">Register</Button>
							</FormItem>
						</Form>
					</Col>
				</Row>
			</Card>

		);

	}
}

export default Form.create()(CreateAccount);



