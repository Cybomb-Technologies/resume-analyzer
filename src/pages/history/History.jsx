import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import './history.css';

export default function History() {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = user?.token || JSON.parse(localStorage.getItem('userInfo'))?.token;
      if (!token) return;

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/history`, {
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
  }, [user]);

  return (
    <div className="history-container">
      <h2>Analysis History</h2>
      {history.length === 0 ? (
        <p className="no-history">No analysis history found.</p>
      ) : (
        <div className="history-grid">
          {history.map((item) => (
            <div key={item._id} className="history-card">
              <h3>{item.resumeName}</h3>
              <p className="history-date">{new Date(item.createdAt).toLocaleDateString()}</p>
              {/* Add more details or link to result page if needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
