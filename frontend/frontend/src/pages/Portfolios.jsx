import React, { useState, useEffect } from 'react';
import './Portfolios.css';
import { useParams, useNavigate } from 'react-router-dom';

const Portfolios = () => {
  const { databaseId } = useParams();
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [newPortfolio, setNewPortfolio] = useState({ name: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [databaseName, setDatabaseName] = useState('');

  useEffect(() => {
    fetchPortfolios();
    fetchDatabaseName();
  }, [databaseId]);

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      // Mock data
      setPortfolios([
        { id: 1, name: 'Portfolio 1', createdAt: '2024-01-15' },
        { id: 2, name: 'Portfolio 2', createdAt: '2024-01-20' },
        { id: 3, name: 'Portfolio 3', createdAt: '2024-01-25' }
      ]);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDatabaseName = async () => {
    try {
      // In a real app, you would fetch this from your API
      // For now, we'll use mock data based on the databaseId
      const databaseNames = {
        '26': 'Somerr',
        '45': 'Kalifornia67',
        '123': 'California34',
        '78': 'nikel',
        '1': 'Slovenia add'
      };
      
      setDatabaseName(databaseNames[databaseId] || `Database ${databaseId}`);
    } catch (error) {
      console.error('Error fetching database name:', error);
      setDatabaseName(`Database ${databaseId}`);
    }
  };

  const handleAddPortfolio = async (e) => {
    e.preventDefault();
    try {
      const newId = portfolios.length > 0 ? Math.max(...portfolios.map(p => p.id)) + 1 : 1;
      setPortfolios([...portfolios, { 
        id: newId, 
        name: newPortfolio.name, 
        createdAt: new Date().toLocaleDateString('en-GB')
      }]);
      
      setShowAddModal(false);
      setNewPortfolio({ name: '' });
    } catch (error) {
      console.error('Error adding portfolio:', error);
    }
  };

  const handleDeletePortfolio = () => {
    if (!selectedPortfolio) return;
    
    setPortfolios(portfolios.filter(p => p.id !== selectedPortfolio.id));
    setShowDeleteModal(false);
    setSelectedPortfolio(null);
  };

  const handleViewPortfolio = (portfolio) => {
    // Navigate to portfolio details page
    navigate(`/portfolio-details/${portfolio.id}`);
  };

  const filteredPortfolios = portfolios.filter(portfolio => 
    portfolio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    portfolio.id.toString().includes(searchTerm)
  );

  return (
    <div className="portfolios">
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
          {showMenuModal && (
            <div className="menu-modal">
              <button onClick={() => setShowMenuModal(false)}>
                View Profile
              </button>
              <button onClick={() => {
                localStorage.removeItem('token');
                navigate('/login');
              }}>
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="main-content">
        <div className="content-header">
          <div className="title-section">
            <h1 className="page-title">Portfolios</h1>
            <p className="database-name">Database: {databaseName}</p>
          </div>
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
            Add New Portfolio
          </button>
        </div>

        <button 
          className="back-button"
          onClick={() => navigate('/database-management')}
        >
          ← Back to Databases
        </button>

        <div className="table-container">
          <table className="database-table">
            <thead>
              <tr>
                <th>№</th>
                <th>Name</th>
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="loading-cell">Loading portfolios...</td>
                </tr>
              ) : filteredPortfolios.length === 0 ? (
                <tr>
                  <td colSpan="4" className="empty-cell">
                    {portfolios.length === 0 ? "No portfolios found. Create your first portfolio to get started." : "No matching portfolios found."}
                  </td>
                </tr>
              ) : (
                filteredPortfolios.map(portfolio => (
                  <tr key={portfolio.id}>
                    <td>{portfolio.id}</td>
                    <td>{portfolio.name}</td>
                    <td>{portfolio.createdAt}</td>
                    <td className="actions">
                      <button 
                        className="action-btn view-btn"
                        onClick={() => handleViewPortfolio(portfolio)}
                      >
                        View
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => {
                          setSelectedPortfolio(portfolio);
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

      {/* Add Portfolio Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Add New Portfolio</h2>
            <form onSubmit={handleAddPortfolio}>
              <div className="form-group">
                <label htmlFor="portfolioName">Portfolio Name:</label>
                <input
                  type="text"
                  id="portfolioName"
                  value={newPortfolio.name}
                  onChange={(e) => setNewPortfolio({...newPortfolio, name: e.target.value})}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit">Create Portfolio</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete the portfolio "{selectedPortfolio?.name}"?</p>
            <div className="modal-actions">
              <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button onClick={handleDeletePortfolio} className="delete-confirm">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolios;