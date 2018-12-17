import React from "react";
import { get, post } from "../../utils/ApiCaller";
import {
  EVENT_GET__BY_TYPE,
  EVENT_CREATE_DETAIL
} from "../../utils/ApiEndpoint";
import LocalStorageUtils, { LOCAL_STORAGE_KEY } from "../../utils/LocalStorage";
import { Card, Form, Table, Button, Modal, DatePicker, Input, Tooltip, Icon } from "antd";
import "./attendance.css";

const { Column } = Table;
const FormItem = Form.Item;

class Alerts extends React.Component {
  //For Dismiss Button with Alert
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      listAccount: [],
      loading: false,
      visible: false,
      loadingModal: false
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

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = async (eventId) => {
    await this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      // Should format date value before submit.
      const values = {
        ...fieldsValue,
        'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
      };
      console.log('Received values of form: ', eventId);
      // post(EVENT_CREATE_DETAIL,
      //           {},
      //           {},
      //           {
      //             Authorization:
      //               "Bearer " + LocalStorageUtils.getItem(LOCAL_STORAGE_KEY.JWT)
      //           })
      this.setState({ loadingModal: true });
      setTimeout(() => {
        this.setState({ loadingModal: false, visible: false });
      }, 3000);
    });
  }

  handleCancel = () => {
    this.setState({ visible: false });
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
              
            )}
            // render={(row) => (
            //   <div className="ant_modal">
            //     <Button type="primary" onClick={this.showModal}>
            //       Create attendance
            //     </Button>
            //     <Modal
            //       visible={visible}
            //       title="Title"
            //       onOk={this.handleOk}
            //       onCancel={this.handleCancel}
            //       footer={[
            //         <Button key="back" onClick={this.handleCancel}>Return</Button>,
            //         <Button key="submit" type="primary" loading={loadingModal} onClick={this.handleOk.bind(this,row)}>
            //           Submit
            //         </Button>,
            //       ]}
            //     >
            //       <FormItem
            //         // {...formItemLayout}
            //         label="Date"
            //       >
            //         {getFieldDecorator('date-picker', config)(
            //           <DatePicker />
            //         )}
            //       </FormItem>
            //       <FormItem
            //         // {...formItemLayout}
            //         label={(
            //           <span>
            //             Detail Name&nbsp;
            //             <Tooltip title="What do you want others to call you?">
            //               <Icon type="question-circle-o" />
            //             </Tooltip>
            //           </span>
            //         )}
            //       >
            //         {getFieldDecorator('detailName', {
            //           rules: [{ required: true, message: 'Please input detail name!', whitespace: true }],
            //         })(
            //           <Input />
            //         )}
            //       </FormItem>
            //     </Modal>
            //   </div>
            // )}
          />
          <Column
            title="Take attendance"
            key="take"
            render={(row) => (
              <Button type="danger">
                Take attendance
            </Button>
            )}
          />
        </Table>

      </Card>
    );
  }
}

export default Form.create()(Alerts);
