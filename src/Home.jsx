import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Mail } from 'lucide-react';

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-vh-100"
      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
    >
      <nav className="navbar navbar-dark">
        <div className="container-fluid px-4 py-3">
          <span className="navbar-brand mb-0 h1 fw-bold">Dashboard</span>
          <button
            className="btn btn-light btn-sm d-flex align-items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </nav>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                    style={{
                      width: '100px',
                      height: '100px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    }}
                  >
                    <User size={48} color="white" />
                  </div>
                  <h2 className="fw-bold mb-2">Welcome, {user.name}! 👋</h2>
                  <p className="text-muted">You have successfully logged in</p>
                </div>

                <div className="row g-4">
                  <div className="col-12">
                    <div className="card bg-light border-0">
                      <div className="card-body">
                        <h5 className="card-title d-flex align-items-center gap-2 mb-3">
                          <User size={20} className="text-primary" />
                          Profile Information
                        </h5>
                        <div className="row">
                          <div className="col-12 mb-3">
                            <label className="form-label text-muted small">
                              Full Name
                            </label>
                            <p className="mb-0 fw-semibold">{user.name}</p>
                          </div>
                          <div className="col-12">
                            <label className="form-label text-muted small d-flex align-items-center gap-2">
                              <Mail size={16} />
                              Email Address
                            </label>
                            <p className="mb-0 fw-semibold">{user.email}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div
                      className="card border-0 h-100"
                      style={{
                        background:
                          'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                      }}
                    >
                      <div className="card-body text-white">
                        <h3 className="display-6 fw-bold mb-2">24/7</h3>
                        <p className="mb-0">Account Access</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div
                      className="card border-0 h-100"
                      style={{
                        background:
                          'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
                      }}
                    >
                      <div className="card-body text-white">
                        <h3 className="display-6 fw-bold mb-2">100%</h3>
                        <p className="mb-0">Secure Authentication</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
