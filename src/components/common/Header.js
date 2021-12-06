import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <nav className="navbar navbar-expand">
      <div className="container-fluid">
        <a className="navbar-brand" href="https://leanstacks.com/" target="_blank" title="About LeanStacks">
          <img src="/assets/img/leanstacks-icon-64.png" alt="" width="24" height="24" className="d-inline-block align-text-top me-2" />
          <span className="text-primary">LEAN</span><span className="fw-bold">STACKS</span>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink to="/" exact className="nav-link">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/stacks" className="nav-link">Technologies</NavLink>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="https://github.com/leanstacks/skeleton-ui-react" target="_blank" title="View it on GitHub"><i className="fab fa-github"></i></a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
);

export default Header;
