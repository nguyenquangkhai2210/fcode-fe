import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Input,
  Table
} from "reactstrap";

class Alerts extends React.Component {
  //For Dismiss Button with Alert
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      calendar: ["10/12 to 16/12", "17/12 to 23/12", "24/12 to 30/12"],
	  isChooseCalendar: "10/12 to 16/12",
	  arrayDate : ["10/12","11/12","12/12","13/12","14/12","15/12","16/12"]
    };
  }

  change = event => {
    console.log(this.state.isChooseCalendar);
	this.setState({ isChooseCalendar: event.target.value });
  };

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
                <CardTitle>Calendar</CardTitle>
              </div>
              <div className="ml-auto d-flex no-block align-items-center">
                <div className="dl">
                  <Input
                    type="select"
                    className="custom-select"
                    onChange={ev => this.change(ev)}
                    value={this.state.isChooseCalendar}
                  >
                    {this.state.calendar.map(date => (						
                      <option value={this.state.calendar.includes(date)}>{date}</option>
                    ))}
                  </Input>
                </div>
              </div>
            </div>
            <Table className="no-wrap v-middle" responsive>
              <thead>
                <tr className="border-0">
                </tr>
              </thead>
              <tbody>
                {/* {this.state.data.map(data => (
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
                          ))} */}
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
