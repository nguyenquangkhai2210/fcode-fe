import React from "react";
import { get, put } from "../../../utils/ApiCaller";
import {
  EVENT__GET_LIST_PENDING,
  EVENT__APPROVE,
  EVENT__REJECT
} from "../../../utils/ApiEndpoint";
import LocalStorageUtils, { LOCAL_STORAGE_KEY } from "../../../utils/LocalStorage";
import { Card, Select, Form, Table, Button, message } from "antd";

const Option = Select.Option;
const { Column } = Table;
class Pending extends React.Component {
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
      EVENT__GET_LIST_PENDING + this.props.location.pathname.replace("/pending/", ""),
      {},
      {
        Authorization:
          "Bearer " + LocalStorageUtils.getItem(LOCAL_STORAGE_KEY.JWT)
      }
    )
      .then(res => {
        this.setState({
          data: res.data,
          listEvent: [],
          listAccount: res.data.account,
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          loading: false
        })
        message.error("Event not have pending request");
      })
  }

  handleApprove(data) {
    if (this.state.listEvent.length !== 2) {
      message.error("Please choose 2 event");
    } else {
      console.log(data);
      put(
        EVENT__APPROVE + data.accountEvent,
        {
          "listEvent": this.state.listEvent
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
      listEvent: [],
      listAccount: this.state.listAccount.filter(account => account.accountEvent !== data.accountEvent)
    });
  }

  handleReject(data) {
    put(
      EVENT__REJECT + data.accountEvent,
      {},
      {},
      {
        Authorization:
          "Bearer " + LocalStorageUtils.getItem(LOCAL_STORAGE_KEY.JWT)
      }
    );
    message.error("Rejected!");
    this.setState({
      listEvent: [],
      listAccount: this.state.listAccount.filter(account => account.accountEvent !== data.accountEvent)
    });
  }

  handleSelect(value) {
    this.setState({
      listEvent: value,
    });
  }

  render() {

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
                {this.state.data.event.map(data => { return <Option value={data.eventId}>{data.eventName}</Option> })}
              </Select>
            )}
          />
          <Column
            title="Approve"
            key="approve"
            render={(row) => (
              <Button type="primary" onClick={this.handleApprove.bind(this, row)}>
                Approve
            </Button>
            )}
          />
          <Column
            title="Reject"
            key="reject"
            render={(row) => (
              <Button type="danger" onClick={this.handleReject.bind(this, row)}>
                Reject
            </Button>
            )}
          />
        </Table>

      </Card>
    );
  }
}

export default Form.create()(Pending);
