import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, CheckCircle, AlertCircle } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessage({ type: 'success', text: data.message });
        sessionStorage.setItem('authToken', data.token);
        sessionStorage.setItem('user', JSON.stringify(data.user));
        
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setMessage({ type: 'error', text: data.message || 'Registration failed' });
      }
    } catch (error) {
      console.error('Signup error:', error);
      setMessage({ type: 'error', text: 'Unable to connect to server. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-3" 
         style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3" 
                       style={{ width: '70px', height: '70px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                    <Lock size={32} color="white" />
                  </div>
                  <h2 className="fw-bold mb-2">Create Account</h2>
                  <p className="text-muted">Sign up to get started</p>
                </div>

                {message.text && (
                  <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'} d-flex align-items-center`} role="alert">
                    {message.type === 'success' ? <CheckCircle size={20} className="me-2" /> : <AlertCircle size={20} className="me-2" />}
                    <div>{message.text}</div>
                  </div>
                )}

                <div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Full Name</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <User size={20} className="text-muted" />
                      </span>
                      <input
                        type="text"
                        className={`form-control border-start-0 ps-0 ${errors.name ? 'is-invalid' : ''}`}
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                      />
                    </div>
                    {errors.name && <div className="text-danger small mt-1">{errors.name}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Email Address</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <Mail size={20} className="text-muted" />
                      </span>
                      <input
                        type="email"
                        className={`form-control border-start-0 ps-0 ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                      />
                    </div>
                    {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Password</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <Lock size={20} className="text-muted" />
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className={`form-control border-start-0 border-end-0 ps-0 ${errors.password ? 'is-invalid' : ''}`}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => {
                          setFormData({ ...formData, password: e.target.value });
                          if (errors.password) setErrors({ ...errors, password: '' });
                        }}
                      />
                      <span 
                        className="input-group-text bg-light border-start-0"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ cursor: 'pointer' }}
                      >
                        {showPassword ? <EyeOff size={20} className="text-muted" /> : <Eye size={20} className="text-muted" />}
                      </span>
                    </div>
                    {errors.password && <div className="text-danger small mt-1">{errors.password}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Confirm Password</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <Lock size={20} className="text-muted" />
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className={`form-control border-start-0 ps-0 ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => {
                          setFormData({ ...formData, confirmPassword: e.target.value });
                          if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                        }}
                      />
                    </div>
                    {errors.confirmPassword && <div className="text-danger small mt-1">{errors.confirmPassword}</div>}
                  </div>

                  <button 
                    onClick={handleSubmit}
                    className="btn btn-lg w-100 text-white fw-semibold mb-3"
                    style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creating account...
                      </>
                    ) : (
                      'Sign Up'
                    )}
                  </button>

                  <div className="text-center">
                    <span className="text-muted">Already have an account? </span>
                    <Link to="/login" className="text-decoration-none fw-semibold">
                      Login
                    </Link>
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

export default Signup;