import React from 'react';
import {
  Animated,
  Easing,
} from 'react-native';
import CircularProgress from './CircularProgress';
const AnimatedProgress = Animated.createAnimatedComponent(CircularProgress);

export default class AnimatedCircularProgress extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fillAnimation: new Animated.Value(props.prefill)
    }
  }

  componentDidMount() {
    this.animate();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fill !== this.props.fill) {
      this.animate();
    }
  }

  animate(toVal, dur, ease) {
    const toValue = toVal || this.props.fill;
    const duration = dur || this.props.duration;
    const easing = ease || this.props.easing;

    return Animated.timing(this.state.fillAnimation, {
      toValue,
      easing,
      duration,
    }).start(this.props.onAnimationComplete);
  }

  render() {
    const { fill, prefill, ...other } = this.props;

    return (
      <AnimatedProgress
        {...other}
        fill={this.state.fillAnimation}
      />
    );
  }
}


AnimatedCircularProgress.defaultProps = {
  duration: 500,
  easing: Easing.out(Easing.ease),
  prefill: 0,
};