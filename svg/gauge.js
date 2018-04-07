import React from 'react'
import PropTypes from 'prop-types'
import SvgWidget from './widget'

/**
 * Gauge widget.
 * @public
 */
export default class Gauge extends React.PureComponent {
  formatValue(value) {
    p = this.props.precision ? this.props.precision : 0;
    return value.toFixed(p);
  }

  getAngle(value) {
    value = value < this.props.min ? this.props.min : value;
    value = value > this.props.max ? this.props.max : value;
    return (value - this.props.min) / (this.props.max - this.props.min) * 250 - 125;
  }

  render() {
    const { x, y, width, height, min, max, value, color, units } = this.props;

    return(
      <SvgWidget x={x} y={y} width={width} height={height}
        viewBox={{width: 500, height: 470}}
      >
        <path fill="none" stroke="#555555" strokeWidth="50px"
          d={describeArc(250, 300, 160, -125, 125)} />

        <path fill="none" stroke={color} strokeWidth="50px"
          d={describeArc(250, 300, 160, -125, this.getAngle(value))} />

        <path fill="none" stroke={color} strokeWidth="8px"
          d={describeArc(250, 300, 193, -125, 125)} />

        <text x="120" y="425" fontSize="22" fontWeight="bold" fill="#9d9d9d"
          textAnchor="middle" transform="rotate(-35 110 405)">
          {this.formatValue(min)}
        </text>

        <text x="380" y="425" fontSize="22" fontWeight="bold" fill="#9d9d9d"
          textAnchor="middle" transform="rotate(35 390 405)">
          {this.formatValue(max)}
        </text>

        <text x="250" y="310" fontSize='70' fontWeight="bold" fill={color} textAnchor="middle">
          {this.formatValue(value) + (units ? units : '')}
        </text>

      </SvgWidget>
    );
  }
}

Gauge.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  units: PropTypes.string,
  precision: PropTypes.number,
};

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle){
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
}
