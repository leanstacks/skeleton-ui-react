import React from 'react';
import { DateTime } from 'luxon';

export default class CurrentMoment extends React.Component {

  constructor(props) {
    super(props);

    const { format = 'f' } = this.props;
    const now = DateTime.now().toFormat(format);

    this.state = {
      format,
      now
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(this.refreshCurrentMoment, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  refreshCurrentMoment = () => {
    const now = DateTime.now().toFormat(this.state.format);
    this.setState({ now });
  };

  render() {
    return (
      <span>{this.state.now}</span>
    );
  }

};