import { useState } from 'react';
// import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useCreateTaskMutation } from '../slices/taskSlice';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';

const AddTaskScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createTask, { isLoading }] = useCreateTaskMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
      try {
        const res = await createTask({ title, description, status: "todo" }).unwrap();
        if(res) {
        toast.success("Added task successfully");
        navigate('/task');
        }
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
  };

  return (
    <FormContainer className="create-task-form-container">
      <h1>Create Task</h1>

      <Form onSubmit={submitHandler}>

        <Form.Group className='my-2' controlId='title'>
          <Form.Label>Task</Form.Label>
          <Form.Control
            type='title'
            placeholder='Enter title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='description'
            placeholder='Enter description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          disabled={isLoading}
          type='submit'
          variant='primary'
          className='mt-3'
        >
          Create
        </Button>
      </Form>

      {isLoading && <Loader />}
    </FormContainer>
  );
};

export default AddTaskScreen;