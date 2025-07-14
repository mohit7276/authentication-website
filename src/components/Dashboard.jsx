import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaUser, FaEnvelope, FaCalendar, FaSignOutAlt, FaCog, FaBell, FaChartLine } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import './Dashboard.css'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  const handleLogout = async () => {
    await logout()
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getAvatarInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const stats = [
    { title: 'Profile Views', value: '1,234', icon: FaUser, color: '#667eea' },
    { title: 'Messages', value: '42', icon: FaEnvelope, color: '#38a169' },
    { title: 'Notifications', value: '8', icon: FaBell, color: '#f56500' },
    { title: 'Analytics', value: '+12%', icon: FaChartLine, color: '#e53e3e' }
  ]

  return (
    <div className="dashboard">
      {/* Header */}
      <motion.header 
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="header-content">
          <div className="header-left">
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-subtitle">Welcome back, {user?.name}!</p>
          </div>
          <div className="header-right">
            <motion.button
              className="btn btn-secondary"
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSignOutAlt />
              Logout
            </motion.button>
          </div>
        </div>
      </motion.header>

      <div className="dashboard-content">
        {/* Sidebar */}
        <motion.aside 
          className="dashboard-sidebar"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="sidebar-user">
            <div className="user-avatar">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                <span className="avatar-initials">
                  {getAvatarInitials(user?.name || 'User')}
                </span>
              )}
            </div>
            <div className="user-info">
              <h3 className="user-name">{user?.name}</h3>
              <p className="user-email">{user?.email}</p>
              <span className="user-provider">
                {user?.provider === 'local' ? 'Local Account' : `${user?.provider} Account`}
              </span>
            </div>
          </div>

          <nav className="sidebar-nav">
            <button
              className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <FaChartLine />
              Overview
            </button>
            <button
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <FaUser />
              Profile
            </button>
            <button
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <FaCog />
              Settings
            </button>
          </nav>
        </motion.aside>

        {/* Main Content */}
        <motion.main 
          className="dashboard-main"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {activeTab === 'overview' && (
            <div className="overview-content">
              <h2 className="section-title">Account Overview</h2>
              
              {/* Stats Grid */}
              <div className="stats-grid">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    className="stat-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="stat-icon" style={{ color: stat.color }}>
                      <stat.icon />
                    </div>
                    <div className="stat-content">
                      <h3 className="stat-value">{stat.value}</h3>
                      <p className="stat-title">{stat.title}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Account Details */}
              <motion.div 
                className="account-details"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h3 className="details-title">Account Information</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <FaUser className="detail-icon" />
                    <div>
                      <label>Full Name</label>
                      <p>{user?.name}</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <FaEnvelope className="detail-icon" />
                    <div>
                      <label>Email Address</label>
                      <p>{user?.email}</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <FaCalendar className="detail-icon" />
                    <div>
                      <label>Member Since</label>
                      <p>{formatDate(user?.createdAt)}</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <FaCog className="detail-icon" />
                    <div>
                      <label>Account Type</label>
                      <p>{user?.provider === 'local' ? 'Email & Password' : `${user?.provider} OAuth`}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="profile-content">
              <h2 className="section-title">Profile Settings</h2>
              <div className="profile-card">
                <div className="profile-avatar-section">
                  <div className="profile-avatar-large">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} />
                    ) : (
                      <span className="avatar-initials-large">
                        {getAvatarInitials(user?.name || 'User')}
                      </span>
                    )}
                  </div>
                  <button className="btn btn-secondary">Change Avatar</button>
                </div>
                <div className="profile-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-input"
                        value={user?.name || ''}
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        className="form-input"
                        value={user?.email || ''}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="form-actions">
                    <button className="btn btn-primary">Update Profile</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-content">
              <h2 className="section-title">Account Settings</h2>
              <div className="settings-sections">
                <div className="settings-section">
                  <h3>Security</h3>
                  <div className="setting-item">
                    <div>
                      <h4>Password</h4>
                      <p>Update your password to keep your account secure</p>
                    </div>
                    <button className="btn btn-secondary">Change Password</button>
                  </div>
                  <div className="setting-item">
                    <div>
                      <h4>Two-Factor Authentication</h4>
                      <p>Add an extra layer of security to your account</p>
                    </div>
                    <button className="btn btn-secondary">Enable 2FA</button>
                  </div>
                </div>
                
                <div className="settings-section">
                  <h3>Privacy</h3>
                  <div className="setting-item">
                    <div>
                      <h4>Profile Visibility</h4>
                      <p>Control who can see your profile information</p>
                    </div>
                    <select className="form-input">
                      <option>Public</option>
                      <option>Private</option>
                      <option>Friends Only</option>
                    </select>
                  </div>
                </div>

                <div className="settings-section">
                  <h3>Notifications</h3>
                  <div className="setting-item">
                    <div>
                      <h4>Email Notifications</h4>
                      <p>Receive updates and news via email</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.main>
      </div>
    </div>
  )
}

export default Dashboard
