import { Container, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Logo from "../assets/Logo.jpg"

const Hero = () => {
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-2'>TaskZen</h1>
          <img 
                src={Logo}
                width="140"
                height="140"
                className='d-inlin-block align-top mb-2'
          />
          <p className='text-center mb-4'>
            Heloo, This is a project management web application where users can create tasks and update their status, as well as assign these tasks to users. Includes features such as JWT-based authentication, public and protected routes, user account creation and management.
            This Applicaion build with using MERN, redux, JWT

          </p>
          <div className='d-flex'>
            <LinkContainer to='/login'>
                <Button variant='primary' className='me-3'>
                    Sign In
                </Button>
            </LinkContainer>
            <LinkContainer to='/register'>
                <Button variant='secondary'>
                    Register
                </Button>
            </LinkContainer>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;