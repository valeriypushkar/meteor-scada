import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

/**
 * Dashboard widget group.
 * @public
 */
class Group extends React.PureComponent {
  render() {
    const { classes, parentWidth } = this.props;
    let { width } = this.props;

    if (!width) {
      width = parentWidth;
    }

    const calcWidth = (width >= parentWidth) ? "100%" :
      width / parentWidth * 100 + "%";

    return (
      <div className={classes.group} style={{width: calcWidth}}>
        {React.Children.map(this.props.children,
          (child) => React.cloneElement(child, {parentWidth: width})
        )}
      </div>
    );
  }
}

Group.propTypes = {
  parentWidth: PropTypes.number, // no require to avoid warning
  width: PropTypes.number,
  // TODO: check children type. should be Widget
};

const styles = theme => ({
  group: {
    position: 'relative',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },
});

export default withStyles(styles)(Group);
