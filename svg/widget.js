import React from 'react'
import PropTypes from 'prop-types'

/**
 * SVG widget.
 * @public
 */
export default class SvgWidget extends React.PureComponent {
  render() {
    const { x, y, width, height, viewBox, nonUniformScaling } = this.props;
    const viewBoxValue = (viewBox.minX ? viewBox.minX : 0).toString() + ' ' +
      (viewBox.minY ? viewBox.minY : 0).toString() + ' ' +
      viewBox.width.toString() + ' ' + viewBox.height.toString();

    return (
      <svg xmlns='http://www.w3.org/2000/svg' version='1.1'
        x={x} y={y}
        width={width ? width : '100%'}
        height={height ? height : '100%'}
        viewBox={viewBoxValue}
        preserveAspectRatio={nonUniformScaling ? 'none' : 'xMidYMid'}
      >
        {this.props.children}
      </svg>
    );

  }
}

SvgWidget.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.shape({
    minX: PropTypes.number,
    minY: PropTypes.number,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  nonUniformScaling: PropTypes.bool,
};
