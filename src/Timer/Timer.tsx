import * as React from "react";
import Pointer from "../Pointer";

import { svgPath } from "../utils";
import * as Shield from "./shield.svg";
import * as Glass from "./glass.svg";

interface TimerProps {
  minutes: number;
}

interface TimerState {
  counter: number;
  isRunning: boolean;
  tick: number | void;
}

const MAXIMUM_MINUTES = 60;

class Timer extends React.PureComponent<TimerProps, TimerState> {
  state = {
    counter: 0,
    isRunning: false,
    tick: 0,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ counter: this.props.minutes * 60 * 60 });
  }

  componentWillUnmount() {
    this.stop();
  }

  toggle = () => {
    this.setState(
      {
        isRunning: !this.state.isRunning,
      },
      () => {
        this.state.isRunning ? this.start() : this.stop();
      }
    );
  };

  tick = () => {
    if (this.state.counter <= 0) return;

    this.setState({
      counter: this.state.counter - 1,
      tick: requestAnimationFrame(this.tick),
    });
  };

  start = () => {
    this.setState({
      tick: requestAnimationFrame(this.tick),
    });
  };

  stop = () => {
    this.setState({
      tick: cancelAnimationFrame(this.state.tick),
    });
  };

  render() {
    const percent = 100 * this.state.counter / (MAXIMUM_MINUTES * 60 * 60);
    return (
      <div>
        <div className="Timer">
          <img src={svgPath(Shield)} alt="Timer Shield" />
          <Pointer percent={percent} />
          <img src={svgPath(Glass)} alt="Timer Shield" />
        </div>

        <div>Frames: {Math.floor(this.state.counter / 60)}</div>
        <button onClick={this.toggle}>
          {this.state.isRunning ? "Stop" : "Start"}
        </button>
      </div>
    );
  }
}

export default Timer;
