import React, { useEffect, useState } from 'react'
import './Home.css'

const Home = () => {
  const [circleOpacity, setCircleOpacity] = useState(1)
  const [vulnerabilities, setVulnerabilities] = useState(0)
  const [reported, setReported] = useState(0)
  const [engagements, setEngagements] = useState(0)
  const [formStatus, setFormStatus] = useState({ type: '', message: '' })

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const maxScroll = 600
      const newOpacity = Math.max(0, 1 - (scrollPosition / maxScroll))
      setCircleOpacity(newOpacity)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const duration = 2000 // 2 seconds
    const targetVulnerabilities = 10000
    const targetReported = 1400
    const targetEngagements = 300
    
    const increment = 50
    const steps = duration / increment
    
    const vulnStep = targetVulnerabilities / steps
    const reportStep = targetReported / steps
    const engagementStep = targetEngagements / steps
    
    let currentStep = 0
    
    const timer = setInterval(() => {
      currentStep++
      
      if (currentStep <= steps) {
        setVulnerabilities(Math.floor(vulnStep * currentStep))
        setReported(Math.floor(reportStep * currentStep))
        setEngagements(Math.floor(engagementStep * currentStep))
      } else {
        setVulnerabilities(targetVulnerabilities)
        setReported(targetReported)
        setEngagements(targetEngagements)
        clearInterval(timer)
      }
    }, increment)
    
    return () => clearInterval(timer)
  }, [])

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setFormStatus({ type: 'loading', message: 'Sending...' })

    const formData = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      company: e.target.company.value,
      jobTitle: e.target.jobTitle.value,
      message: e.target.message.value,
      timestamp: new Date().toISOString()
    }

    try {
      const response = await fetch('https://webhook.site/0ffb128b-36cb-47d4-a3b9-04b5588f5f25', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      // With no-cors mode, we can't read the response, so we assume success
      setFormStatus({ type: 'success', message: 'Thank you! We\'ll contact you soon.' })
      e.target.reset()
      
      // Clear status message after 5 seconds
      setTimeout(() => {
        setFormStatus({ type: '', message: '' })
      }, 5000)
    } catch (error) {
      setFormStatus({ type: 'error', message: 'Something went wrong. Please try again.' })
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setFormStatus({ type: '', message: '' })
      }, 5000)
    }
  }

  return (
    <div className="home">
      <section className="hero">
        <div className="stars-container">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="star" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}></div>
          ))}
        </div>
        <div className="hero-content">
          <div className="hero-text-container">
            <h1 className="hero-title">Next Level Penetration Testing</h1>
            <p className="hero-subtitle">Delivering elite penetration testing at an exceptional value, marked by direct expert communication, high-quality analysis, and uniquely clear, actionable reporting that crafts a stronger security posture.</p>
            
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">{vulnerabilities.toLocaleString()}+</div>
                <div className="stat-label">Vulnerabilities Detected</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{reported.toLocaleString()}+</div>
                <div className="stat-label">Successfully Reported</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{engagements.toLocaleString()}+</div>
                <div className="stat-label">Client Engagements</div>
              </div>
            </div>
          </div>
          <div className="circle-animation-container" style={{ opacity: circleOpacity }}>
            <div className="circle-animation">
              <div className="circle-ring ring-1"></div>
              <div className="circle-ring ring-2"></div>
              <div className="circle-ring ring-3"></div>
              <div className="circle-ring ring-4"></div>
              <div className="circle-ring ring-5"></div>
              <div className="circle-ring ring-6"></div>
              <div className="circle-ring ring-7"></div>
              <div className="circle-ring ring-8"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="services-preview" id="services">
        <div className="stars-container">
          {[...Array(50)].map((_, i) => (
            <div key={`service-star-${i}`} className="star" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}></div>
          ))}
        </div>
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <div className="wave-services-container">
            <div className="services-vertical">
              {/* Row 1 */}
              <div className="service-row-pair">
                <div className="service-block">
                  <div className="service-dot"></div>
                  <h3>Web Application Penetration Testing</h3>
                  <p>Comprehensive security assessments identifying vulnerabilities in web applications, APIs, and authentication mechanisms with detailed exploitation analysis.</p>
                </div>
                <div className="service-block">
                  <div className="service-dot"></div>
                  <h3>API Penetration Testing</h3>
                  <p>Deep security analysis of RESTful and GraphQL APIs, testing authentication, authorization, data validation, and business logic flaws.</p>
                </div>
              </div>

              {/* Row 2 */}
              <div className="service-row-pair">
                <div className="service-block">
                  <div className="service-dot"></div>
                  <h3>Mobile Application Penetration Testing</h3>
                  <p>Comprehensive security testing for iOS and Android applications, including reverse engineering, insecure data storage, and network communication analysis.</p>
                </div>
                <div className="service-block">
                  <div className="service-dot"></div>
                  <h3>Network Penetration Testing & Assessments</h3>
                  <p>Infrastructure security assessments covering internal and external networks, identifying misconfigurations, vulnerabilities, and potential attack vectors.</p>
                </div>
              </div>

              {/* Row 3 */}
              <div className="service-row-pair">
                <div className="service-block">
                  <div className="service-dot"></div>
                  <h3>Active Directory Red Teaming</h3>
                  <p>Advanced adversarial simulations targeting Active Directory environments, testing detection capabilities and security controls through realistic attack scenarios.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="team-section" id="team">
        <div className="stars-container">
          {[...Array(50)].map((_, i) => (
            <div key={`team-star-${i}`} className="star" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}></div>
          ))}
        </div>
        <div className="container">
          <div className="team-content">
            <div className="team-left">
              <p className="team-subtitle">POWER UP YOUR SECURITY</p>
              <h2 className="team-title">Meet Our Expert Team</h2>
              <p className="team-description">
                Our team brings together elite cybersecurity professionals with deep expertise across penetration testing, red teaming, and security assessments, delivering unparalleled value through direct expert communication.
              </p>
              <a href="#contact" className="team-button">
                Contact Us →
              </a>
            </div>
            
            <div className="team-right">
              <div className="team-image-container">
                <img 
                  src="/images/certificates.png" 
                  alt="Certificates and Logos" 
                  className="team-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="customers-section" id="customers">
        <div className="stars-container">
          {[...Array(50)].map((_, i) => (
            <div key={`customers-star-${i}`} className="star" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}></div>
          ))}
        </div>
        <div className="container">
          <h2 className="customers-title">Hall of Fames</h2>
          <p className="customers-description">
            Our team members have been recognized by all Fortune 500 companies for identifying and reporting vulnerabilities in their products.
          </p>
        </div>
        
        <div className="logos-track-container">
          <div className="logos-track">
            <div className="logo-item">
              <img src="/images/logos/amazon2.png" alt="Amazon Logo" />
            </div>
            <div className="logo-item">
              <img src="/images/logos/paypal2.png" alt="PayPal Logo" />
            </div>
            <div className="logo-item">
              <img src="/images/logos/uber2.png" alt="Uber Logo" />
            </div>
            <div className="logo-item">
              <img src="/images/logos/appl2.png" alt="Apple Logo" />
            </div>
            <div className="logo-item">
              <img src="/images/logos/indrive2.png" alt="inDrive Logo" />
            </div>
            <div className="logo-item">
              <img src="/images/logos/salesforce2.png" alt="Salesforce Logo" />
            </div>
            <div className="logo-item">
              <img src="/images/logos/nylas2.png" alt="Nylas Logo" />
            </div>
            <div className="logo-item">
              <img src="/images/logos/calendly2.png" alt="Calendly Logo" />
            </div>
            <div className="logo-item">
              <img src="/images/logos/stellantis2.png" alt="Stellantis Logo" />
            </div>
            <div className="logo-item">
              <img src="/images/logos/tiktok2.png" alt="TikTok Logo" />
            </div>
            <div className="logo-item">
              <img src="/images/logos/visa2.png" alt="Visa Logo" />
            </div>
            {/* Duplicate for seamless loop */}
            <div className="logo-item">
              <img src="/images/logos/amazon2.png" alt="Amazon Logo" />
            </div>
            <div className="logo-item">
              <img src="/images/logos/paypal2.png" alt="PayPal Logo" />
            </div>
            <div className="logo-item">
              <img src="/images/logos/uber2.png" alt="Uber Logo" />
            </div>
            <div className="logo-item">
              <img src="/images/logos/appl2.png" alt="Apple Logo" />
            </div>
            <div className="logo-item">
              <img src="/images/logos/indrive2.png" alt="inDrive Logo" />
            </div>
            <div className="logo-item">
              <img src="/images/logos/salesforce2.png" alt="Salesforce Logo" />
            </div>
            <div className="logo-item">
              <img src="/images/logos/nylas2.png" alt="Nylas Logo" />
            </div>
            <div className="logo-item">
              <img src="/images/logos/calendly2.png" alt="Calendly Logo" />
            </div>
            <div className="logo-item">
              <img src="/images/logos/stellantis2.png" alt="Stellantis Logo" />
            </div>
            <div className="logo-item">
              <img src="/images/logos/tiktok2.png" alt="TikTok Logo" />
            </div>
            <div className="logo-item">
              <img src="/images/logos/visa2.png" alt="Visa Logo" />
            </div>
          </div>
        </div>
      </section>

      {/* <section className="blogs-section" id="blog">
        <div className="stars-container">
          {[...Array(50)].map((_, i) => (
            <div key={`blogs-star-${i}`} className="star" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}></div>
          ))}
        </div>
        <div className="container">
          <h2 className="section-title">Blog Posts</h2>
          
          <div className="blogs-grid">
            <div className="blog-card">
              <h3 className="blog-title">Advanced API Security Testing Techniques</h3>
              <p className="blog-description">
                Discover the latest methodologies for identifying vulnerabilities in modern REST and GraphQL APIs, including authentication bypass and injection attacks.
              </p>
            </div>

            <div className="blog-card">
              <h3 className="blog-title">Zero-Day Vulnerability Discovery</h3>
              <p className="blog-description">
                Learn how our team approaches zero-day research, from initial reconnaissance to responsible disclosure with major tech companies.
              </p>
            </div>

            <div className="blog-card">
              <h3 className="blog-title">Red Team Operations Best Practices</h3>
              <p className="blog-description">
                Explore effective strategies for simulating real-world attacks in Active Directory environments and improving your organization's security posture.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      <section className="reporting-section" id="reporting">
        <div className="stars-container">
          {[...Array(50)].map((_, i) => (
            <div key={`reporting-star-${i}`} className="star" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}></div>
          ))}
        </div>
        <div className="container">
          <div className="reporting-content">
            <div className="reporting-left">
              <p className="reporting-subtitle">CRYSTAL CLEAR INSIGHTS</p>
              <h2 className="reporting-title">How We Report</h2>
              <p className="reporting-description">
                Our reporting methodology sets the industry standard with uniquely clear, actionable documentation. Each vulnerability is meticulously detailed with proof-of-concept exploits, remediation guidance, and business impact analysis, ensuring your team can quickly understand and address security issues.
              </p>
              <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="reporting-button">
                View Sample Report →
              </a>
            </div>
            
            <div className="reporting-right">
              <div className="reporting-image-container">
                <img 
                  src="/images/reporting.png" 
                  alt="Reporting Integrations" 
                  className="reporting-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="stars-container">
          {[...Array(50)].map((_, i) => (
            <div key={`contact-star-${i}`} className="star" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}></div>
          ))}
        </div>
        <div className="contact-container">
          <div className="contact-left">
            <p className="contact-pretitle">Let's get you connected</p>
            <h2 className="contact-title">Contact Us</h2>
            
            <form className="contact-form" onSubmit={handleFormSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name:*</label>
                  <input type="text" id="firstName" placeholder="Enter your first name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name:*</label>
                  <input type="text" id="lastName" placeholder="Enter your last name" required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Business Email:*</label>
                  <input type="email" id="email" placeholder="Enter your email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone:*</label>
                  <input type="tel" id="phone" placeholder="Enter your phone number" required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="company">Company:*</label>
                  <input type="text" id="company" placeholder="Where do you work?" required />
                </div>
                <div className="form-group">
                  <label htmlFor="jobTitle">Job Title:*</label>
                  <input type="text" id="jobTitle" placeholder="What's your title?" required />
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="message">How can we assist you?*</label>
                <textarea id="message" rows="4" placeholder="Tell us about your needs..." required></textarea>
              </div>

              <button type="submit" className="contact-submit" disabled={formStatus.type === 'loading'}>
                {formStatus.type === 'loading' ? 'Sending...' : 'Submit'}
              </button>
              
              {formStatus.message && (
                <div className={`form-status ${formStatus.type}`}>
                  {formStatus.message}
                </div>
              )}
              
              <p className="contact-disclaimer">
                By clicking Submit, I agree to the use of my personal data in accordance with Rexar Privacy Notice.
              </p>
            </form>
          </div>

          <div className="contact-right">
            <div className="contact-promo">
              <h3 className="promo-title">Try Free Pentest Now</h3>
              <p className="promo-description">
                Schedule a personalized consultation with one of our security experts to discover vulnerabilities before attackers do.
              </p>
              <a href="#contact" className="promo-button">Get Started →</a>
            </div>

            <div className="contact-promo">
              <h3 className="promo-title">Security Assessment</h3>
              <p className="promo-description">
                Explore our comprehensive penetration testing services and see how we strengthen your security posture.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-line"></div>
        <div className="footer-content">
          <div className="footer-column footer-brand">
            <h3 className="footer-logo">Rexar</h3>
            <div className="footer-locations">
              <div className="location">
                <h4>USA</h4>
                <p>123 Security Street Suite 100</p>
                <p>San Francisco, CA 94102 United States</p>
              </div>
            </div>
            <div className="footer-social">
              <a href="#" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" aria-label="Twitter">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" aria-label="GitHub">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              <li><a href="#services">Web Application Penetration Testing</a></li>
              <li><a href="#services">API Penetration Testing</a></li>
              <li><a href="#services">Mobile Application Penetration Testing</a></li>
              <li><a href="#services">Network Penetration Testing</a></li>
              <li><a href="#services">Active Directory Red Teaming</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li><a href="#">About</a></li>
              <li><a href="#team">Team</a></li>
              <li><a href="#contact">Careers</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-links">
              <li><a href="#reporting">Reporting</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

        </div>
      </footer>
    </div>
  )
}

export default Home
