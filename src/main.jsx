import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route,
  RouterProvider
} from 'react-router-dom';
import store from './store/store.js';
import { Provider } from 'react-redux';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import HomeScreen from './screens/homeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import PrivateRoute from './components/PeivateRoute.jsx';
import AddTaskScreen from './screens/AddTaskScreen.jsx';
import TaskScreen from './screens/TaskScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public Routes */}
      <Route index = {true} path='/' element={<HomeScreen />} />
      <Route index = {true} path='/login' element={<LoginScreen />} />
      <Route index = {true} path='/register' element={<RegisterScreen />} />
      {/* Privet Routes  */}
      <Route path= '' element={<PrivateRoute />}>
        <Route path= '/profile' element={<ProfileScreen />}/>
        <Route path= '/createtask' element={<AddTaskScreen />}/>
        <Route path= '/task' element={<TaskScreen/>}/>
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
    <React.StrictMode>
      <RouterProvider router = {router} />
    </React.StrictMode>,
  </Provider>
  
)
