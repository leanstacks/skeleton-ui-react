import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getTechnologiesByType } from '../selectors/technologies';

const Stack = (props) => {
  return (
    <div>
      <h3>{props.name} Stack</h3>
      <ul className="list-unstyled">
        {
          props.technologies.map((technology) => (
            <li key={technology.id}>{technology.name}</li>
          ))
        }
      </ul>
      <Link to={'/stacks/'+props.type}>Learn More&nbsp;<i className="fas fa-caret-right"></i></Link>
    </div>
  );
}

const mapStateToProps = (state, props) => ({
  technologies: getTechnologiesByType(state.technologies, props.type)
});

export default connect(mapStateToProps)(Stack);