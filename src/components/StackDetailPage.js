import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { getTechnologiesByType, getTechnology } from '../selectors/technologies';
import Technology from './Technology';

const StackDetailPage = (props) => (
  <div className="page">
    <div className="container">
      <h2 className="display-4">{_.capitalize(props.stackType)} Stack</h2>

      <div className="row">
        <div className="col">
          <div className="lead">Select any technology to view additional detail.</div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-sm-6 col-xs-12">
          <h3>Technologies</h3>
          <ul className="list-unstyled">
          {
            props.technologies.map((technology) => (
              <li key={technology.id}>
                <Link to={`/stacks/${props.stackType}/technologies/${technology.id}`}>{technology.name}</Link>
              </li>
            ))
          }
          </ul>
          <div className="mt-4">
            <Link to="/stacks"><i className="fas fa-caret-left"></i>&nbsp;Back</Link>
          </div>
        </div>

        { props.technology && 
        <div className="col-sm-6 col-xs-12">
          <div className="d-none d-sm-block pl-2 pt-3 pb-3 border-left border-dark">
            <Technology technology={props.technology} />
          </div>
          <div className="d-sm-none mt-2 pt-2 border-top border-dark">
            <Technology technology={props.technology} />
          </div>
        </div>
        }
      </div>
    </div>
  </div>
);

const mapStateToProps = (state, props) => ({
  stackType: props.match.params.stackType,
  technologies: getTechnologiesByType(state.technologies, props.match.params.stackType),
  technology: getTechnology(state.technologies, props.match.params.technologyId)
});

export default connect(mapStateToProps)(StackDetailPage);