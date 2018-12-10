import React, { Component } from "react";
import { post } from "../../utils/ApiCaller";
import { AUTH__LOGIN } from "../../utils/ApiEndpoint";
import LocalStorageUtils, { LOCAL_STORAGE_KEY } from "../../utils/LocalStorage";

import {  message } from "antd";

import {
  Input,
  Form,
  Button,
  FormGroup,
  Label,
  Col,
  Row
} from "reactstrap";

// const imgUrl = '../../assets/images/background/login-bg.jpg';
import imgUrl from '../../assets/images/background/logo-bg-1.jpg';

class LoginForm extends Component {

    constructor(props) {
		super(props);
		this.state = {
            studentId : '',
            password : ''
		};
	}



  componentDidMount() {
    if (LocalStorageUtils.isRole() === "isAdmin") {
      this.props.history.push("/admin");
    } else if (LocalStorageUtils.isRole() === "isUser") {
      this.props.history.push("/user");
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.onLogin(this.state.studentId, this.state.password, token => {
        if (token) {
          LocalStorageUtils.setItem(LOCAL_STORAGE_KEY.JWT, token);
          LocalStorageUtils.setItem(
            LOCAL_STORAGE_KEY.STUDENT_ID,
            this.state.studentId
          );
          if (LocalStorageUtils.isRole() === "isAdmin") {
            this.props.history.push("/admin");
          } else if (LocalStorageUtils.isRole() === "isUser") {
            this.props.history.push("/user");
          }
        } else {
          message.error("Thông tin đăng nhập không chính xác!");
        }
      });
  };

  onLogin(studentId, password, cb) {
    post(
      AUTH__LOGIN,
      {},
      {
        studentId,
        password
      },
      { "Content-Type": "application/x-www-form-urlencoded" }
    )
      .then(res => {   
        cb(res.headers.authorization.replace("Bearer  ", ""));
      })
      .catch(err => {
          alert("Invalid Student ID or password")
      });
  }

  updateStudentId(evt){
    this.setState({
        studentId: evt.target.value
    });
  }

  updatePassword(evt){
    this.setState({
        password: evt.target.value
    });
  }

  render() {
    // const { getFieldDecorator } = this.props.form;

    return (
      <div className="content-container" >
        <div
          style={{
            display: "flex",
            backgroundImage : `url(${imgUrl})`,
            padding: "2rem",
            minHeight: "100vh"
          }}
        >
          <div
            style={{
              padding: 20,
              maxWidth: 600,
              margin: "auto"
            }}
          >
            <h1>Login in to F-Code</h1>
            <Form
              onSubmit={this.handleSubmit}
              className="login-form"
              style={{ maxWidth: 360 }}
            >
              <FormGroup row>
                <Label for="studentId" sm={3}>
                  ID
                </Label>
                <Col sm={9}>
                  <Input id="studentId" placeholder="Student ID" required value = {this.state.username} onChange={evt => this.updateStudentId(evt)} autoComplete="off" className="form-control"/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="password" sm={3}>
                  Password
                </Label>
                <Col sm={9}>
                  <Input id="password" type="password" placeholder="Mật khẩu" required value = {this.state.password} onChange={evt => this.updatePassword(evt)} className="form-control"/>
                </Col>
              </FormGroup>
              <Row>
              <Col sm={6}>
              <Button
                className="login-form-button btn-outline-primary"
              >
                Login
              </Button>
              </Col>
              <Col sm={6}>
              <Button
                className="btn-outline-secondary"
                type = "button"
              >
                Forgot Password
              </Button>
              </Col>
              </Row>
              
            </Form>
               
          </div>
        </div>
      </div>
    );
  }
}

const Login = LoginForm;

export default Login;
