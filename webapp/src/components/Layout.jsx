import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

const Layout = (props) => (
    <>
        <Container fluid className="center">
            <Row className="d-flex justify-content-center">
                <Col xl={4} lg={5} md={5} sm={7}>
                    <h1 style={{ margin: 30, textAlign: 'center' }}>
                        Event Registration
                    </h1>
                    {props.children}
                </Col>
            </Row>
        </Container>
    </>
)

Layout.propTypes = {
    children: PropTypes.element.isRequired
};

export default Layout;