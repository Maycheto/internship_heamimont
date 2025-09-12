import React, { useState, useEffect } from 'react';
import './DatabaseManagement.css';
import { useNavigate } from 'react-router-dom';

const DatabaseManagement = () => {
  const navigate = useNavigate();
  const [databases, setDatabases] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [selectedDatabase, setSelectedDatabase] = useState(null);
  const [newDatabase, setNewDatabase] = useState({ name: '', number: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDatabases();
  }, []);

  const fetchDatabases = async () => {
    try {
      setLoading(true);
      // Mock data for now to match the second image
      const mockData = [
        { id: 26, dbName: 'Somerr', userEmail: 'oriko@gmail.com', date: '26.04.2024' },
        { id: 45, dbName: 'Kalifornia67', userEmail: 'gancho@yahoo.com', date: '04.09.2015' },
        { id: 123, dbName: 'California34', userEmail: 'gosho@abv.bg', date: '02.08.2021' },
        { id: 78, dbName: 'nikel', userEmail: 'sashka@gmail.com', date: '01.02.2017' },
        { id: 1, dbName: 'Slovenia add', userEmail: 'rajna@yahoo.com', date: '24.06.2021' }
      ];
      setDatabases(mockData);
      
      // Uncomment this when backend is ready:
      // const response = await fetch('/api/databases', {
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   }
      // });
      // 
      // if (response.ok) {
      //   const data = await response.json();
      //   setDatabases(data);
      // } else {
      //   console.error('Failed to fetch databases');
      // }
    } catch (error) {
      console.error('Error fetching databases:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDatabase = async (e) => {
    e.preventDefault();
    try {
      const newId = Math.max(...databases.map(db => db.id), 0) + 1;
      const newDb = {
        id: newId,
        dbName: newDatabase.name,
        userEmail: localStorage.getItem('userEmail') || 'user@example.com',
        date: new Date().toLocaleDateString('en-GB')
      };
      
      setDatabases([...databases, newDb]);
      setShowAddModal(false);
      setNewDatabase({ name: '', number: '' });
      
      // Uncomment this when backend is ready:
      // const response = await fetch('/api/db/create', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   },
      //   body: `dbName=${encodeURIComponent(newDatabase.name)}`
      // });
      //
      // if (response.ok) {
      //   const result = await response.text();
      //   alert(result);
      //   setShowAddModal(false);
      //   setNewDatabase({ name: '', number: '' });
      //   fetchDatabases(); // Refresh the list
      // } else {
      //   const error = await response.text();
      //   alert(error);
      // }
    } catch (error) {
      console.error('Error creating database:', error);
      alert('Error creating database');
    }
  };

  const handleDeleteDatabase = async () => {
    if (!selectedDatabase) return;
    
    try {
      const response = await fetch(`/api/db/delete/${selectedDatabase.dbName}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const result = await response.text();
        alert(result);
        setShowDeleteModal(false);
        setSelectedDatabase(null);
        fetchDatabases(); // Refresh the list
      } else {
        const error = await response.text();
        alert(error);
      }
    } catch (error) {
      console.error('Error deleting database:', error);
      alert('Error deleting database');
    }
  };

  const handleDownloadDatabase = () => {
    if (!selectedDatabase) return;
    
    // For now, just show a confirmation
    alert(`Downloading database: ${selectedDatabase.dbName}`);
    setShowDownloadModal(false);
    setSelectedDatabase(null);
  };

  const handleViewDatabase = (database) => {
    navigate(`/portfolios/${database.id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const filteredDatabases = databases.filter(db => 
    db.dbName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    db.id.toString().includes(searchTerm)
  );




  

  return (
    <div className="database-management">
      <header className="header">
        <div className="logo">Pink</div>
        <nav className="nav">
          <a href="/" className="nav-link">Home</a>
          <a href="/solutions" className="nav-link">Solutions</a>
          <a href="/about" className="nav-link">About Us</a>
          <a href="/insights" className="nav-link">Insights</a>
        </nav>
        <div className="header-actions">
          <button 
            className="menu-button"
            onClick={() => setShowMenuModal(!showMenuModal)}
          >
            ☰
          </button>
          <button className="profile-button">👤</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-header">
          <h1 className="page-title">All Data Bases</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          <button 
            className="add-button"
            onClick={() => setShowAddModal(true)}
          >
            Add New Data Base
          </button>
        </div>

        {/* Database Table */}
        <div className="table-container">
          <table className="database-table">
            <thead>
              <tr>
                <th>№</th>
                <th>Name</th>
                <th>User</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="loading-cell">Loading...</td>
                </tr>
              ) : filteredDatabases.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-cell">No databases found</td>
                </tr>
              ) : (
                filteredDatabases.map((db, index) => (
                  <tr key={db.id}>
                    <td>{db.id}</td>
                    <td>{db.dbName}</td>
                    <td>{db.userEmail}</td>
                    <td>{db.date}</td>
                    <td className="actions">
                      <button 
                        className="action-btn download-btn"
                        onClick={() => {
                          setSelectedDatabase(db);
                          setShowDownloadModal(true);
                        }}
                      >
                        Download
                      </button>
                      <button 
                        className="action-btn view-btn"
                        onClick={() => handleViewDatabase(db)}
                      >
                        View
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => {
                          setSelectedDatabase(db);
                          setShowDeleteModal(true);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Add Database Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Add New Database</h2>
            <form onSubmit={handleAddDatabase}>
              <div className="form-group">
                <label htmlFor="dbName">Database Name:</label>
                <input
                  type="text"
                  id="dbName"
                  value={newDatabase.name}
                  onChange={(e) => setNewDatabase({...newDatabase, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="dbNumber">Database Number:</label>
                <input
                  type="text"
                  id="dbNumber"
                  value={newDatabase.number}
                  onChange={(e) => setNewDatabase({...newDatabase, number: e.target.value})}
                  placeholder="Optional"
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit">Create Database</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Menu Modal */}
      {showMenuModal && (
        <div className="modal-overlay" onClick={() => setShowMenuModal(false)}>
          <div className="menu-modal" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => {
              setShowMenuModal(false);
              // Navigate to profile page
            }}>
              View Profile
            </button>
            <button onClick={() => {
              setShowMenuModal(false);
              handleLogout();
            }}>
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete the database "{selectedDatabase?.dbName}"?</p>
            <div className="modal-actions">
              <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button onClick={handleDeleteDatabase} className="delete-confirm">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Download Confirmation Modal */}
      {showDownloadModal && (
        <div className="modal-overlay" onClick={() => setShowDownloadModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Confirm Download</h2>
            <p>Are you sure you want to download the database "{selectedDatabase?.dbName}"?</p>
            <div className="modal-actions">
              <button onClick={() => setShowDownloadModal(false)}>Cancel</button>
              <button onClick={handleDownloadDatabase} className="download-confirm">
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatabaseManagement;
