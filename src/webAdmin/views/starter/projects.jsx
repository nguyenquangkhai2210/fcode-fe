import React from "react";
import { get } from "../../../utils/ApiCaller";
import { EVENT_GET__BY_TYPE, EVENT_PENDING } from "../../../utils/ApiEndpoint";
import LocalStorageUtils, { LOCAL_STORAGE_KEY } from "../../../utils/LocalStorage";
import { message, Spin } from "antd";
import {
	Card,
	CardBody,
	CardTitle,
	Input,
	Table,
} from 'reactstrap';

class Projects extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			loading: false,
		}
	}

	async componentDidMount() {
		this.setState({
			loading: true,
		})
		await get(EVENT_GET__BY_TYPE + "6",
			{},
			{ 'Authorization': 'Bearer ' + LocalStorageUtils.getItem(LOCAL_STORAGE_KEY.JWT) })
			.then(res => {
				this.setState({
					data: res.data,
					loading: false
				});
				if (this.state.data.length === 0) {
					alert("Data is empty")
				}
			})
	}

	ViewRequestJoin = async (eventID) => {
		await get(EVENT_PENDING + eventID,
			{},
			{ 'Authorization': 'Bearer ' + LocalStorageUtils.getItem(LOCAL_STORAGE_KEY.JWT) })
			.then(res => {
				if (res.status) {
					this.props.history.push(`/admin/pending/${eventID}`);
				}
			}).catch((error) => {
				message.error("Event not have peding request")
			});
	}

	ViewAttendance = async () => {
		await get(EVENT_GET__BY_TYPE + 3,
			{},
			{ 'Authorization': 'Bearer ' + LocalStorageUtils.getItem(LOCAL_STORAGE_KEY.JWT) })
			.then(res => {
				if (res.status) {
					this.props.history.push(`/admin/attendance/`);
				}
			}).catch((error) => {
				message.error("Event not have peding request")
			});
	}

	render() {
		return (
			/*--------------------------------------------------------------------------------*/
			/* Used In Dashboard-4 [General]                                                  */
			/*--------------------------------------------------------------------------------*/
			<Spin spinning={this.state.loading}>

				<Card>
					<CardBody>
						<div className="d-flex align-items-center">
							<div>
								<CardTitle>Event in F-Code</CardTitle>
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
									<th className="border-0">Event ID</th>
									<th className="border-0">Event Name</th>
									<th className="border-0">Location</th>
									<th className="border-0">Pending Request</th>
									<th className="border-0">Attendance</th>
								</tr>
							</thead>
							<tbody>
								{
									this.state.data.map((data) => (
										<tr key={data.eventId}>
											<td>
												{data.eventId}
											</td>
											<td>
												{data.eventName}
											</td>
											<td>
												{data.location}
											</td>
											<td>
												<button className="btn btn btn-outline-info" onClick={() => this.ViewRequestJoin(data.eventId)}>
													View request join
											</button>
											</td>
											<td>
												<button className="btn btn btn-outline-info" onClick={() => this.ViewAttendance()}>
													View attendance
											</button>
											</td>
										</tr>
									))
								}
							</tbody>
						</Table>
					</CardBody>
				</Card>
			</Spin>
		);
	}
}

export default Projects;
