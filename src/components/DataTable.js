import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import { getUsers } from '../services/AddUsers'
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faStop } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Urls from '../services/Urls';
import axios from 'axios';
import UsersContext from '../context/UsersContext';
function DataTable() {
    const { usersList, getAllUsersOnStartUp } = useContext(UsersContext)
    const [selectedRows, setSelectedRows] = useState([]);
    const [filterKeyword, setFilterKeyword] = useState('')
    const [Loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        group: '',
    });

    // Function to handle checkbox selection
    const handleCheckboxChange = (rowId) => {
        if (selectedRows.includes(rowId)) {
            setSelectedRows(selectedRows.filter((id) => id !== rowId));
        } else {
            setSelectedRows([...selectedRows, rowId]);
        }

    };
    // Function to handle "Select All" checkbox selection
    const handleSelectAllChange = () => {
        if (selectedRows.length === usersList.length) {
            setSelectedRows([]);
        } else {
            const allRowIds = usersList.map((data) => data.id);
            setSelectedRows(allRowIds);
        }
    };
    const onSearchForProduct = (event) => {
        const searchWord = event.target.value
        setFilterKeyword(searchWord)
        console.log(searchWord)
    }
    const handleChange = async (event) => {
        setLoading(true)

        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        for (var item in selectedRows) {
            console.log(selectedRows)
            console.log(value)
            console.log(name)
            const res = await axios.put(Urls.Users_url + "/" + selectedRows[item], {
                "name": usersList.find((value) => value.id == selectedRows[item]).name,
                "username": usersList.find((value) => value.id == selectedRows[item]).username,
                "email": usersList.find((value) => value.id == selectedRows[item]).email,
                "group": value,
                "status": usersList.find((value) => value.id == selectedRows[item]).status,
                "createdOn": usersList.find((value) => value.id == selectedRows[item]).createdOn,

            })
        }
        getAllUsersOnStartUp()

        setLoading(false)

    };
    const isAllSelected = selectedRows.length === usersList.length;

    return (
        <>
            <Container fluid style={{ backgroundColor: 'white' }}>
                <Row className='p-4' >

                    <Row >
                        <Col xs={8}>
                            <div className='d-flex justify-content-evenly '>
                                <div>
                                    <input placeholder="Search" className='form-control' onKeyUp={onSearchForProduct} />
                                </div>
                                <div>
                                    <input placeholder="user name" className='form-control' />
                                </div>
                                <div>
                                    <input type="date" className='form-control' id="created" name="created" onSelect={onSearchForProduct} />
                                </div>
                                <div>
                                    <select class="form-select" id="form-select" aria-label="Default select example" onChange={onSearchForProduct}>
                                        <option value="Locked">Locked</option>
                                        <option value="avtive">Active</option>
                                        <option value="inactive">Inacvtive</option>
                                    </select>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    {selectedRows.length != 0 ?
                        <Row className='my-2'>
                            <Col xs={6}>
                                <div className='d-flex justify-content-evenly  align-items-center'>
                                    <div>
                                        <h6 className='text-muted'>{selectedRows.length} Selected</h6>
                                    </div>
                                    <div>
                                        <Button className='btn btn-light'>
                                            <FontAwesomeIcon icon={faPen} className='fa-1x text-muted' />

                                        </Button>
                                    </div>
                                    <div>
                                        <Button className='btn btn-light'>
                                            <FontAwesomeIcon icon={faLock} className='fa-1x text-muted' />

                                        </Button>
                                    </div>
                                    <div> <Button className='btn btn-light'>
                                        <FontAwesomeIcon icon={faStop} className='fa-1x text-muted' />

                                    </Button></div>

                                    <div>
                                        <Button className='btn btn-light'>
                                            Assign to Profile
                                        </Button>

                                    </div>
                                    <div>
                                        <Form.Group controlId="formgroup">
                                            <Form.Control
                                                as="select"
                                                name="group"
                                                value={formData.group}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select a Group</option>
                                                <option value="Office">Office</option>
                                                <option value="Managers">Managers</option>
                                                <option value="Headoffice">Head Office</option>
                                                {/* Add more options as needed */}
                                            </Form.Control>
                                        </Form.Group>
                                    </div>



                                </div>
                            </Col>

                        </Row>
                        : <></>
                    }

                    <Row>
                        {Loading ? <><div style={{ minHeight: '70vh' }} className="d-flex justify-content-center align-items-center "><Spinner animation="border" variant='main' role="status" >
                            <span className="visually-hidden">Loading...</span>
                        </Spinner></div></> : <table className="table">
                            <thead>
                                <tr>
                                    <th>
                                        <Form.Check
                                            type="checkbox"
                                            checked={isAllSelected}
                                            onChange={handleSelectAllChange}
                                        />
                                    </th>

                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Group</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Created On</th>

                                </tr>
                            </thead>
                            <tbody>
                                {usersList.filter((user) => {
                                    if (filterKeyword === '') {
                                        return true
                                    } else {
                                        return user?.username.toLowerCase().includes(filterKeyword) || user?.createdOn?.includes(filterKeyword) || user?.status?.includes(filterKeyword)

                                    }
                                }).map((user) =>

                                    <tr>

                                        <td>
                                            <Form.Check
                                                type="checkbox"
                                                checked={selectedRows.includes(user.id)}
                                                onChange={() => handleCheckboxChange(user.id)}
                                            />

                                        </td>
                                        <th scope="row">{user.id}</th>
                                        <td>{user.username.toLowerCase()}</td>
                                        <td>{user.email}</td>
                                        <td>{user.group}</td>
                                        <td>{user.status}</td>
                                        <td>{user.createdOn}</td>
                                    </tr>

                                )}


                            </tbody>
                        </table>}

                    </Row>

                </Row>
            </Container>

        </>
    )
}

export default DataTable