import React from 'react';
import { get, put } from "../../utils/ApiCaller";
import { EVENT_PENDING, EVENT_APPROVE, EVENT_REJECT } from "../../utils/ApiEndpoint";
import LocalStorageUtils, { LOCAL_STORAGE_KEY } from "../../utils/LocalStorage";

import {
	Card,
	CardBody,
	CardTitle,
	Table,
	Input,
} from 'reactstrap';

class Alerts extends React.Component {

	//For Dismiss Button with Alert
	constructor(props) {
		super(props);

		this.state = {
			data: []
		};
	}

	async componentDidMount() {
		await get(EVENT_PENDING + this.props.location.pathname.replace("/pending/", ""),
			{},
			{ 'Authorization': 'Bearer ' + LocalStorageUtils.getItem(LOCAL_STORAGE_KEY.JWT) })
			.then(res => {
				this.setState({
					data: res.data
				});
				if (this.state.data.length === 0) {
					alert("Data is empty")
				}
			})

	}

	RemoveStudentInData = (accountEventId) => {
		this.setState({
			data: this.state.data.filter(data => data.accountEvent !== accountEventId)
		})
	}

	ApproveStudent = (studentId, eventId, accountEvent) => {
		this.RemoveStudentInData(accountEvent);
		put(EVENT_APPROVE + eventId + "/" + studentId,
			{},
			{},
			{ 'Authorization': 'Bearer ' + LocalStorageUtils.getItem(LOCAL_STORAGE_KEY.JWT) })
	}

	RejectStudent = (studentId, eventId, accountEvent) => {
		this.RemoveStudentInData(accountEvent);
		put(EVENT_REJECT + eventId + "/" + studentId,
			{},
			{},
			{ 'Authorization': 'Bearer ' + LocalStorageUtils.getItem(LOCAL_STORAGE_KEY.JWT) })
	}

	render() {
		return <div>
			{/*--------------------------------------------------------------------------------*/}
			{/* Start Inner Div*/}
			{/*--------------------------------------------------------------------------------*/}

			{/*--------------------------------------------------------------------------------*/}
			{/*Card-1*/}
			{/*--------------------------------------------------------------------------------*/}
			<Card>
				{console.log(this.state.data)}
				<CardBody>
					<div className="d-flex align-items-center">
						<div>
							<CardTitle>Projects of the Month</CardTitle>
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

								<th className="border-0">Approve</th>
								<th className="border-0">Reject</th>
							</tr>
						</thead>
						<tbody>
							{
								this.state.data.map((data) => (
									<tr key={data.account.studentId}>
										<td>
											{data.account.studentId}
										</td>
										<td>
											{data.account.name}
										</td>
										<td>
											<button onClick={() => this.ApproveStudent(data.account.studentId, data.event.eventId, data.accountEvent)}>
												Approve
                                </button>
										</td>
										<td>
											<button onClick={() => this.RejectStudent(data.account.studentId, data.event.eventId, data.accountEvent)}>
												Reject
                                </button>
										</td>
									</tr>
								))
							}
						</tbody>
					</Table>
				</CardBody>
			</Card>

			{/*--------------------------------------------------------------------------------*/}
			{/*End Inner Div*/}
			{/*--------------------------------------------------------------------------------*/}
		</div>
	}
}

export default Alerts;
