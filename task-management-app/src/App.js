import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Login from './pages/Login';
import TaskBoard from './pages/TaskBoard';
import CreateNewUser from './pages/CreateNewUser'; // Import CreateNewUser component

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/board" element={<TaskBoard />} />
          <Route path="/create-user" element={<CreateNewUser />} /> {/* New route for CreateNewUser */}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
