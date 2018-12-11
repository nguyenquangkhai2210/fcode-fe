import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Input,
  Table
} from "reactstrap";
import { Calendar, Badge } from 'antd';
import "./alert.scss";

function getListData(value) {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
      ]; break;
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' },
      ]; break;
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'success', content: 'This is very long usual event。。....' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' },
      ]; break;
    default:
  }
  return listData || [];
}

function dateCellRender(value) {
  const listData = getListData(value);
  return (
    <ul className="events">
      {
        listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))
      }
    </ul>
  );
}

function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
}

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
}

class Alerts extends React.Component {
  //For Dismiss Button with Alert
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      calendar: ["12/10 to 12/16", "12/17 to 12/23", "12/24 to 12/30"],
      isChooseCalendar: '12/10 to 12/16',
    };
  }

  change = event => {
    this.setState({ isChooseCalendar: event.target.value });
    console.log(this.state.isChooseCalendar.split(" to "));
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
                      <option key={date} value={date}>{date}</option>
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
                <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />,
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
