import React from 'react';

const getSizeClass = (size) => {
  switch (size) {
    case 'xl':
      return 'busy-indicator--xl';
    case 'lg':
      return 'busy-indicator--lg';
    case 'sm':
      return 'busy-indicator--sm';
    default:
      return 'busy-indicator--md';
  };
};

const BusyIndicator = (props) => {
  const icon = props.icon || 'fa-circle-o-notch';
  return (
    <div className={'busy-indicator ' + getSizeClass(props.size)}>
      <div className="busy-indicator__content">
        <div className="busy-indicator__heading">
          <div className="busy-indicator__title">{props.title}</div>
        </div>
        <div className="busy-indicator__body">
          <i className={'busy-indicator__icon fa fa-fw fa-spin ' + icon} />
        </div>
      </div>
    </div>
  );
};

export default BusyIndicator;
