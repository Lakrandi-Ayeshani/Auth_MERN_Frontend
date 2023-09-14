import { apiSlice } from './apiSlice';
const TASKS_URL = '/api/tasks';
import { createSlice  } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    isFetched: true,
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload.tasks;
      
      state.isFetched = false;    
      console.log(state.tasks, state.isFetched)      
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