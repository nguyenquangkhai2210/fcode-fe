import React from "react";
import { get, put } from "../../utils/ApiCaller";
import {
  EVENT_PENDING,
  EVENT_APPROVE,
  EVENT_REJECT
} from "../../utils/ApiEndpoint";
import LocalStorageUtils, { LOCAL_STORAGE_KEY } from "../../utils/LocalStorage";
import { Card, Select, Form, Table, Button, message } from "antd";

const Option = Select.Option;
const { Column } = Table;
class Alerts extends React.Component {
  //For Dismiss Button with Alert
  constructor(props) {
    super(props);
    
    this.state = {
      data: [],
      listAccount: [],
      loading: false
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    await get(
      EVENT_PENDING + this.props.location.pathname.replace("/pending/", ""),
      {},
      {
        Authorization:
          "Bearer " + LocalStorageUtils.getItem(LOCAL_STORAGE_KEY.JWT)
      }
    ).then(res => {
      this.setState({
        data: res.data,
        listEvent: [],
        listAccount : res.data.account,
        loading: false
      });
    });
  }

  RemoveStudentInData = accountEventId => {

    // console.log(accountEventId);
    // console.log(this.state.data.account);
    
    
    this.setState({
      listAccount : this.state.listAccount.filter(data => data.accountEvent !== accountEventId)
    });
    // console.log(this.state.data.account);
  };

  ApproveStudent = (studentId, eventId, accountEvent) => {
    // this.RemoveStudentInData(accountEvent);
    put(
      EVENT_APPROVE + eventId + "/" + studentId,
      {},
      {},
      {
        Authorization:
          "Bearer " + LocalStorageUtils.getItem(LOCAL_STORAGE_KEY.JWT)
      }
    );
  };

  RejectStudent = (studentId, eventId, accountEvent) => {
    this.RemoveStudentInData(accountEvent);
    
  };


  handleApprove(data)
  {
      console.log("Day ne 2",this.state.listAccount);
      if (this.state.listEvent.length !== 2) {
          message.error("Please choose 2 event");
      } else{
        console.log(data);
        put(
            EVENT_APPROVE +  data.accountEvent,
            {
                "listEvent" : this.state.listEvent
            },
            {},
            {
              Authorization:
                "Bearer " + LocalStorageUtils.getItem(LOCAL_STORAGE_KEY.JWT)
            }
          );
      }
      message.success("Approved!");
      this.setState({
        listEvent : [],
        listAccount : this.state.listAccount.filter(account => account.accountEvent !== data.accountEvent)        
    });
  }

  handleReject(data)
  {
    put(
      EVENT_REJECT + data.accountEvent,
      {},
      {},
      {
        Authorization:
          "Bearer " + LocalStorageUtils.getItem(LOCAL_STORAGE_KEY.JWT)
      }
    );
    message.error("Rejected!");
      this.setState({
        listEvent : [],
        listAccount : this.state.listAccount.filter(account => account.accountEvent !== data.accountEvent)        
    });
  }



  handleSelect(value) {
    this.setState({
        listEvent : value,
    });
  }

  

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
       
        <Card title="Pending Request of Event" bordered={false} style={{ width: "100%" }}>
        <Table dataSource={this.state.listAccount} 
        loading={this.state.loading}
        pagination={false}
        >
        <Column
        title="Student ID"
        key="account.studentId"
        dataIndex="account.studentId"
        />
        <Column
        title="Full Name"
        key="fullname"
        dataIndex="account.name"
        />
        <Column
        title="Choose Time"
        key="time"
        render={() => (
            <Select style={{ width: 300 }} mode="multiple" placeholder="Please select" onChange={this.handleSelect.bind(this)}>
                {this.state.data.event.map(data => {return <Option value={data.eventId}>{data.eventName}</Option>})}
            </Select>
        )}
        />
        <Column
        title="Approve"
        key="approve"
        render={(row) => (
            <Button type="primary" onClick={this.handleApprove.bind(this,row)}>
            Approve
            </Button>
        )}
        />
        <Column
        title="Reject"
        key="reject"
        render={(row) => (
            <Button type="danger" onClick={this.handleReject.bind(this,row)}>
            Reject 
            </Button>
        )}
        />
        </Table>     

        </Card>
    );
  }
}

export default Form.create()(Alerts);
