import React from 'react';

const Technology = (props) => (
  <div className="row">
    <div className="col">
      <h4>{props.technology.name}</h4>
      { props.technology.version && 
      <div><strong>Version:</strong>&nbsp;{props.technology.version}</div>
      }
      { props.technology.license && 
      <div>
        <strong>License:</strong>&nbsp;{props.technology.license}
        { props.technology.licenseUrl && 
          <a href={props.technology.licenseUrl} title={props.technology.license} target="_blank">&nbsp;<i className="fas fa-external-link-alt"></i></a>
        }
      </div>
      }
      <div className="lead mt-3">{props.technology.description}</div>
      { props.technology.url && 
      <div className="text-right mt-3">
        <a href={props.technology.url} title={props.technology.name} target="_blank">Go to website&nbsp;<i className="fas fa-external-link-alt"></i></a>
      </div>
      }
    </div>
  </div>
);

export default Technology;