import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './profile.css';
import '../history/history.css'; // Import history CSS as well

export default function Profile() {
  const { user, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('details'); // 'details' or 'history'
  
  // Profile State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // History State
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  // Fetch history when tab changes to history
  useEffect(() => {
    if (activeTab === 'history') {
        const fetchHistory = async () => {
        const token = user?.token || JSON.parse(localStorage.getItem('userInfo'))?.token;
        if (!token) return;

        try {
            const res = await fetch('http://localhost:5000/api/history', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
            });
            const data = await res.json();
            setHistory(data);
        } catch (error) {
            console.error(error);
        }
        };
        fetchHistory();
    }
  }, [activeTab, user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = user.token || JSON.parse(localStorage.getItem('userInfo')).token;
    
    try {
      const res = await fetch('http://localhost:5000/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      
      if (res.ok) {
        setMessage('Profile updated successfully');
        localStorage.setItem('userInfo', JSON.stringify({ ...data, token }));
      } else {
        setMessage('Error updating profile');
      }
    } catch (error) {
      setMessage('Server error');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
            <h2>User Profile</h2>
            <button onClick={handleLogout} className="logout-btn-sm">Logout</button>
        </div>

        {/* TABS */}
        <div className="profile-tabs">
            <button 
                className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
                onClick={() => setActiveTab('details')}
            >
                Account Details
            </button>
            <button 
                className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                onClick={() => setActiveTab('history')}
            >
                Analysis History
            </button>
        </div>

        {/* TAB CONTENT: DETAILS */}
        {activeTab === 'details' && (
            <>
                {message && <div className="profile-message">{message}</div>}
                <form onSubmit={handleUpdate}>
                <div className="form-group">
                    <label>Name</label>
                    <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <label>New Password</label>
                    <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Leave blank to keep same"
                    />
                </div>
                <button type="submit" className="profile-btn">Update Profile</button>
                </form>
            </>
        )}

        {/* TAB CONTENT: HISTORY */}
        {activeTab === 'history' && (
            <div className="history-tab-content">
                {history.length === 0 ? (
                    <p className="no-history">No analysis history found.</p>
                ) : (
                    <div className="history-list">
                    {history.map((item) => (
                        <div key={item._id} className="history-item">
                        <div className="history-info">
                            <h4>{item.resumeName}</h4>
                            <span className="history-date">{new Date(item.createdAt).toLocaleDateString()}</span>
                        </div>
                        {/* <button className="view-btn">View</button> */}
                        </div>
                    ))}
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
}
