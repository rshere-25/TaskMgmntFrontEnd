import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  columns: {
    todo: { id: "todo", title: "ToDo", taskIds: [] },
    inProgress: { id: "inProgress", title: "In Progress", taskIds: [] },
    done: { id: "done", title: "Done", taskIds: [] },
  },
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: action.payload.id,
        isFavoriteTask: action.payload.isFavoriteTask || false,
        status: action.payload.status || "todo", // Default to "todo"
        userId: action.payload.userId,
        name: action.payload.name,
        description: action.payload.description,
        deadline: action.payload.deadline,
        images: action.payload.images || [],
      };

      state.tasks.push(newTask);
      state.columns[newTask.status].taskIds.push(newTask.id);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      Object.values(state.columns).forEach((column) => {
        column.taskIds = column.taskIds.filter((id) => id !== action.payload);
      });
    },
    updateTask: (state, action) => {
      const updatedTask = action.payload;
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        const oldStatus = state.tasks[index].status;
        state.tasks[index] = updatedTask;

        // Move task to the correct column based on its new status
        if (oldStatus !== updatedTask.status) {
          state.columns[oldStatus].taskIds = state.columns[oldStatus].taskIds.filter(
            (id) => id !== updatedTask.id
          );
          state.columns[updatedTask.status].taskIds.push(updatedTask.id);
        }
      }
    },
    toggleFavorite: (state, action) => {
      const taskId = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.isFavoriteTask = !task.isFavoriteTask;
      }
    },
    sortTasks: (state, action) => {
      const { columnId, order } = action.payload;
      const column = state.columns[columnId];

      // Separate favorite and non-favorite tasks
      const favoriteTaskIds = [];
      const nonFavoriteTaskIds = [];

      column.taskIds.forEach((taskId) => {
        const task = state.tasks.find((task) => task.id === taskId);
        if (task.isFavoriteTask) {
          favoriteTaskIds.push(taskId);
        } else {
          nonFavoriteTaskIds.push(taskId);
        }
      });

      // Sort both arrays
      const sortByName = (a, b) => {
        const taskA = state.tasks.find((task) => task.id === a);
        const taskB = state.tasks.find((task) => task.id === b);
        return taskA.name.localeCompare(taskB.name);
      };

      const sortedFavorites = favoriteTaskIds.sort(sortByName);
      const sortedNonFavorites = nonFavoriteTaskIds.sort(sortByName);

      // Reverse the order if descending
      if (order === "desc") {
        column.taskIds = [...sortedFavorites.reverse(), ...sortedNonFavorites.reverse()];
      } else {
        column.taskIds = [...sortedFavorites, ...sortedNonFavorites];
      }
    },
    // New setTasks action to update tasks in bulk
    setTasks: (state, action) => {
      state.tasks = action.payload;
    
      // Reset columns taskIds
      state.columns = {
        todo: { id: "todo", title: "ToDo", taskIds: [] },
        inProgress: { id: "inProgress", title: "In Progress", taskIds: [] },
        done: { id: "done", title: "Done", taskIds: [] },
      };
    
      // Map API string values to column keys
      const statusMapping = {
        todo: "todo",
        inProgress: "inProgress",
        done: "done",
      };
    
      // Reassign tasks to the correct column
      state.tasks.forEach((task) => {
        console.log(`task status: ${task.status}`);
        const columnKey = statusMapping[task.status]; // Get correct string key
        console.log(`columnKey: ${columnKey}`);
        if (columnKey) {
          state.columns[columnKey].taskIds.push(task.id);
        } else {
          console.error(`Unexpected task status: ${task.status}`); // Debugging aid
        }
      });
    },
    
    
        
  },
});

export const { addTask, deleteTask, updateTask, toggleFavorite, sortTasks, setTasks } = taskSlice.actions;
export default taskSlice.reducer;
