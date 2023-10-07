import { apiSlice } from './apiSlice';
const TASKS_URL = '/api/tasks';
import { createSlice  } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    isFetched: true,
    todo: [],
    inProgress: [],
    done: [],
  },
  reducers: {
    setTasks: (state, action) => {
      // state.tasks = action.payload.tasks;
      // console.log(action.payload.tasks)
      const todoTemp = [];
      const doneTemp = [];
      const inProgressTemp = []
      action.payload.tasks.forEach(task => {
        console.log('tasks', task)
        if(task.status === "todo"){
          todoTemp.push(task);
        } else if (task.status === "in progress") {
          inProgressTemp.push(task);
        } else if (task.status === "done") {
          doneTemp.push(task);
        }
      });
      state.todo = todoTemp;
      state.inProgress = inProgressTemp;
      state.done = doneTemp;
      state.isFetched = false;         
    },
  }
});
    
export const taskAPISlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

      createTask: builder.mutation({
        query: (data) => ({
          url: `${TASKS_URL}`,
          method: 'POST',
          body: data,
        }),
      }),
      getTasks: builder.mutation({
        query: () => ({
          url: `${TASKS_URL}`,
          method: 'GET',  
        }),
      }),
}),
});
  
export const { useCreateTaskMutation, useGetTasksMutation } = taskAPISlice;

  export const { setTasks } = taskSlice.actions;
export default taskSlice.reducer;