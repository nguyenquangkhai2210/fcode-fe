import React from "react";
import { get } from "../../../utils/ApiCaller";
import {
  EVENT_GET_ALL_ACCOUNT,
} from "../../../utils/ApiEndpoint";
import LocalStorageUtils, { LOCAL_STORAGE_KEY } from "../../../utils/LocalStorage";
import { Card, Select, Form, Table, Button, message } from "antd";


class ListAccount extends React.Component {
  //For Dismiss Button with Alert
  constructor(props) {
    super(props);
    
    this.state = {
      listAccount: [],
      loading: false
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    await get(
      EVENT_GET_ALL_ACCOUNT,
      {},
      {
        Authorization:
          "Bearer " + LocalStorageUtils.getItem(LOCAL_STORAGE_KEY.JWT)
      }
    ).then(res => {
      this.setState({
        listAccount : res.data.account,
        loading: false
      });
    });
  }
  

  render() {

    return (
       
        <Card title="List all account" bordered={false} style={{ width: "100%" }}>
        <Table dataSource={this.state.listAccount} 
        loading={this.state.loading}
        pagination={false}
        >
        
        </Table>     

        </Card>
    );
  }
}

export default Form.create()(ListAccount);
