import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header className="mb-4">
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="https://leanstacks.com/" target="_blank"><span className="text-blue">LEAN</span><strong>STACKS</strong></a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink to="/landing" exact className="nav-link">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/stacks" className="nav-link">The Stack</NavLink>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="https://github.com/leanstacks/skeleton-ui-react" target="_blank"><i className="fab fa-github"></i></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://twitter.com/leanstacker" target="_blank"><i className="fab fa-twitter"></i></a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);

export default Header;
