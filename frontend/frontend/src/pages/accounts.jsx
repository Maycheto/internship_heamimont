import React, { useState, useEffect } from 'react';
import './Accounts.css';
import { useParams, useNavigate } from 'react-router-dom';

const Accounts = () => {
  const { portfolioId } = useParams();
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [newAccount, setNewAccount] = useState({ name: '', type: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [portfolioName, setPortfolioName] = useState('');

  useEffect(() => {
    fetchAccounts();
    fetchPortfolioName();
  }, [portfolioId]);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      // Mock data
      setAccounts([
        { id: 1, name: 'Account 1', type: 'Investment', createdAt: '2024-01-15' },
        { id: 2, name: 'Account 2', type: 'Savings', createdAt: '2024-01-20' },
        { id: 3, name: 'Account 3', type: 'Retirement', createdAt: '2024-01-25' }
      ]);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPortfolioName = async () => {
    try {
      // In a real app, you would fetch this from your API
      const portfolioNames = {
        '1': 'Portfolio 1',
        '2': 'Portfolio 2',
        '3': 'Portfolio 3'
      };
      
      setPortfolioName(portfolioNames[portfolioId] || `Portfolio ${portfolioId}`);
    } catch (error) {
      console.error('Error fetching portfolio name:', error);
      setPortfolioName(`Portfolio ${portfolioId}`);
    }
  };

  const handleAddAccount = async (e) => {
    e.preventDefault();
    try {
      const newId = accounts.length > 0 ? Math.max(...accounts.map(a => a.id)) + 1 : 1;
      setAccounts([...accounts, { 
        id: newId, 
        name: newAccount.name, 
        type: newAccount.type,
        createdAt: new Date().toLocaleDateString('en-GB')
      }]);
      
      setShowAddModal(false);
      setNewAccount({ name: '', type: '' });
    } catch (error) {
      console.error('Error adding account:', error);
    }
  };

  const handleDeleteAccount = () => {
    if (!selectedAccount) return;
    
    setAccounts(accounts.filter(a => a.id !== selectedAccount.id));
    setShowDeleteModal(false);
    setSelectedAccount(null);
  };

  const handleViewAccount = (account) => {
    navigate(`/account-details/${account.id}`);
  };

  const filteredAccounts = accounts.filter(account => 
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.id.toString().includes(searchTerm)
  );

  return (
    <div className="accounts">
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
            <h1 className="page-title">Accounts</h1>
            <p className="portfolio-name">Portfolio: {portfolioName}</p>
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
            Add New Account
          </button>
        </div>

        <button 
          className="back-button"
          onClick={() => navigate('/portfolios')}
        >
          ← Back to Portfolios
        </button>

        <div className="table-container">
          <table className="database-table">
            <thead>
              <tr>
                <th>№</th>
                <th>Name</th>
                <th>Type</th>
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="loading-cell">Loading accounts...</td>
                </tr>
              ) : filteredAccounts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-cell">
                    {accounts.length === 0 ? "No accounts found. Create your first account to get started." : "No matching accounts found."}
                  </td>
                </tr>
              ) : (
                filteredAccounts.map(account => (
                  <tr key={account.id}>
                    <td>{account.id}</td>
                    <td>{account.name}</td>
                    <td>{account.type}</td>
                    <td>{account.createdAt}</td>
                    <td className="actions">
                      <button 
                        className="action-btn view-btn"
                        onClick={() => handleViewAccount(account)}
                      >
                        View
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => {
                          setSelectedAccount(account);
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

      {/* Add Account Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Add New Account</h2>
            <form onSubmit={handleAddAccount}>
              <div className="form-group">
                <label htmlFor="accountName">Account Name:</label>
                <input
                  type="text"
                  id="accountName"
                  value={newAccount.name}
                  onChange={(e) => setNewAccount({...newAccount, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="accountType">Account Type:</label>
                <select
                  id="accountType"
                  value={newAccount.type}
                  onChange={(e) => setNewAccount({...newAccount, type: e.target.value})}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Investment">Investment</option>
                  <option value="Savings">Savings</option>
                  <option value="Retirement">Retirement</option>
                  <option value="Checking">Checking</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit">Create Account</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete the account "{selectedAccount?.name}"?</p>
            <div className="modal-actions">
              <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button onClick={handleDeleteAccount} className="delete-confirm">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accounts;