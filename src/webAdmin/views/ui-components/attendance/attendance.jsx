import React from "react";
import { get, post } from "../../../../utils/ApiCaller";
import {
  EVENT_GET__BY_TYPE,
  EVENT_CREATE_DETAIL,
} from "../../../../utils/ApiEndpoint";
import LocalStorageUtils, { LOCAL_STORAGE_KEY } from "../../../../utils/LocalStorage";
import { Card, Form, Table, Button, Modal, DatePicker, Input, Tooltip, Icon, message } from "antd";


import "./attendance.css";

const { Column } = Table;
const FormItem = Form.Item;

class Attendance extends React.Component {
  //For Dismiss Button with Alert
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      dataTakeAttendance: [],
      listAccount: [],
      loading: false,
      visible: false,
      loadingModal: false,
      visibleTakeAttendance: false,
      loadingTakeAttendance: false
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    await get(
      EVENT_GET__BY_TYPE + 3,
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

  RemoveStudentInData = accountEventId => {
    this.setState({
      listAccount: this.state.listAccount.filter(data => data.accountEvent !== accountEventId)
    });
  };

  showModal = (eventId) => {
    this.setState({
      visible: eventId,
    });
  }

  createAttendance = async (eventId) => {
    await this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      this.setState({ loadingModal: true });
      // Should format date value before submit.
      const values = {
        ...fieldsValue,
        'date_time_picker': fieldsValue['date_time_picker'].format('YYYY-MM-DD HH:mm:ss'),
      };

      let detailName = values.detailName;
      let date = values.date_time_picker;
      post(EVENT_CREATE_DETAIL + eventId,
        {
          detailName,
          date
        },
        {},
        {
          Authorization:
            "Bearer " + LocalStorageUtils.getItem(LOCAL_STORAGE_KEY.JWT)
        })
        .then(res => {
          message.success("Created!");
          this.setState({ loadingModal: false, visible: false });
        })
        .catch(err => {
          message.error("Can't create!");
          this.setState({ loadingModal: false, visible: false });
        })
    });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCheckRow = (row) => {
    console.log(row.eventId);
  }

  takeAttendance = (eventId) => {
    this.props.history.push(`/admin/attendance/${eventId}`);
  }

  handleOkTakeAttendance = (e) => {
    this.setState({
      visibleTakeAttendance: false,
    });
  }

  handleCancelTakeAttendance = (e) => {
    this.setState({
      visibleTakeAttendance: false,
    });
  }
  render() {
    const { visible, loadingModal } = this.state;
    const { getFieldDecorator } = this.props.form;
    const config = {
      rules: [{ type: 'object', required: true, message: 'Please select time!' }],
    };
    return (
        <Card title="Attendance" bordered={false} style={{ width: "100%" }}>
          <Table dataSource={this.state.data}
            loading={this.state.loading}
            pagination={false}
          >
            <Column
              title="Event ID"
              key="eventId"
              dataIndex="eventId"
            />
            <Column
              title="Event Name"
              key="eventName"
              dataIndex="eventName"
            />
            <Column
              title="Location"
              key="location"
              dataIndex="location"
            />
            <Column
              title="Create attendance"
              key="create"
              render={(row) => (
                <div className="ant_modal">
                  <Button 
                    type="primary"
                    onClick={this.showModal.bind(this, row.eventId)}>
                    Create attendance
                </Button>
                  <Modal
                    className={row.eventId}
                    visible={visible === row.eventId ? true : false}
                    title="Title"
                    onOk={this.createAttendance}
                    onCancel={this.handleCancel}
                    footer={[
                      <Button 
                        key="back"
                        onClick={this.handleCancel}>
                        Return
                    </Button>,
                      <Button 
                        key="submit"
                        type="primary"
                        loading={loadingModal}
                        onClick={this.createAttendance.bind(this, row.eventId)}>
                        Submit
                    </Button>,
                    ]}
                  >
                    <FormItem
                      label="Date"
                    >
                      {getFieldDecorator('date_time_picker', config)(
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                      )}
                    </FormItem>
                    <FormItem
                      label={(
                        <span>
                          Detail Name&nbsp;
                        <Tooltip title="What do you want others to call you?">
                            <Icon type="question-circle-o" />
                          </Tooltip>
                        </span>
                      )}
                    >
                      {getFieldDecorator('detailName', {
                        rules: [{ required: true, message: 'Please input detail name!', whitespace: true }],
                      })(
                        <Input />
                      )}
                    </FormItem>
                  </Modal>
                </div>
              )}
            />
            <Column
              title="Take attendance"
              key="take"
              render={(row) => (
                <div>
                  <Button 
                    type="danger" 
                    onClick={this.takeAttendance.bind(this, row.eventId)}>
                    Take attendance
                </Button>
                </div>
              )}
            />
          </Table>
        </Card>
    );
  }
}

export default Form.create()(Attendance);
