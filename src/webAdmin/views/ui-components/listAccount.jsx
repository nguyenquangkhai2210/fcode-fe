import React from "react";
import { get } from "../../../utils/ApiCaller";
import {
  ACCOUNT__GET_ALL_ACCOUNT,
} from "../../../utils/ApiEndpoint";
import LocalStorageUtils, { LOCAL_STORAGE_KEY } from "../../../utils/LocalStorage";
import { Card, Form, Table, Button } from "antd";

const { Column } = Table;

class ListAccount extends React.Component {
  //For Dismiss Button with Alert
  constructor(props) {
    super(props);

    this.state = {
      listAccount: [],
      loading: false
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    await get(
      ACCOUNT__GET_ALL_ACCOUNT,
      {},
      {
        Authorization:
          "Bearer " + LocalStorageUtils.getItem(LOCAL_STORAGE_KEY.JWT)
      }
    ).then(res => {
      this.setState({
        listAccount: res.data,
        loading: false
      });
    });
  }

  viewProfile = (studentId) => {
    let path = this.props.match.path;
    this.props.history.push(`${path}/viewProfile/${studentId}`)
  }

  render() {

    return (

      <Card title="List all account" bordered={false} style={{ width: "100%" }}>
        <Table dataSource={this.state.listAccount}
          loading={this.state.loading}
          pagination={false}
        >
          <Column
            title="MSSV"
            key="studentId"
            dataIndex="studentId"
          />
          <Column
            title="Name"
            key="name"
            dataIndex="name"
          />
          <Column
            title="Gender"
            key="gender"
            render={row => (
              <div>
                {row.gender?"Male":"Female"}
              </div>
            )}
          />
          <Column
            title="Course"
            key="course"
            dataIndex="course.courseName"
          />
          <Column
            title="Major"
            key="major"
            dataIndex="major.majorName"
          />
          <Column
            title="View"
            key="viewProfile"
            render={row => (
              <Button type="primary" onClick={this.viewProfile.bind(this, row.studentId)}>
                View profile
              </Button>
            )}
          />
        </Table>

      </Card>
    );
  }
}

export default Form.create()(ListAccount);
