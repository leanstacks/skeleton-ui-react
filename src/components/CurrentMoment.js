import React from 'react';
import moment from 'moment';

export default class CurrentMoment extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      format: props.format || 'M/D/YY h:mm A',
      now: moment()
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(this.refreshCurrentMoment, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  refreshCurrentMoment = () => {
    const now = moment();
    this.setState(() => ({ now }));
  };

  render() {
    return (
      <span>{this.state.now.format(this.state.format)}</span>
    );
  }

};