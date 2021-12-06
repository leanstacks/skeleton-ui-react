import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import capitalize from 'lodash/capitalize';

import { getTechnologiesByType, getTechnology } from '../../selectors/technologies';
import Technology from './Technology';

export const StackDetailPage = (props) => (
  <div className="page">
    <div className="container">
      <div className="row mt-5 mb-3">
        <div className="col-12">
          <h2 className="display-4">
            {capitalize(props.stackType)} Stack
          </h2>
          <div className="lead">Select any technology to view additional detail.</div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12 col-md-6 mb-3 mb-md-0">
          <h3>Technologies</h3>
          <ul className="list-unstyled mb-4">
            {
              props.technologies.map((technology) => (
                <li key={technology.id}>
                  <Link className="text-decoration-none" to={`/stacks/${props.stackType}/technologies/${technology.id}`}>{technology.name}</Link>
                </li>
              ))
            }
          </ul>
          <div>
            <Link className="text-decoration-none" to="/stacks"><i className="fas fa-caret-left"></i>&nbsp;Back</Link>
          </div>
        </div>

        {props.technology &&
          <div className="col-12 col-md-6 mb-3 mb-md-0">
            <div className="d-none d-md-block ps-2 py-3 border-2 border-start border-secondary h-100">
              <Technology technology={props.technology} />
            </div>
            <div className="d-md-none mt-2 pt-2 border-2 border-top border-secondary">
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

export default withRouter(connect(mapStateToProps)(StackDetailPage));