import React from 'react';
import '../css/Details.css';

const DetailsSection: React.FC = () => {
  return (
    <section className="details-section">
      <div className="details-content">
        <div className="details-card">
          <h3>How does this app work?</h3>
          <p>
            This app helps you browse Web4 content on NEAR blockchain in two ways:
            For master accounts (like example.near), it redirects to example.near.page.
            For subaccounts (like sub.example.near), it fetches the content directly
            through IPFS and displays it in your browser. You can also discover and
            explore other Web4 apps through our app directory.
          </p>
        </div>

        <div className="details-card">
          <h3>What is the reason for this tool?</h3>
          <p>
            If you know the NEAR account, you can just type it in to a browser and add .page to the end.
            However, this only works for master accounts. This tool enables browsing content on Web4 from subaccounts.
            For example, you can access content from subaccounts like key.sleet.near using this tool.
          </p>
        </div>

        <div className="details-card">
          <h3>What is Web4?</h3>
          <p>
            Web4 is the future of the web using IPFS and NEAR. Learn more at
            <a href="https://web4.near.page" target="_blank" rel="noopener noreferrer"> web4.near.page</a>,
            you can submit apps at
            <a href="https://awesomeweb4.near.page" target="_blank" rel="noopener noreferrer"> awesomeweb4.near.page</a>
          </p>
        </div>

        <div className="details-card">
          <h3>Will this tool become obsolete?</h3>
          <p>
            Our current main goal is to allow users to access Web4 sites that are deployed to subaccounts.
            While there may be an easier solution in the future, we also want this to be a platform for
            discovering apps and people on Web4.
          </p>
        </div>
      </div>
      <footer className="copyright">
        <p>© 2025 by sleet.near</p>
      </footer>
    </section>
  );
};

export default DetailsSection;