import React from 'react';
import {
    Row,
    Col
} from 'reactstrap';
import Projects from './projects.jsx';

class Starter extends React.Component {
    render() {
        return (
            <div>
                <Row>
                    <Col sm={12}>
                        <Projects {...this.props} />
                    </Col>
                </Row>
            </div>
        );

    }
}

export default Starter;
