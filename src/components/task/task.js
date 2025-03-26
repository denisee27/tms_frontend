/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, FloatingLabel, Form, Table } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import axios from 'axios';
import moment from 'moment';
import { swalToastError, swalToastSuccess } from '../../utils/alertSwal';
import { toYMD } from '../../utils/dateConvert';

const TaskPage = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        due_date: new Date().setDate(new Date().getDate() + 7),
    })
    const [validated, setValidated] = useState(false);
    const [datas, setDatas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(10);
    const [sortDueDate, setSortDueDate] = useState();

    useEffect(() => {
        fetchTasks(currentPage, limit);
    }, [currentPage, limit, sortDueDate]);

    const fetchTasks = async (page, limit) => {
        try {
            const response = await axios.get(`${apiUrl}/tasks`, {
                params: { page, limit, sortDueDate }
            });
            setDatas(response.data.data);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const handleSubmitDelete = async () => {
        try {
            await axios.delete(`${apiUrl}/tasks/delete/${formData.id}`, formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            swalToastSuccess(`Delete Task Success`);
            resetFormData();
            fetchTasks();
            deleteCloseModal();
        } catch (error) {
            swalToastError(error)
            resetFormData();
            deleteCloseModal();
        }
    }

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        setValidated(true);

        if (form.checkValidity() === false) {
            event.stopPropagation();
            return;
        }
        const { id, ...formValues } = {
            ...formData,
            due_date: toYMD(formData.due_date),
        };
        try {
            await axios.put(`${apiUrl}/tasks/update/${formData.id}`, formValues, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            swalToastSuccess(`Update Task Success`);
            resetFormData();
            fetchTasks();
            editCloseModal();
        } catch (error) {
            swalToastError(error)
            resetFormData();
            editCloseModal();
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        setValidated(true);
        if (form.checkValidity() === false) {
            event.stopPropagation();
            return;
        }
        const formValues = {
            ...formData,
            due_date: toYMD(formData.due_date),
        };
        try {
            await axios.post(`${apiUrl}/tasks/create`, formValues, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            swalToastSuccess(`Create Task Success`);
            resetFormData();
            fetchTasks();
            addCloseModal();
        } catch (error) {
            swalToastError(error)
            resetFormData();
            addCloseModal();
        }
    };

    const handleSwitchTask = async (id, status) => {
        try {
            await axios.patch(`${apiUrl}/tasks/mark/${id}`, {
                status: !status
            });
            swalToastSuccess(`Marked as completed Update to ${!status ? 'Completed' : 'Pending'}`);
            fetchTasks();
        } catch (error) {
            swalToastError(error)
        }
    }

    const handleDate = (date) => {
        setFormData({ ...formData, due_date: toYMD(date) });
    };

    const resetFormData = () => {
        setFormData({
            title: "",
            description: "",
            due_date: new Date().setDate(new Date().getDate() + 7),
        });
        setValidated(false);
    };

    const [addshow, addShowState] = useState(false);
    const addModal = () => addShowState(true);
    const addCloseModal = () => addShowState(false);
    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const [editShow, editShowState] = useState(false);
    const editModal = () => editShowState(true);
    const editCloseModal = () => editShowState(false);
    const handleEdit = (data) => {
        editModal(true);
        setFormData({
            id: data.id,
            title: data.title,
            description: data.description,
            due_date: data.due_date,
        });
    };

    const [deleteshow, deleteShowState] = useState(false);
    const deleteModal = () => deleteShowState(true);
    const deleteCloseModal = () => deleteShowState(false);
    const handleDelete = (data) => {
        deleteModal(true);
        setFormData({
            id: data.id,
        });
    };

    return (
        <>
            <div className='mx-4 my-5 card p-4'>
                <h1>Task Management System</h1>
                <div className='text-end'>
                    <Button variant='primary' className='float-left me-3' onClick={addModal}>Add Task</Button>
                    <Button variant='warning' className='float-left' onClick={() => fetchTasks()}>
                        <i class="fa-solid fa-arrows-rotate"></i>
                    </Button>
                </div>
                <div className='mt-2'>
                    <Table className='text-center' hover bordered striped>
                        <thead>
                            <th style={{ width: "5%" }}>No</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>
                                <div className='d-flex justify-content-center'>
                                    Due Date
                                    <div className='ms-2'>
                                        <div onClick={() => setSortDueDate(sortDueDate == null ? 'ASC' : sortDueDate == 'ASC' ? 'DESC' : null)} style={{ cursor: 'pointer' }}>
                                            {sortDueDate == 'DESC' ? (
                                                <i class="fa-solid fa-sort-down"></i>
                                            ) : sortDueDate == 'ASC' ? (
                                                <i class="fa-solid fa-sort-up"></i>
                                            ) : (
                                                <i class="fa-solid fa-sort"></i>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </th>
                            <th>Progress</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </thead>
                        <tbody>
                            {datas.map((data, index) => (
                                <tr>
                                    <td>{index + 1} </td>
                                    <td>{data.title} </td>
                                    <td>{data.description}</td>
                                    <td>{moment(data.due_date).format('D MMMM YYYY')}</td>
                                    <td>
                                        <div className="d-flex justify-content-center">
                                            <Form.Check type="switch" checked={data.status == 1} onChange={() => handleSwitchTask(data.id, data.status)} />
                                            {data.status == 1 ? (
                                                <span className='text-light badge bg-success'>
                                                    Compeleted
                                                </span>
                                            ) : (
                                                <span className='text-light badge bg-warning'>
                                                    Pending
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td>{moment(data.createdAt).format('D MMMM YYYY - hh:mm')} </td>
                                    <td>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                                                Action
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1" onClick={() => handleEdit(data)}>
                                                    <i class="fa-solid fa-pen me-2"></i>
                                                    Edit
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleDelete(data)} className='text-danger'>
                                                    <i class="fa-solid fa-trash-can me-2"></i>
                                                    Delete
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <div className='d-flex justify-content-between'>
                        <div className='flex-nowrap d-flex small align-items-center'>
                            <label className='me-2'>Limit: </label>
                            <select
                                className='form-select form-select-sm'
                                id="limitSelect"
                                value={limit}
                                style={{ height: "30px" }}
                                onChange={(e) => setLimit(parseInt(e.target.value))}
                            >
                                <option value="2">2</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                        <div className='d-flex align-items-center'>
                            <div className='me-2'>
                                Total : {datas.length}
                            </div>
                            <button className='btn btn-sm border-0' onClick={() => setCurrentPage(1)} disabled={currentPage === 1} >
                                <i class="fa-solid fa-angles-left"></i>
                            </button>
                            <div>
                                <button className='btn btn-sm border-0' onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} >
                                    <i class="fa-solid fa-chevron-left"></i>
                                </button>
                                <span> {currentPage} / {totalPages} </span>
                                <button className='btn btn-sm border-0' onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </button>
                            </div>
                            <button className='btn btn-sm border-0' onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} >
                                <i class="fa-solid fa-angles-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={addshow} onHide={addCloseModal} backdrop="static" keyboard={false}>
                <Modal.Header >
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body>

                        <FloatingLabel label="Title" className="mb-3">
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInput}
                                required
                            />
                            <Form.Control.Feedback type="invalid">Title is required</Form.Control.Feedback>
                        </FloatingLabel>

                        <FloatingLabel label="Description" className="mb-3">
                            <Form.Control
                                as="textarea"
                                style={{ height: "100px" }}
                                name="description"
                                value={formData.description}
                                onChange={handleInput}
                                minLength={10}
                                maxLength={200}
                                required
                            />
                            <div className="invalid-feedback">
                                Description must be between 10 and 200 characters.
                            </div>
                        </FloatingLabel>

                        <div className="mb-3">
                            <FloatingLabel label="Due Date" className="mb-3">
                                <DatePicker
                                    onChange={handleDate}
                                    value={formData.due_date}
                                    className="form-control"
                                    format="yyyy-MM-dd"
                                    clearIcon={null}
                                    calendarIcon="📅"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">Description is required</Form.Control.Feedback>
                            </FloatingLabel>
                        </div>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => { addCloseModal(); resetFormData() }} >Close</Button>
                            <Button type='submit' variant="primary" >Submit</Button>
                        </Modal.Footer>
                    </Modal.Body>
                </Form>
            </Modal>

            <Modal show={editShow} onHide={editCloseModal} backdrop="static" keyboard={false}>
                <Modal.Header >
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleEditSubmit} >
                    <Modal.Body>

                        <FloatingLabel label="Title" className="mb-3">
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInput}
                                required
                            />
                            <Form.Control.Feedback type="invalid">Title is required</Form.Control.Feedback>
                        </FloatingLabel>

                        <FloatingLabel label="Description" className="mb-3">
                            <Form.Control
                                as="textarea"
                                style={{ height: "100px" }}
                                name="description"
                                value={formData.description}
                                onChange={handleInput}
                                minLength={10}
                                maxLength={200}
                                required
                            />
                            <div className="invalid-feedback">
                                Description must be between 10 and 200 characters.
                            </div>
                        </FloatingLabel>

                        <div className="mb-3">
                            <FloatingLabel label="Due Date" className="mb-3">
                                <DatePicker
                                    onChange={handleDate}
                                    value={formData.due_date}
                                    className="form-control"
                                    format="yyyy-MM-dd"
                                    clearIcon={null}
                                    calendarIcon="📅"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">Description is required</Form.Control.Feedback>
                            </FloatingLabel>
                        </div>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => { editCloseModal(); resetFormData(); }}>Close</Button>
                            <Button type='submit' variant="primary">Submit</Button>
                        </Modal.Footer>
                    </Modal.Body>
                </Form>
            </Modal>

            <Modal
                show={deleteshow}
                onHide={deleteCloseModal}
                backdrop="static"
                keyboard={false}>
                <Modal.Header>
                    <Modal.Title>Delete Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure want to delete this data?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={deleteCloseModal}>Close</Button>
                    <Button variant="danger" onClick={handleSubmitDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>

    );
};

export default TaskPage;