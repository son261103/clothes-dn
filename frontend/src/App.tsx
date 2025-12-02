import { BrowserRouter as Router } from 'react-router-dom';
import UserRouter from './routers/UserRouter';
import AdminRouter from './routers/AdminRouter';

function App() {
  return (
    <Router>
      <>
        <UserRouter />
        <AdminRouter />
      </>
    </Router>
  );
}

export default App
