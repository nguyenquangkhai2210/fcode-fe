import React from "react";
import { get } from "../../../utils/ApiCaller";
import {
  EVENT_GET_DETAIL_BY_ID,
  EVENT_GET_STUDENTS_ATTENDANCE
} from "../../../utils/ApiEndpoint";
import LocalStorageUtils, { LOCAL_STORAGE_KEY } from "../../../utils/LocalStorage";
import { Card, Form, Table, DatePicker, Button, Modal } from "antd";
import moment from 'moment';

import "./attendance.css";

const { Column } = Table;

class TakeAttendance extends React.Component {
  //For Dismiss Button with Alert
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: false,
      visibleStudents: false,
      dataStudents: [],
      loadingStudents: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    let url_Array = this.props.history.location.pathname.split("/");
    let eventId = url_Array[(url_Array.length) - 1];
    await get(
      EVENT_GET_DETAIL_BY_ID + eventId,
      {},
      {
        Authorization:
          "Bearer " + LocalStorageUtils.getItem(LOCAL_STORAGE_KEY.JWT)
      }
    ).then(res => {
      this.setState({
        data: res.data,
        loading: false
      });
    });
  }

  getListStudents = async (eventId) => {
    this.setState({
      loadingStudents: true,
    })
    await get(
      EVENT_GET_STUDENTS_ATTENDANCE + eventId,
      {},
      {
        Authorization:
          "Bearer " + LocalStorageUtils.getItem(LOCAL_STORAGE_KEY.JWT)
      }
    ).then(res => {
      this.setState({
        dataStudents: res.data,
        visibleStudents: eventId,
        loadingStudents: false
      })
    })
  }

  handleOkStudents = (e) => {
    this.setState({
      visibleStudents: false,
    });
  }

  handleCancelStudents = (e) => {
    this.setState({
      visibleStudents: false,
    });
  }

  render() {
    return (
      <Card title="Attendance" bordered={false} style={{ width: "100%" }}>
        <Table dataSource={this.state.data}
          loading={this.state.loading}
          pagination={false}
        >
          <Column
            title="Detail ID"
            key="eventDetail"
            dataIndex="eventDetail"
          />
          <Column
            title="Name"
            key="detailName"
            dataIndex="detailName"
          />
          <Column
            title="Date"
            key="dateEvent"
            render={(row) => (
              <DatePicker defaultValue={moment(row.dateEvent.split("T")[0] + " " + row.dateEvent.split("T")[1].split(".")[0])}
                format="YYYY-MM-DD HH:mm:ss"
                disabled />
            )}
          />
          <Column
            title="List student"
            key="listStudent"
            render={(row) => (
              <div>
                <Button type="primary" onClick={this.getListStudents.bind(this, row.eventDetail)}>
                  List student
                </Button>
                <Modal
                  title="Take Attendance"
                  visible={this.state.visibleStudents === row.eventDetail ? true : false}
                  onOk={this.handleOkStudents}
                  onCancel={this.handleCancelStudents}
                >
                  <Table dataSource={this.state.dataStudents}
                    loading={this.state.loadingStudents}
                    pagination={false}
                  >
                    <Column
                      title="AttendanceId"
                      key="attendanceId"
                      dataIndex="attendanceId"
                    />
                    <Column
                      title="StudentId"
                      key="studentId"
                      dataIndex="studentId"
                    />
                  </Table>
                </Modal>
              </div>
            )}
          />
        </Table>
      </Card>
    );
  }
}

export default Form.create()(TakeAttendance);
