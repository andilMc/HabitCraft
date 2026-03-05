import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Users } from './pages/Users';
import { Notifications } from './pages/Notifications';
import { Habits, Analytics } from './pages/Stubs';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/users" element={<Layout><Users /></Layout>} />
            <Route path="/habits" element={<Layout><Habits /></Layout>} />
            <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
            <Route path="/notifications" element={<Layout><Notifications /></Layout>} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
