import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getTechnologiesByType } from '../../selectors/technologies';

export const Stack = (props) => {
  const { name, technologies = [], type } = props;
  return (
    <div>
      <h3>{name} Stack</h3>
      <ul className="list-unstyled">
        {technologies.map(technology => <li key={technology.id}>{technology.name}</li>)}
      </ul>
      <Link className="text-decoration-none" to={`/stacks/${type}`}>Learn More&nbsp;<i className="fas fa-caret-right"></i></Link>
    </div>
  );
}

const mapStateToProps = (state, props) => ({
  technologies: getTechnologiesByType(state.technologies, props.type)
});

export default connect(mapStateToProps)(Stack);