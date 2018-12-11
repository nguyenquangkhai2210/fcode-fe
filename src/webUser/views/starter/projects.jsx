import React from "react";
import { get, post } from "../../../utils/ApiCaller";
import { EVENT_GET__BY_TYPE, EVENT_JOIN } from "../../../utils/ApiEndpoint";
import LocalStorageUtils, {
  LOCAL_STORAGE_KEY
} from "../../../utils/LocalStorage";

import JWT_Decode from "jwt-decode";
import {message} from "antd";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Input,
  Table,
  Tooltip
} from "reactstrap";

class Projects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  async componentDidMount() {
    console.log(LocalStorageUtils.getItem(LOCAL_STORAGE_KEY.JWT));
    await get(
      EVENT_GET__BY_TYPE + "6",
      {},
      {
        Authorization:
          "Bearer " + LocalStorageUtils.getItem(LOCAL_STORAGE_KEY.JWT)
      }
    ).then(res => {
      this.setState({
        data: res.data
      });
      if (this.state.data.length === 0) {
        message.error("Data is empty");
      }
    });
  }

  JoinEvent = eventId => {
    var studentID = LocalStorageUtils.getItem(LOCAL_STORAGE_KEY.STUDENT_ID);
    console.log(studentID);
    post(
      EVENT_JOIN + eventId + "/" + studentID,
      {},
      {},
      {
        Authorization:
          "Bearer " + LocalStorageUtils.getItem(LOCAL_STORAGE_KEY.JWT)
      }
    )
      .then(res => {
        message.success("Join success");
      })
      .catch(err => {
        message.error("You can't join this event again");
      });
  };

  render() {
    return (
      /*--------------------------------------------------------------------------------*/
      /* Used In Dashboard-4 [General]                                                  */
      /*--------------------------------------------------------------------------------*/

      <Card>
        <CardBody>
          <div className="d-flex align-items-center">
            <div>
              <CardTitle>Projects of the Month</CardTitle>
              <CardSubtitle>Overview of Latest Month</CardSubtitle>
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
                <th className="border-0">Team Lead</th>
                <th className="border-0">Project</th>

                <th className="border-0">Status</th>
                <th className="border-0">Weeks</th>
                <th className="border-0">Budget</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(data => (
                <tr key={data.eventId}>
                  <td>{data.eventId}</td>
                  <td>{data.eventName}</td>
                  <td>{data.location}</td>
                  <td>
                    <button
                      className="btn btn btn-outline-info"
                      onClick={() => this.JoinEvent(data.eventId)}
                    >
                      Join
                    </button>
                  </td>
                  <td>
                    <button className="btn btn btn-outline-info">
                      Nothing
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    );
  }
}

export default Projects;
