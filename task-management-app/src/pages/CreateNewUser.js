import { Container, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateNewUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);  // Track password validity
  const [successMessage, setSuccessMessage] = useState(''); // State to store success message
  const navigate = useNavigate();

  // Handle password confirmation and validation
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsPasswordValid(e.target.value === confirmPassword);  // Check if passwords match
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setIsPasswordValid(password === e.target.value);  // Check if passwords match
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const userDto = { username, password, role };

    const response = await fetch('https://localhost:7265/api/Authentication/CreateUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDto),
    });

    if (response.ok) {
      setError('');
      setSuccessMessage("User registration is successful. Redirecting to Login page...");

      // Delay navigation to the Login page to allow the success message to show
      setTimeout(() => {
        navigate("/"); // Navigate to Login page after success message
      }, 3000); // Delay of 2 seconds (2000 milliseconds)
    } else {
      setError("Failed to create account.");
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: '100px' }}>
      <Typography variant="h4" align="center">Create New User</Typography>
      <form onSubmit={handleSubmit}>
        <TextField 
          label="Username" 
          fullWidth 
          margin="normal" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <TextField 
          label="Password" 
          type="password" 
          fullWidth 
          margin="normal" 
          value={password} 
          onChange={handlePasswordChange} // Use handlePasswordChange
        />
        <TextField 
          label="Confirm Password" 
          type="password" 
          fullWidth 
          margin="normal" 
          value={confirmPassword} 
          onChange={handleConfirmPasswordChange} // Use handleConfirmPasswordChange
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            label="Role"
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="User">User</MenuItem>
          </Select>
        </FormControl>
        
        {/* Show error message if passwords don't match */}
        {!isPasswordValid && <Typography color="error" variant="body2">Passwords do not match</Typography>}
        {error && <Typography color="error" variant="body2">{error}</Typography>}
        
        {/* Show success message if registration is successful */}
        {successMessage && (
          <Typography 
            variant="body2" 
            style={{
              backgroundColor: '#4caf50', 
              color: 'white', 
              padding: '10px', 
              borderRadius: '5px', 
              marginTop: '20px',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            {successMessage}
          </Typography>
        )}
        
        {/* Disable the submit button if passwords don't match */}
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth 
          style={{ marginTop: '20px' }}
          disabled={!isPasswordValid}  // Disable button if passwords are not valid
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default CreateNewUser;
