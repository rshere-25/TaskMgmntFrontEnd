import { Container, TextField, Button, Typography, Link } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('https://localhost:7265/api/Authentication/Login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setError('');
      localStorage.setItem('user', JSON.stringify(data.user)); // Store user data globally
      navigate('/board'); // Navigate to TaskBoard
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: '100px' }}>
      <Typography variant="h4" align="center">Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField 
          label="Username" 
          fullWidth 
          margin="normal" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <TextField 
          label="Password" 
          type="password" 
          fullWidth 
          margin="normal" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        {error && <Typography color="error" variant="body2">{error}</Typography>}
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth 
          style={{ marginTop: '20px' }}
        >
          Login
        </Button>
      </form>
      <Link 
        component="button" 
        variant="body2" 
        onClick={() => navigate('/create-user')}
        style={{ display: 'block', marginTop: '20px', textAlign: 'center' }}
      >
        Create an account
      </Link>
    </Container>
  );
};

export default Login;
