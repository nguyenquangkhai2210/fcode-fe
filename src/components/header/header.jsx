import React from 'react';
import {
	Nav,
	Navbar,
	NavbarBrand,
	Collapse,
	DropdownItem,
	Button,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
} from 'reactstrap';
import LocalStorageUtils , { LOCAL_STORAGE_KEY } from "../../utils/LocalStorage";

import profilephoto from '../../assets/images/users/1.jpg';

/*--------------------------------------------------------------------------------*/
/* Import images which are need for the HEADER                                    */
/*--------------------------------------------------------------------------------*/
import logodarktext from '../../assets/images/logo-text.png';
import logolighttext from '../../assets/images/logo-light-text.png';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.showMobilemenu = this.showMobilemenu.bind(this);
		this.state = {
			isOpen: false
		};
	}
	/*--------------------------------------------------------------------------------*/
	/*To open NAVBAR in MOBILE VIEW                                                   */
	/*--------------------------------------------------------------------------------*/
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}
	/*--------------------------------------------------------------------------------*/
	/*To open SIDEBAR-MENU in MOBILE VIEW                                             */
	/*--------------------------------------------------------------------------------*/
	showMobilemenu() {
		document.getElementById('main-wrapper').classList.toggle('show-sidebar');
	}

	ViewFrofile = () => {
		this.props.history.push('/admin/viewProfile');
	}

	Logout = () =>{
		LocalStorageUtils.clear();
		window.location.reload();
	}

	render() {
		return (
			<header className="topbar navbarbg" >
				<Navbar className="top-navbar" dark expand="md">
					<div className="navbar-header" id="logobg"  data-logobg="skin6">
						{/*--------------------------------------------------------------------------------*/}
						{/* Logos Or Icon will be goes here for Light Layout && Dark Layout                */}
						{/*--------------------------------------------------------------------------------*/}
						<NavbarBrand style={{textAlign: "center"}} href="/">
							<span style={{width: "100%"}} className="logo-text">
								<img style={{width: "50px"}} src={logodarktext} alt="homepage" className="dark-logo" />
								<img
									src={logolighttext}
									className="light-logo"
									alt="homepage"
								/>
							</span>
						</NavbarBrand>
						{/*--------------------------------------------------------------------------------*/}
						{/* Mobile View Toggler  [visible only after 768px screen]                         */}
						{/*--------------------------------------------------------------------------------*/}
						<button className="nav-toggler d-block d-md-none" onClick={this.showMobilemenu}>
							<i className="ti-menu ti-close" />
						</button>
					</div>
					<Collapse className="navbarbg" isOpen={this.state.isOpen} navbar >
						<Nav className="ml-auto float-right" navbar>
							{/*--------------------------------------------------------------------------------*/}
							{/* Start Profile Dropdown                                                         */}
							{/*--------------------------------------------------------------------------------*/}
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav caret className="pro-pic">
									<img
										src={profilephoto}
										alt="user"
										className="rounded-circle"
										width="31"
									/>
									<Button color="primary" className="ml-3" outline>
									{LocalStorageUtils.getItem(LOCAL_STORAGE_KEY.STUDENT_ID)}
									</Button>
								</DropdownToggle>
								<DropdownMenu right>
									<DropdownItem onClick={() => this.ViewFrofile()}>
										<i className="ti-user mr-1 ml-1" /> My Account
                  </DropdownItem>
									<DropdownItem>
										<i className="ti-wallet mr-1 ml-1" /> My Balance
                  </DropdownItem>
									<DropdownItem>
										<i className="ti-email mr-1 ml-1" /> Inbox
                  </DropdownItem>
									<DropdownItem divider />
									<DropdownItem>
										<i className="ti-settings mr-1 ml-1" /> Account Settings
                  </DropdownItem>
									<DropdownItem divider />
									<DropdownItem onClick={() => this.Logout()}>
										<i className="fa fa-power-off mr-1 ml-1" /> Logout
                  </DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
							{/*--------------------------------------------------------------------------------*/}
							{/* End Profile Dropdown                                                           */}
							{/*--------------------------------------------------------------------------------*/}
						</Nav>
					</Collapse>
				</Navbar>
			</header>
		);
	}
}
export default Header;
