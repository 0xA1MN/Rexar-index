import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const [servicesOpen, setServicesOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)

  const services = [
    'Web Application Penetration Testing',
    'API Penetration Testing',
    'Mobile Application Penetration Testing',
    'Network Penetration Testing & Assessments',
    'Active Directory Red Teaming'
  ]

  const resources = [
    { name: 'Team', link: '#team' },
    { name: 'Hall of Fames', link: '#customers' },
    { name: 'Blog', link: '#blog' }
  ]

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/images/secubility.png" alt="Rexar Logo" className="navbar-logo-icon" />
          Rexar
        </Link>

        <div className="navbar-menu">
          <div 
            className="navbar-item dropdown"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <span className="navbar-link">
              Services
              <span className="dropdown-icon">▼</span>
            </span>
            {servicesOpen && (
              <div className="dropdown-menu">
                {services.map((service, index) => (
                  <a key={index} href="#services" className="dropdown-item">
                    {service}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div 
            className="navbar-item dropdown"
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <span className="navbar-link">
              Resources
              <span className="dropdown-icon">▼</span>
            </span>
            {resourcesOpen && (
              <div className="dropdown-menu">
                {resources.map((resource, index) => (
                  <a key={index} href={resource.link} className="dropdown-item">
                    {resource.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          <a href="#reporting" className="navbar-link">
            Reporting
          </a>

          <a href="#" className="navbar-link">
            Company
          </a>

          <a href="#contact" className="contact-button">
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
