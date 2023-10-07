import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setTasks} from '../slices/taskSlice';
import { useGetTasksMutation } from '../slices/taskSlice';
import Loader from '../components/Loader';
import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TaskScreen = () => {
  const todo = useSelector((state) => state.task.todo); 
  const inProgress = useSelector((state) => state.task.inProgress); 
  const done = useSelector((state) => state.task.done); 
  const isFetched = useSelector((state) => state.task.isFetched);
  const [selectedTask, setSelectedTask] = useState(null);

  const [getTasks, {isLoading}] = useGetTasksMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  // const closeDescription = () => {
  //   setSelectedTask(null);
  // };
  const handleStatusChange = () => {
    // Update the task status here, e.g., by sending a request to the server or modifying the task object.
    // For this example, let's assume you have a function to update the task status.

    // Update the task status in the backend or modify the task object locally.
    // updateTaskStatus(task._id, newStatus);

    // After updating the task status, you can also close the description if needed.
    };

  useEffect(() => {
    if(todo.length === 0 && inProgress.length === 0 && done.length === 0) {
      const fetchData = async () => {   
        try {
          const res = await getTasks().unwrap();
          dispatch(setTasks(res))
          console.log("hello")
        } catch (err) {
          toast.error(err?.data?.message || err.error);
      }};    
      fetchData();
    }
  },[todo, inProgress, done]);

  const handleAddTask = () => {
    navigate('/createtask')
  }

  return (
    <div className="mx-0">
      <Container>
        <div className="my-0 ">
          <h1 className="my-4 mb-3">Tasks</h1>
          <Button
            variant="primary"
            onClick={handleAddTask}
            className="task-add-button mb-3"
          >
            <i className="bi bi-file-earmark-plus-fill"></i>Add Task
          </Button>
          <Row>
            {isFetched ? (
              <>{isLoading && <Loader />}</>
            ) : (
              <>
                <Col className="card task-card" xs={12} md={6} lg={4}>
                  <h4 className="m-2">Todo</h4>
                  {todo.map((task) => (
                    <div key={task._id} className="m-0" >
                      <Row className='single-task m-2' onClick={() => handleTaskClick(task)}>
                        <Col xs={10}>{task.title}</Col>
                        <Col xs={1} >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill edit-icon" viewBox="0 0 16 16">
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                          </svg>
                        </Col>
                        <Col xs={1}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill delete-icon" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                          </svg>
                        </Col>
                        {selectedTask === task && (
                          <>
                          <Col xs={9}>
                            <span className="task-description">{task.description}</span>
                          </Col>
                          <Col xs={3}>
                            <select
                              id="statusDropdown"
                              value={task.status}
                              className="dropdown"
                              onChange={(e) => handleStatusChange(task, e.target.value)}
                            >
                              {["todo", "in progress", "done"].map((statusOption) => (
                                <option key={statusOption}>
                                  {statusOption}
                                </option>
                              ))}
                            </select>
                          </Col>
                          </>  
                        )}
                      </Row>
                    </div>
                  ))}
                </Col>
                <Col className="card task-card" xs={12} md={6} lg={4}>
                  <h4 className="m-2">In Progress</h4>
                  {inProgress.map((task) => (
                    <div key={task._id} className="m-0">
                      <Row className='single-task m-2'  onClick={() => handleTaskClick(task)}>
                        <Col xs={10}>{task.title}</Col>
                        <Col xs={1}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill edit-icon" viewBox="0 0 16 16">
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                          </svg>
                        </Col>
                        <Col xs={1}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill delete-icon" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                          </svg>
                        </Col>
                        {selectedTask === task && (
                          <>
                          <Col xs={9}>
                            <span className="task-description">{task.description}</span>
                          </Col>
                          <Col xs={3}>
                            <select
                              id="statusDropdown"
                              value={task.status}
                              className="dropdown"
                              onChange={(e) => handleStatusChange(task, e.target.value)}
                            >
                              {["todo", "in progress", "done"].map((statusOption) => (
                                <option key={statusOption}>
                                  {statusOption}
                                </option>
                              ))}
                            </select>
                          </Col>
                          </>  
                        )}
                      </Row>
                    </div>
                  ))}
                </Col>
                <Col className="card task-card" xs={12} md={6} lg={4}>
                  <h4 className="m-2">Done</h4>
                  {done.map((task) => (
                    <div key={task._id} className="m-0">
                      <Row className='single-task m-2'  onClick={() => handleTaskClick(task)}>
                        <Col xs={10}>{task.title}</Col>
                        <Col xs={1} >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill edit-icon" viewBox="0 0 16 16">
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                          </svg>
                        </Col>
                        <Col xs={1}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill delete-icon" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                          </svg>
                        </Col>
                        {selectedTask === task && (
                          <>
                          <Col xs={9}>
                            <span className="task-description">{task.description}</span>
                          </Col>
                          <Col xs={3}>
                            <select
                              id="statusDropdown"
                              value={task.status}
                              className="dropdown"
                              onChange={(e) => handleStatusChange(task, e.target.value)}
                            >
                              {["todo", "in progress", "done"].map((statusOption) => (
                                <option key={statusOption}>
                                  {statusOption}
                                </option>
                              ))}
                            </select>
                          </Col>
                          </>  
                        )}
                      </Row>
                    </div>
                  ))}
                </Col>
              </>
            )}
          </Row>
        </div>
      </Container>
    </div>
  )
    
}

export default TaskScreen

