import React, { Component } from "react";
import { post } from "../../utils/ApiCaller";
import { AUTH__LOGIN } from "../../utils/ApiEndpoint";
import LocalStorageUtils, { LOCAL_STORAGE_KEY } from "../../utils/LocalStorage";
import { message, Icon, Input, Form , Button} from "antd";


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentId: "",
      password: ""
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
    this.props.form.validateFields((err, values) => {
        if (!err) {
            this.onLogin(values.studentId, values.password, token => {
                if (token) {
                  LocalStorageUtils.setItem(LOCAL_STORAGE_KEY.JWT, token);
                  LocalStorageUtils.setItem(
                    LOCAL_STORAGE_KEY.STUDENT_ID,
                    values.studentId
                  );
                  if (LocalStorageUtils.isRole() === "isAdmin") {
                    this.props.history.push("/admin");
                  } else if (LocalStorageUtils.isRole() === "isUser") {
                    this.props.history.push("/user");
                  }
                }
            });
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
        message.error("Invalid Student ID or Password");
      });
  }


  render() {

    const { getFieldDecorator } = this.props.form;

    return (
      <div className="content-container">
        <div
          style={{
            display: "flex",
            // backgroundImage: `url(${imgUrl})`,
            background: "#fff",
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
              <Form.Item>
                {getFieldDecorator("studentId", {
                    rules: [
                        {
                            required: true,
                            message: "Please input Student ID",
                            
                        },
                    ],
                })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Student ID"
                />
                )}
              </Form.Item>
              <Form.Item>
              {getFieldDecorator("password", {
                    rules: [
                        {
                            required: true,
                            message: "Please input Password",
                        },
                    ],
                })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                  autoComplete="off"
                />
                )}
              </Form.Item>
            
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Login
                </Button>
                <Button style={{ float: "right" }}
                    type="primary"
                    htmlType="button"
                >
                  Forgot Password
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const Login = Form.create()(LoginForm);

export default Login;
