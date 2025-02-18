import { render, screen } from '@testing-library/react';
import TaskBoard from './TaskBoard';
import { BrowserRouter as Router } from 'react-router-dom';

test('displays user name from localStorage', () => {
  localStorage.setItem('user', JSON.stringify({ username: 'JohnDoe' }));
  render(
    <Router>
      <TaskBoard />
    </Router>
  );
  
  expect(screen.getByText('JohnDoe')).toBeInTheDocument();
});

test('logs out user and redirects to login', () => {
    localStorage.setItem('user', JSON.stringify({ username: 'JohnDoe' }));
    render(
      <Router>
        <TaskBoard />
      </Router>
    );
  
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);
    
    expect(localStorage.getItem('user')).toBeNull();
    expect(window.location.pathname).toBe('/login');
  });