import React from "react";
import { get } from "../../../utils/ApiCaller";
import { EVENT_GET_ALL } from "../../../utils/ApiEndpoint";
import LocalStorageUtils, { LOCAL_STORAGE_KEY } from "../../../utils/LocalStorage";

import {
	Card,
	CardBody,
	CardTitle,
	CardSubtitle,
	Input,
	Table,
	Tooltip
} from 'reactstrap';

class Projects extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
		}
	}

	async componentDidMount(){
		await get(EVENT_GET_ALL, 
			{}, 
			{'Authorization': 'Bearer ' + LocalStorageUtils.getItem(LOCAL_STORAGE_KEY.JWT)})
			.then(res => {
				this.setState({
					data: res.data
				});
			})

	}

	ViewRequestJoin = (eventID) => {
		console.log(eventID);
		this.props.history.push(`/pending/${eventID}`);
	}

	render() {
		return (
			/*--------------------------------------------------------------------------------*/
			/* Used In Dashboard-4 [General]                                                  */
			/*--------------------------------------------------------------------------------*/

			<Card>
				{console.log(this.state.data)}
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
											<button onClick ={ () => this.ViewRequestJoin(data.eventId)}>
												View request join
											</button>
										</td>
										<td>
											<button>
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
		);
	}
}

export default Projects;
