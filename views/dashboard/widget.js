import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

/**
 * Dashboard widget.
 * @public
 */
class Widget extends React.PureComponent {

  renderHeight(content) {
    const { classes, width, height } = this.props;

    // Calculate room height in percents of width
    const calcHeight = height / width * 100 + "%";

    return (
      <div style={{paddingTop: calcHeight}}>
        <div className={classes.height}>
          {content}
        </div>
      </div>
    );
  }

  renderWidth(content) {
    const { classes, parentWidth, width, height } = this.props;

    // Calculate room width in percents of parent width
    // If parent width is smaller than room width => use 100%
    const calcWidth = (!width || width >= parentWidth) ? "100%" :
      width / parentWidth * 100 + "%";

    return (
      <div className={classes.width} style={{width: calcWidth}}>
        <div className={classes.border}/>
        {content}
      </div>
    );
  }

  render() {
    const { classes, height } = this.props;

    let content = (
      <div className={classes.content}>
        {this.props.children}
      </div>
    );

    if (height) {
      content = this.renderHeight(content);
    }

    return this.renderWidth(content);
  }
}

Widget.propTypes = {
  parentWidth: PropTypes.number, // no require to avoid warning
  width: PropTypes.number,
  height: PropTypes.number
};

const widgetPadding = 8;

const styles = theme => ({
  content: {
    position: 'relative',
    padding: widgetPadding,
    width: '100%',
    height: '100%',
  },
  width: {
    position: 'relative',
  },
  height: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  border: {
    position: 'absolute',
    top: widgetPadding,
    left: widgetPadding,
    bottom: widgetPadding,
    right: widgetPadding,

    boxShadow: theme.shadows[1],
    background: theme.palette.background.paper,
  },
});

export default withStyles(styles)(Widget);
