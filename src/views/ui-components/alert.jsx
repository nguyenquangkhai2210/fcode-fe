import React from "react";
import { get, put } from "../../utils/ApiCaller";
import {
  EVENT_PENDING,
  EVENT_APPROVE,
  EVENT_REJECT
} from "../../utils/ApiEndpoint";
import LocalStorageUtils, { LOCAL_STORAGE_KEY } from "../../utils/LocalStorage";
import { Card, CardBody, CardTitle, Table, Input } from "reactstrap";
import { Checkbox } from "antd";

class Alerts extends React.Component {
  //For Dismiss Button with Alert
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      listAccount: [],
      listEvent: [],
    };
  }

  async componentDidMount() {
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
        listAccount: res.data.account,
        listEvent: res.data.event,
      });
    });
  }

  RemoveStudentInData = accountEventId => {
    this.setState({
      data: this.state.data.filter(data => data.accountEvent !== accountEventId)
    });
    if (this.state.data.length === 0) {
      window.location.reload();
    }
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
    put(
      EVENT_REJECT + eventId + "/" + studentId,
      {},
      {},
      {
        Authorization:
          "Bearer " + LocalStorageUtils.getItem(LOCAL_STORAGE_KEY.JWT)
      }
    );
  };

  // onChange = (eventId) => {
  //   this.setState({
  //     checkedList : [ ...this.state.checkedList, eventId],
  //   });
  //   console.log(this.state.checkedList);
  // }

  CheckBoxEvent(event)
  {
    return <Checkbox value={event.eventId} >{event.eventName} </Checkbox>
  }

  render() {
    return (
      <div>
        {/*--------------------------------------------------------------------------------*/}
        {/* Start Inner Div*/}
        {/*--------------------------------------------------------------------------------*/}

        {/*--------------------------------------------------------------------------------*/}
        {/*Card-1*/}
        {/*--------------------------------------------------------------------------------*/}
        <Card>
          <CardBody>
            <div className="d-flex align-items-center">
              <div>
                <CardTitle>Pending Request of Event </CardTitle>
              </div>
              <div className="ml-auto d-flex no-block align-items-center">
                <div className="dl">
                  <Input type="select" className="custom-select">
                    <option value="0">Monthly</option>
                    <option value="1">Daily</option>
                    <option value="2">Weekly</option>
                    <option value="3">Yearly</option>
                  </Input>
                </div>
              </div>
            </div>
            <Table className="no-wrap v-middle" responsive>
              <thead>
                <tr className="border-0">
                  <th className="border-0">Student ID</th>
                  <th className="border-0">Full Name</th>
                  <th className="border-0">Choose Time</th>
                  <th className="border-0">Approve</th>
                  <th className="border-0">Reject</th>
                </tr>
              </thead>
              <tbody>
                {this.state.listAccount.map(data => (
                  <tr key={data.account.studentId}>
                    <td>{data.account.studentId}</td>
                    <td>{data.account.name}</td>
                    <td>
                      {this.state.listEvent.map(data => this.CheckBoxEvent(data))}
                    </td>
                    <td>
                      <button className="btn btn btn-outline-success">
                        Approve 
                      </button>
                    </td>
                    <td>
                      <button className="btn btn btn-outline-danger">
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>

        {/*--------------------------------------------------------------------------------*/}
        {/*End Inner Div*/}
        {/*--------------------------------------------------------------------------------*/}
      </div>
    );
  }
}

export default Alerts;
