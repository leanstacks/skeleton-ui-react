import React from 'react';

const getSizeClass = (size) => {
  switch (size) {
    case 'xl':
      return 'h1';
    case 'lg':
      return 'lead';
    case 'sm':
      return 'small';
    default:
      return '';
  };
};

const BusyIndicator = (props) => {
  const icon = props.icon || 'fa-circle-notch';
  return (
    <div className="h-100 d-flex flex-column justify-content-center text-center">
      <div className={getSizeClass(props.size)}>
        { 
          props.title ? (
            <span>{props.title}&nbsp;<i className={'fas fa-spin ' + icon} /></span>
          ) : (
            <i className={'fas fa-spin ' + icon} />
          )
        }
      </div>
    </div>
  );
};

export default BusyIndicator;
