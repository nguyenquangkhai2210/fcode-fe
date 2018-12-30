import React from "react";
import { get, put } from "../../../../utils/ApiCaller";
import {
  EVENT_GET_DETAIL_BY_ID,
  EVENT_GET_STUDENTS_ATTENDANCE,
  ATTENDANCE_TAKE_ATTENDANCE
} from "../../../../utils/ApiEndpoint";
import LocalStorageUtils, { LOCAL_STORAGE_KEY } from "../../../../utils/LocalStorage";
import { Card, Form, Table, DatePicker, Button, Modal, Radio, Input, message } from "antd";
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
      loadingModal: false,
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

  handleSubmit = (e) => {
    this.setState({
      loadingModal: true,
    })    
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        put(
          ATTENDANCE_TAKE_ATTENDANCE,
          values,
          {},
          {
            Authorization:
              "Bearer " + LocalStorageUtils.getItem(LOCAL_STORAGE_KEY.JWT)
          })
        .then(res => {
          message.success("Success!");
          this.setState({ 
            loadingModal: false, 
            visibleStudents: false,
          });
          
        })
        .catch(err =>{
          message.error("ERROR!!!");
          this.setState({ 
            loadingModal: false, 
          });
        })
      }
    });
  }


  render() {

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

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
            title="List"
            key="listStudent"
            render={(row) => (
              <div>
                <Button type="primary" onClick={this.getListStudents.bind(this, row.eventDetail)}>
                  List
                </Button>
                <Form onSubmit={this.handleSubmit}>
                  <Modal
                    title="Take Attendance"
                    style={{ minWidth: 800 }}
                    visible={this.state.visibleStudents === row.eventDetail ? true : false}
                    onOk={this.handleOkStudents}
                    onCancel={this.handleCancelStudents}
                    footer={[
                      <Button key="back" onClick={this.handleCancel}>Return</Button>,
                      <Button
                        key="submit"
                        type="primary"
                        loading={this.state.loadingModal}
                        onClick={this.handleSubmit}>
                        Submit
                      </Button>,
                    ]}
                  >
                    <Table dataSource={this.state.dataStudents}
                      loading={this.state.loadingStudents}
                      pagination={false}
                    >
                      <Column
                        title="AttendanceId"
                        key="attendanceId"
                        render={row => (
                          <Form.Item
                            {...formItemLayout}
                            style={{ margin: 0 }}
                          >
                            {getFieldDecorator('attendanceId', {
                              initialValue: row.attendanceId,
                            })(
                              <div>{row.attendanceId}</div>
                            )}
                          </Form.Item>
                        )}
                      />
                      <Column
                        title="StudentId"
                        key="studentId"
                        dataIndex="studentId"
                      />
                      <Column
                        title="Present"
                        key="present"
                        render={(row) => (
                          <Form.Item
                            style={{ margin: 0 }}
                          >
                            {getFieldDecorator(`present`, {
                              initialValue: false,
                            })(
                              <Radio.Group>
                                <Radio value={true}>Present</Radio>
                                <Radio value={false}>Absent</Radio>
                              </Radio.Group>
                            )}
                          </Form.Item>
                        )}
                      />
                      <Column
                        title="Note"
                        key="note"
                        render={(row) => (
                          <Form.Item
                            {...formItemLayout}
                            style={{ margin: 0 }}
                            label="Note"
                          >
                            {getFieldDecorator('note', {
                              initialValue: row.note,
                            })(
                              <Input placeholder="Input your note" />
                            )}
                          </Form.Item>
                        )}
                      />
                    </Table>
                  </Modal>
                </Form>
              </div>
            )}
          />
        </Table>
      </Card>
    );
  }
}

export default Form.create()(TakeAttendance);
