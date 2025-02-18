import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  Modal,
  TextField,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  FormControlLabel,
  Tooltip
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, updateTask, toggleFavorite, sortTasks, setTasks } from "../redux/taskSlice";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TaskBoard = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const columns = useSelector((state) => state.tasks.columns);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get logged-in user data from localStorage
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    deadline: "",
    images: [],
    status: "todo",
    isFavoriteTask: false, // Add a field for favorite task
  });
  const [selectedTask, setSelectedTask] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [sortOrder, setSortOrder] = useState({
    todo: "asc",
    inProgress: "asc",
    done: "asc",
  });
  const [nameError, setNameError] = useState(false);

  const [hasFetched, setHasFetched] = useState(false); // State to track the API call

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    // Fetch tasks from API only if user is logged in and tasks haven't been fetched yet
    if (user && !hasFetched) {
      axios
        .get("https://localhost:7265/api/Task/GetTasks")
        .then((response) => {
          const tasks = response.data;
  
          // Add image URLs from the API response
          const tasksWithImages = tasks.map((task) => ({
            ...task,
            images: task.imageUrls || [], // Store image URLs inside task object
          }));
  
          dispatch(setTasks(tasksWithImages)); // Store tasks in Redux
          setHasFetched(true); // Set to true so we don't refetch on subsequent renders
        })
        .catch((error) => {
          console.error("Error fetching tasks:", error);
        });
    }
  }, [user, dispatch, hasFetched]);
  

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setNewTask({
      name: "",
      description: "",
      deadline: today,
      images: [],
      status: "todo",
      isFavoriteTask: false, // Reset favorite task field
    });
    setNameError(false); // Reset the error state when closing
  };

  const handleEditOpen = (task) => {
    setSelectedTask(task);
    setImagePreviews(task.images || []);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedTask(null);
    setImagePreviews([]);
  };

  const base64ToFile = (base64String, filename) => {
    const arr = base64String.split(",");
    const mime = arr[0].match(/:(.*?);/)[1]; // Extract MIME type
    const bstr = atob(arr[1]); // Decode base64
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime }); // Convert to File object
  };
  
  const handleAddTask = async () => {
    if (!newTask.name.trim()) {
      setNameError(true);
      return;
    }
  
    const formData = new FormData();
    formData.append("Name", newTask.name);
    formData.append("Description", newTask.description);
    formData.append("Deadline", newTask.deadline);
    formData.append("IsFavoriteTask", newTask.isFavoriteTask); // Ensure this is a boolean
    formData.append("Status", newTask.status);
  
    // Map task status to column ID
    const columnMapping = {
      todo: 1, // ToDo = 1
      inProgress: 2, // In Progress = 2
      done: 3, // Done = 3
    };
  
    formData.append("ColumnId", columnMapping[newTask.status] || 1); // Default to 1 (ToDo) if status is invalid
    formData.append("UserId", user.id);
  
    // Convert base64 images to File objects and append to FormData
    if (newTask.images && newTask.images.length > 0) {
      newTask.images.forEach((base64Image, index) => {
        const file = base64ToFile(base64Image, `image_${index}.png`); // Convert base64 to File
        formData.append("Files", file); // Append to FormData as IFormFile[]
      });
    }
  
    try {
      await axios.post("https://localhost:7265/api/Task/CreateTask", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(addTask({ ...newTask }));
      handleClose();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };
  

  const handleUpdateTask = async () => {
    if (!selectedTask.name.trim()) {
      setNameError(true);
      return;
    }
  
    const formData = new FormData();
    formData.append("Name", selectedTask.name);
    formData.append("Description", selectedTask.description);
    formData.append("Deadline", selectedTask.deadline);
    formData.append("IsFavoriteTask", selectedTask.isFavoriteTask); // Ensure this is a boolean
    formData.append("Status", selectedTask.status);
  
    // ColumnId should be an integer based on the selected status
    const columnMapping = {
      todo: 1, // ToDo = 1
      inProgress: 2, // In Progress = 2
      done: 3, // Done = 3
    };
  
    formData.append("ColumnId", columnMapping[selectedTask.status] || 1); // Default to 1 (ToDo) if status is invalid
    formData.append("UserId", user.id);
  
    // ✅ Check if images exist before accessing `.length`
    if (selectedTask.images && selectedTask.images.length > 0) {
      selectedTask.images.forEach((image) => {
        formData.append("Files", image);
      });
    }
  
    try {
      await axios.post(`https://localhost:7265/api/Task/UpdateTask/${selectedTask.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(updateTask(selectedTask));
      handleEditClose();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data from localStorage
    setUser(null); // Clear user state
    setTasks(null); // clear the tasks
    navigate("/"); // Navigate to the Login page
  };

  const handleStarClick = (task) => {
    const updatedTask = { ...task, isFavoriteTask: !task.isFavoriteTask }; // Toggle favorite task status
    dispatch(toggleFavorite(updatedTask));
  };

  const handleDeleteClick = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }
  
    try {
      await axios.delete(`https://localhost:7265/api/Task/DeleteTask?id=${taskId}`);
      
      // Remove the deleted task from state
      dispatch(deleteTask(taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };  

  const handleSortClick = (columnId) => {
    const newSortOrder = sortOrder[columnId] === "asc" ? "desc" : "asc";
    setSortOrder({ ...sortOrder, [columnId]: newSortOrder });
    dispatch(sortTasks({ columnId, order: newSortOrder }));
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => {
        const reader = new FileReader();
        return new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      });
  
      Promise.all(newImages).then((images) => {
        if (selectedTask) {
          setSelectedTask({
            ...selectedTask,
            images: [...(selectedTask.images || []), ...images], // Ensure images is an array
          });
        } else {
          setNewTask({
            ...newTask,
            images: [...(newTask.images || []), ...images], // Ensure images is an array
          });
        }
  
        setImagePreviews((prev) => [...prev, ...images]);
      });
    }
  };
  

  const handleRemoveImage = (index) => {
    if (selectedTask) {
      const updatedImages = selectedTask.images.filter((_, i) => i !== index);
      setSelectedTask({ ...selectedTask, images: updatedImages });
    } else {
      const updatedImages = newTask.images.filter((_, i) => i !== index);
      setNewTask({ ...newTask, images: updatedImages });
    }
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        fontWeight="bold"
        color="white"
        sx={{ background: "#3f51b5", p: 2, borderRadius: "5px" }}
      >
        Ramsoft Scrum Board
      </Typography>

      {user && (
        <Typography variant="h6" sx={{ textAlign: "right", mb: 2 }}>
          Welcome, {user.username}
        </Typography>
      )}

      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        sx={{ position: "absolute", top: 20, right: 20 }}
      >
        Logout
      </Button>

      <Grid2 container spacing={2} sx={{ mt: 3 }}>
        {Object.values(columns).map((column) => (
          <Grid2 xs={12} sm={4} key={column.id}>
            <Paper sx={{ p: 2, background: "#f4f4f4", minHeight: "500px", borderRadius: "10px" }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight="bold">
                  {column.title}
                </Typography>

                {column.id === "todo" && (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={handleOpen}
                  >
                    Add Task
                  </Button>
                )}

                <IconButton onClick={() => handleSortClick(column.id)}>
                  {sortOrder[column.id] === "asc" ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </IconButton>
              </Box>

              {column.taskIds.length > 0 ? (
                column.taskIds.map((taskId) => {
                  const task = tasks.find((t) => t.id === taskId);
                  return (
                    <Paper key={task.id} sx={{ mb: 2, p: 2, background: "#fff", borderRadius: "5px" }}>
                      <Tooltip title="Click to edit task" arrow>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          color="primary"
                          onClick={() => handleEditOpen(task)}
                          sx={{
                            "&:hover": {
                              backgroundColor: "#f0f0f0",  // Light background on hover
                              cursor: "pointer",  // Change cursor to pointer
                              borderRadius: "5px",  // Optional: smooth edges
                              padding: "2px 5px",  // Optional: add padding for a better hover effect
                            },
                          }}
                        >
                          {task.name}
                        </Typography>
                      </Tooltip>

                      <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                        {task.description}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Deadline: {task.deadline}
                      </Typography>

                      <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                        <IconButton onClick={() => handleStarClick(task)}>
                          <StarIcon color={task.isFavoriteTask ? "primary" : "action"} />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteClick(task.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Paper>
                  );
                })
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No tasks available
                </Typography>
              )}
            </Paper>
          </Grid2>
        ))}
      </Grid2>

      {/* Add Task Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ width: 400, p: 3, background: "white", borderRadius: "10px", mx: "auto", mt: "20vh", maxHeight: "80vh", overflowY: "auto" }}>
          <Typography variant="h6" fontWeight="bold">Add</Typography>
          <TextField
            fullWidth
            label="Task Name"
            margin="normal"
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            error={nameError}
            helperText={nameError ? "Task name is required" : ""}
          />
          <TextField
            fullWidth
            label="Description"
            margin="normal"
            multiline
            rows={2}
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <TextField
            fullWidth
            label="Deadline"
            margin="normal"
            type="date"
            value={newTask.deadline}
            onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: today, // Disable past dates
            }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={newTask.status}
              onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
              label="Status"
            >
              <MenuItem value="todo">ToDo</MenuItem>
              <MenuItem value="inProgress">In Progress</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </Select>
          </FormControl>

          <Box mb={2}>
            <input type="file" multiple onChange={handleImageChange} />
            {imagePreviews.length > 0 && (
              <Box display="flex" flexDirection="column" mb={2}>
                {imagePreviews.map((image, index) => (
                  <img key={index} src={image} alt={`Task Image ${index + 1}`} width="100%" style={{ marginBottom: "10px" }} />
                ))}
              </Box>
            )}
          </Box>

          {/* Favorite Task Checkbox */}
          <FormControlLabel
            control={
              <Checkbox
                checked={newTask.isFavoriteTask}
                onChange={() => setNewTask({ ...newTask, isFavoriteTask: !newTask.isFavoriteTask })}
                color="primary"
              />
            }
            label="Mark as Favorite"
          />

          <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
            <Button variant="contained" color="primary" onClick={handleAddTask}>Add</Button>
            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          </Box>
        </Box>
      </Modal>

      {/* Edit Task Modal */}
      <Modal open={editOpen} onClose={handleEditClose}>
        <Box sx={{ width: 400, p: 3, background: "white", borderRadius: "10px", mx: "auto", mt: "20vh", overflowY: "auto", maxHeight: "80vh" }}>
          <Typography variant="h6" fontWeight="bold">Edit Task</Typography>
          <TextField
            fullWidth
            label="Task Name"
            margin="normal"
            value={selectedTask?.name || ""}
            onChange={(e) => setSelectedTask({ ...selectedTask, name: e.target.value })}
            helperText={nameError ? "Name is required" : ""}
          />
          <TextField
            fullWidth
            label="Description"
            margin="normal"
            multiline
            rows={2}
            value={selectedTask?.description || ""}
            onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
          />
          <TextField
            fullWidth
            label="Deadline"
            margin="normal"
            type="date"
            value={selectedTask?.deadline || ""}
            onChange={(e) => setSelectedTask({ ...selectedTask, deadline: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: today, // Disable past dates
            }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={selectedTask?.status || ""}
              onChange={(e) => setSelectedTask({ ...selectedTask, status: e.target.value })}
              label="Status"
            >
              <MenuItem value="todo">ToDo</MenuItem>
              <MenuItem value="inProgress">In Progress</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </Select>
          </FormControl>

          {selectedTask?.images && (
            <Box mb={2}>
              {selectedTask.images.map((image, index) => (
                <Box key={index} position="relative" mb={2}>
                  <img
                    src={image}
                    alt={`Task Image ${index + 1}`}
                    style={{ width: "100%", maxHeight: "200px", objectFit: "contain" }}
                  />
                  <IconButton
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      backgroundColor: "rgba(0,0,0,0.5)",
                      color: "white",
                    }}
                    onClick={() => handleRemoveImage(index)}
                  >
                    <span style={{ fontWeight: "bold", fontSize: "18px" }}>X</span>
                  </IconButton>
                </Box>
              ))}
            </Box>
          )}

          <Box mb={2}>
            <input type="file" multiple onChange={handleImageChange} />
          </Box>

          {/* Favorite Task Checkbox */}
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedTask?.isFavoriteTask || false}
                onChange={() => setSelectedTask({ ...selectedTask, isFavoriteTask: !selectedTask.isFavoriteTask })}
                color="primary"
              />
            }
            label="Mark as Favorite"
          />

          <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
            <Button variant="contained" color="primary" onClick={handleUpdateTask}>Update</Button>
            <Button variant="outlined" onClick={handleEditClose}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default TaskBoard;
