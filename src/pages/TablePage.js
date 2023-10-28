import { Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal } from 'react-bootstrap'
import DataTable from '../components/DataTable'
import EnhancedTable from '../components/DataTable'
import { getUsers } from '../services/AddUsers'
import Urls from '../services/Urls'

function TablePage() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        group: '',
        status: '',
        createdOn: new Date()
    });
    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await axios.post(Urls.Users_url, formData)
        console.log(formData);

    };

    // Function to handle input field changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));

    };


    return (
        <>
            <div className='d-flex justify-content-between'>
                <h3>User Managment </h3>
                <Col xs={1}>
                    <button className='btn btn-danger w-100' onClick={handleShow}  >Add</button>
                </Col>
            </div>
            <DataTable />
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formusername">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formemail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formgroup">
                            <Form.Label>Group</Form.Label>
                            <Form.Control
                                as="select"
                                name="group"
                                value={formData.group}
                                onChange={handleChange}
                            >
                                <option value="">Select a Group</option>
                                <option value="office">Office</option>
                                <option value="managers">Managers</option>
                                <option value="headoffice">Head Office</option>
                                {/* Add more options as needed */}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formstatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="">Select a status</option>
                                <option value="Locked">Locked</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inavtive</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formcreatedOn" className='d-none'>
                            <Form.Label>Created on</Form.Label>
                            <Form.Control
                                type="date"
                                name="createdOn"
                                value={formData.createdOn}
                                disabled // Disable editing of the "Created on" field
                            />
                        </Form.Group>
                        {/* Add more form fields here */}


                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit" onClick={handleClose}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Form></Modal.Body>

            </Modal>

        </>
    )
}

export default TablePage