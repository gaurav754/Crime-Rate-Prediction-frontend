import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="brand-logo">
              <span className="brand-icon">🛡️</span>
              <span className="brand-text">CrimeWatch</span>
            </div>
            <p className="footer-description">
              AI-powered crime prediction and community safety platform protecting communities worldwide.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-section">
              <h4>Platform</h4>
              <Link to="/prediction">Crime Prediction</Link>
              <Link to="/community">Community</Link>
              <Link to="/analytics">Analytics</Link>
            </div>

            <div className="footer-section">
              <h4>Company</h4>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/privacy">Privacy Policy</Link>
            </div>

            <div className="footer-section">
              <h4>Support</h4>
              <Link to="/help">Help Center</Link>
              <Link to="/docs">Documentation</Link>
              <Link to="/status">System Status</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 CrimeWatch. All rights reserved.</p>
          <div className="footer-social">
            <span>Follow us:</span>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="LinkedIn">💼</a>
            <a href="#" aria-label="GitHub">🐙</a>
          </div>
        </div>
      </div>
    </footer>
  );
}