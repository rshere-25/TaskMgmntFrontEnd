import { render, screen, fireEvent } from '@testing-library/react';
import TaskBoard from './TaskBoard';
import { BrowserRouter as Router } from 'react-router-dom';

test('adds a new task', async () => {
  localStorage.setItem('user', JSON.stringify({ username: 'JohnDoe' }));
  render(
    <Router>
      <TaskBoard />
    </Router>
  );

  const addButton = screen.getByText('Add Task');
  fireEvent.click(addButton);

  const taskNameInput = screen.getByLabelText('Task Name');
  const taskDescriptionInput = screen.getByLabelText('Description');
  const submitButton = screen.getByText('Add');

  fireEvent.change(taskNameInput, { target: { value: 'New Task' } });
  fireEvent.change(taskDescriptionInput, { target: { value: 'Task Description' } });
  fireEvent.click(submitButton);

  expect(await screen.findByText('New Task')).toBeInTheDocument();
});


test('edits an existing task', async () => {
    localStorage.setItem('user', JSON.stringify({ username: 'JohnDoe' }));
    render(
      <Router>
        <TaskBoard />
      </Router>
    );
  
    const taskName = screen.getByText('Existing Task');
    fireEvent.click(taskName);
  
    const taskDescriptionInput = screen.getByLabelText('Description');
    const submitButton = screen.getByText('Update');
  
    fireEvent.change(taskDescriptionInput, { target: { value: 'Updated Description' } });
    fireEvent.click(submitButton);
  
    expect(await screen.findByText('Updated Description')).toBeInTheDocument();
  });

  test('deletes a task', async () => {
    localStorage.setItem('user', JSON.stringify({ username: 'JohnDoe' }));
    render(
      <Router>
        <TaskBoard />
      </Router>
    );
  
    const deleteButton = screen.getByTestId('delete-button-1'); // Assuming each task has a unique delete button
    fireEvent.click(deleteButton);
    
    expect(screen.queryByText('Task to Delete')).not.toBeInTheDocument();
  });


  test('sorts tasks alphabetically in ascending order', async () => {
    localStorage.setItem('user', JSON.stringify({ username: 'JohnDoe' }));
    render(
      <Router>
        <TaskBoard />
      </Router>
    );
  
    const sortButton = screen.getByText('Sort');
    fireEvent.click(sortButton);
  
    const tasks = await screen.findAllByTestId('task-name'); // Assuming tasks have a 'data-testid="task-name"'
    const taskNames = tasks.map(task => task.textContent);
  
    expect(taskNames).toEqual(taskNames.sort());
  });


  test('sorts tasks alphabetically in descending order', async () => {
    localStorage.setItem('user', JSON.stringify({ username: 'JohnDoe' }));
    render(
      <Router>
        <TaskBoard />
      </Router>
    );
  
    const sortButton = screen.getByText('Sort');
    fireEvent.click(sortButton);
    fireEvent.click(sortButton); // Toggle to descending
  
    const tasks = await screen.findAllByTestId('task-name');
    const taskNames = tasks.map(task => task.textContent);
  
    expect(taskNames).toEqual(taskNames.sort().reverse());
  });

  test('marks a task as favorite', async () => {
    localStorage.setItem('user', JSON.stringify({ username: 'JohnDoe' }));
    render(
      <Router>
        <TaskBoard />
      </Router>
    );
  
    const favoriteButton = screen.getByTestId('favorite-button-1'); // Assuming tasks have a unique favorite button
    fireEvent.click(favoriteButton);
  
    expect(await screen.findByTestId('favorite-1')).toHaveClass('favorited');
  });

  test('unmarks a task as favorite', async () => {
    localStorage.setItem('user', JSON.stringify({ username: 'JohnDoe' }));
    render(
      <Router>
        <TaskBoard />
      </Router>
    );
  
    const favoriteButton = screen.getByTestId('favorite-button-1');
    fireEvent.click(favoriteButton); // Mark as favorite
  
    fireEvent.click(favoriteButton); // Unmark as favorite
  
    expect(await screen.findByTestId('favorite-1')).not.toHaveClass('favorited');
  });

  test('uploads images for a task', () => {
    localStorage.setItem('user', JSON.stringify({ username: 'JohnDoe' }));
    render(
      <Router>
        <TaskBoard />
      </Router>
    );
  
    const addButton = screen.getByText('Add Task');
    fireEvent.click(addButton);
  
    const imageInput = screen.getByLabelText('Upload Image');
    const file = new File(['dummy content'], 'image.jpg', { type: 'image/jpeg' });
  
    fireEvent.change(imageInput, { target: { files: [file] } });
  
    expect(imageInput.files[0]).toBe(file);
  });