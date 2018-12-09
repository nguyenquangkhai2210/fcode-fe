import React from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
    Row,
    Col
} from 'reactstrap';
import Projects from './projects.jsx';

import img1 from '../../../assets/images/big/img1.jpg';
import img2 from '../../../assets/images/big/img2.jpg';
import img3 from '../../../assets/images/big/img3.jpg';

class Starter extends React.Component {
    render() {
        return (
            <div>
                <Row>
                    <Col sm={12}>
                        <Projects history={this.props.history} />
                    </Col>
                </Row>
            </div>
        );

    }
}

export default Starter;
