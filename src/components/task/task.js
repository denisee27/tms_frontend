import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { Button, FloatingLabel, Form, Table } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import moment from 'moment';
import { swalToastSuccess } from '../../Services/alertswal';
import { toYMD } from '../../Services/dateconvert';
import { useHttpService } from '../../Services/httpservice';
import { usePageQueryService } from '../../Services/pagequery';

const TaskPage = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const initialFormData = {
        title: "",
        description: "",
        due_date: "",
    };
    const [formData, setFormData] = useState(initialFormData)
    const { get, destroy, put, post, patch } = useHttpService();
    const { queryPage, setQueryPage } = usePageQueryService();
    const [validated, setValidated] = useState(false);
    const [datas, setDatas] = useState({});
    const [sortDueDate, setSortDueDate] = useState();

    const fetchTasks = useCallback(async () => {
        const response = await get("tasks", queryPage);
        if (response?.success) {
            setDatas(response.response);
        }
    }, [get, queryPage]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks, queryPage.limit, queryPage.page]);

    const handleSubmitDelete = async () => {
        const response = await destroy("tasks/delete/" + formData.id);
        if (response.success) {
            swalToastSuccess(`Delete Task Success`);
        }
        setFormData(initialFormData);
        setValidated(false);
        fetchTasks();
        deleteCloseModal();
    }

    const handleUpdate = async (event) => {
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
        const response = await put(`tasks/update/${formData.id}`, formValues);
        if (response.success) {
            swalToastSuccess(`Update Task Success`);
        }
        setFormData(initialFormData);
        setValidated(false);
        fetchTasks();
        editCloseModal();
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
        const response = await post(`tasks/create`, formValues);
        if (response.success) {
            swalToastSuccess(`Create Task Success`);
        }
        setFormData(initialFormData);
        setValidated(false);
        fetchTasks();
        addCloseModal();
    };

    const handleSwitchTask = async (id, status) => {
        const response = await patch(`${apiUrl}/tasks/mark/${id}`, { status: !status });
        if (response.success) {
            swalToastSuccess(`Marked as completed Update to ${!status ? 'Completed' : 'Pending'}`);
        }
        fetchTasks();
    }

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
    const editCloseModal = () => editShowState(false);
    const handleEdit = (data) => {
        editShowState(true);
        setFormData({
            id: data.id,
            title: data.title,
            description: data.description,
            due_date: data.due_date,
        });
    };

    const [deleteshow, deleteShowState] = useState(false);
    const deleteCloseModal = () => deleteShowState(false);
    const handleDelete = (data) => {
        deleteShowState(true);
        setFormData({
            id: data.id,
        });
    };

    return (
        <>
            <div className='col-sm-12 mx-auto'>
                <div className="card">
                    <div className="card-body">
                        <div className='d-flex justify-content-between'>
                            <h4 className='card-title'>Task Management System</h4>
                            <div className='text-end'>
                                <Button variant='primary' className='float-left me-2' onClick={addModal}>Add Task</Button>
                                <Button variant='warning' className='float-left' onClick={() => fetchTasks()}>
                                    <i className="fa-solid fa-arrows-rotate"></i>
                                </Button>
                            </div>
                        </div>
                        {datas?.data?.length > 0 ? (
                            <div className='mt-2'>
                                <Table className='text-center' hover bordered striped>
                                    <thead>
                                        <tr>
                                            <th style={{ width: "5%" }}>No</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>
                                                <div className='d-flex justify-content-center'>
                                                    Due Date
                                                    <div className='ms-2'>
                                                        <div onClick={() => setSortDueDate(sortDueDate === null ? 'ASC' : sortDueDate === 'ASC' ? 'DESC' : null)} style={{ cursor: 'pointer' }}>
                                                            {sortDueDate === 'DESC' ? (
                                                                <i className="fa-solid fa-sort-down"></i>
                                                            ) : sortDueDate === 'ASC' ? (
                                                                <i className="fa-solid fa-sort-up"></i>
                                                            ) : (
                                                                <i className="fa-solid fa-sort"></i>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </th>
                                            <th>Progress</th>
                                            <th>Created At</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {datas.data.map((data, index) => (
                                            <tr key={data.id}>
                                                <td>{index + 1} </td>
                                                <td>{data.title} </td>
                                                <td>{data.description}</td>
                                                <td>{moment(data.due_date).format('DD MMMM YYYY')}</td>
                                                <td>
                                                    <div className="d-flex justify-content-center">
                                                        <Form.Check type="switch" checked={data.status === true} onChange={() => handleSwitchTask(data.id, data.status)} />
                                                        {data.status === true ? (
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
                                                        <Dropdown.Toggle variant="outline-primary" >
                                                            Action
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu>
                                                            <Dropdown.Item href="#/action-1" onClick={() => handleEdit(data)}>
                                                                <i className="fa-solid fa-pen me-2"></i>
                                                                Edit
                                                            </Dropdown.Item>
                                                            <Dropdown.Item onClick={() => handleDelete(data)} className='text-danger'>
                                                                <i className="fa-solid fa-trash-can me-2"></i>
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
                                            value={queryPage.limit}
                                            style={{ height: "30px" }}
                                            onChange={(e) => {
                                                setQueryPage((prev) => ({ ...prev, limit: e.target.value, page: 1 }));
                                            }}
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
                                        <button
                                            className='btn btn-sm border-0'
                                            onClick={() => setQueryPage((prev) => ({ ...prev, page: 1 }))}
                                            disabled={queryPage.page === 1}>
                                            <i className="fa-solid fa-angles-left"></i>
                                        </button>

                                        <button
                                            className='btn btn-sm border-0'
                                            onClick={() => setQueryPage((prev) => ({ ...prev, page: Math.max(prev.page - 1, 1) }))}
                                            disabled={queryPage.page === 1}>
                                            <i className="fa-solid fa-chevron-left"></i>
                                        </button>

                                        <div>
                                            <span> {queryPage.page} / {datas.totalPages} </span>
                                        </div>

                                        <button
                                            className='btn btn-sm border-0'
                                            onClick={() => setQueryPage((prev) => ({ ...prev, page: Math.min(prev.page + 1, datas.totalPages) }))}
                                            disabled={queryPage.page === datas.totalPages}>
                                            <i className="fa-solid fa-chevron-right"></i>
                                        </button>

                                        <button
                                            className='btn btn-sm border-0'
                                            onClick={() => setQueryPage((prev) => ({ ...prev, page: datas.totalPages }))}
                                            disabled={queryPage.page === datas.totalPages}>
                                            <i className="fa-solid fa-angles-right"></i>
                                        </button>

                                    </div>
                                </div>
                            </div>
                        ) :
                            (
                                <h4 className='text-center my-4'>
                                    No data found
                                </h4>
                            )}
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
                        <FloatingLabel label="Due Date" className="mb-3">
                            <DatePicker
                                onChange={(date) => setFormData({ ...formData, due_date: toYMD(date) })}
                                value={formData.due_date}
                                format="yyyy-MM-dd"
                                clearIcon={null}
                                calendarIcon="📅"
                                style={{ border: "none", outline: "none", boxShadow: "none" }}
                                className="form-control custom-datepicker"
                                required
                            />
                        </FloatingLabel>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => {
                                addCloseModal(); setFormData(initialFormData);
                                setValidated(false);
                            }}>Close</Button>
                            <Button type='submit' variant="primary" >Submit</Button>
                        </Modal.Footer>
                    </Modal.Body>
                </Form>
            </Modal>

            <Modal show={editShow} onHide={editCloseModal} backdrop="static" keyboard={false}>
                <Modal.Header >
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleUpdate} >
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
                                    onChange={(date) => setFormData({ ...formData, due_date: toYMD(date) })}
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
                            <Button variant="secondary" onClick={() => {
                                editCloseModal(); setFormData(initialFormData);
                                setValidated(false);
                            }}>Close</Button>
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