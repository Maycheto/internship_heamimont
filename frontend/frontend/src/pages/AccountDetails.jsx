import React, { useState, useEffect } from 'react';
import './AccountDetails.css';
import { useParams, useNavigate } from 'react-router-dom';

const AccountDetails = () => {
  const { accountId } = useParams(); 
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('locations');
  const [locations, setLocations] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newItem, setNewItem] = useState({ name: '', description: '' });
  const [accountName, setAccountName] = useState('');

  useEffect(() => {
    fetchData();
    fetchAccountName();
  }, [accountId, activeTab]);

  const fetchData = async () => {
    try {
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAccountName = async () => {
    try {
      const accountNames = {
        '1': 'Account 1',
        '2': 'Account 2',
        '3': 'Account 3'
      };
      
      setAccountName(accountNames[accountId] || `Account ${accountId}`);
    } catch (error) {
      console.error('Error fetching account name:', error);
      setAccountName(`Account ${accountId}`);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      if (activeTab === 'locations') {
        const newId = locations.length > 0 ? Math.max(...locations.map(l => l.id)) + 1 : 1;
        setLocations([...locations, { 
          id: newId, 
          name: newItem.name, 
          address: newItem.description,
          createdAt: new Date().toLocaleDateString('en-GB')
        }]);
      } else {
        const newId = policies.length > 0 ? Math.max(...policies.map(p => p.id)) + 1 : 1;
        setPolicies([...policies, { 
          id: newId, 
          name: newItem.name, 
          description: newItem.description,
          createdAt: new Date().toLocaleDateString('en-GB')
        }]);
      }
      
      setShowAddModal(false);
      setNewItem({ name: '', description: '' });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleDeleteItem = () => {
    if (!selectedItem) return;
    
    if (activeTab === 'locations') {
      setLocations(locations.filter(l => l.id !== selectedItem.id));
    } else {
      setPolicies(policies.filter(p => p.id !== selectedItem.id));
    }
    
    setShowDeleteModal(false);
    setSelectedItem(null);
  };

  const currentData = activeTab === 'locations' ? locations : policies;
  const columns = activeTab === 'locations' 
    ? ['№', 'Name', 'Address', 'Created Date', 'Actions'] 
    : ['№', 'Name', 'Description', 'Created Date', 'Actions'];

  return (
    <div className="account-details">
      <header className="header">
        <div className="logo">Pink</div>
        <nav className="nav">
          <a href="/" className="nav-link">Home</a>
          <a href="/solutions" className="nav-link">Solutions</a>
          <a href="/about" className="nav-link">About Us</a>
          <a href="/insights" className="nav-link">Insights</a>
        </nav>
        <div className="header-actions">
          <button className="menu-button">☰</button>
          <button className="profile-button">👤</button>
        </div>
      </header>

      <main className="main-content">
        <div className="content-header">
          <div className="title-section">
            <h1 className="page-title">Account Details</h1>
            <p className="account-name">Account: {accountName}</p>
          </div>
          <button 
            className="back-button"
            onClick={() => navigate('/accounts/' + accountId.split('-')[0])} 
          >
            ← Back to Accounts
          </button>
        </div>

        <div className="tabs-container">
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'locations' ? 'active' : ''}`}
              onClick={() => setActiveTab('locations')}
            >
              Locations
            </button>
            <button 
              className={`tab ${activeTab === 'policies' ? 'active' : ''}`}
              onClick={() => setActiveTab('policies')}
            >
              Policies
            </button>
          </div>
          
          <button 
            className="add-button"
            onClick={() => setShowAddModal(true)}
          >
            Add New {activeTab === 'locations' ? 'Location' : 'Policy'}
          </button>
        </div>

        <div className="table-container">
          <table className="database-table">
            <thead>
              <tr>
                {columns.map((col, index) => (
                  <th key={index}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={columns.length} className="loading-cell">
                    Loading {activeTab}...
                  </td>
                </tr>
              ) : currentData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="empty-cell">
                    No {activeTab} found. Create your first one to get started.
                  </td>
                </tr>
              ) : (
                currentData.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{activeTab === 'locations' ? item.address : item.description}</td>
                    <td>{item.createdAt}</td>
                    <td className="actions">
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => {
                          setSelectedItem(item);
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

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Add New {activeTab === 'locations' ? 'Location' : 'Policy'}</h2>
            <form onSubmit={handleAddItem}>
              <div className="form-group">
                <label htmlFor="itemName">Name:</label>
                <input
                  type="text"
                  id="itemName"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="itemDescription">
                  {activeTab === 'locations' ? 'Address:' : 'Description:'}
                </label>
                <input
                  type="text"
                  id="itemDescription"
                  value={newItem.description}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this {activeTab.slice(0, -1)} "{selectedItem?.name}"?</p>
            <div className="modal-actions">
              <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button onClick={handleDeleteItem} className="delete-confirm">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDetails;