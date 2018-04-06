import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

/**
 * Dashboard view.
 * @public
 */
class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentWidth: this.calcCurrentWidth(),
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  calcCurrentWidth() {
    if (window.innerWidth >= 1300) return this.props.lgWidth;
    else if (window.innerWidth >= 768) return this.props.mdWidth;
    return this.props.smWidth;
  }

  onResize = () => {
    const newWidth = this.calcCurrentWidth();

    // Update state only if width is changed
    if (newWidth != this.state.currentWidth) {
      this.setState({currentWidth: newWidth});
    }
  }

  render() {
    const { classes, lgWidth } = this.props;
    const { currentWidth } = this.state;

    // Add parentWidth prop to the children
    return (
      <div className={classes.dashboard} >
        {React.Children.map(this.props.children,
          (child) => React.cloneElement(child, {parentWidth: currentWidth})
        )}
      </div>
    );
  }
}

Dashboard.propTypes = {
  smWidth: PropTypes.number.isRequired,
  mdWidth: PropTypes.number.isRequired,
  lgWidth: PropTypes.number.isRequired,
  // TODO: check children type. should be Widget
};

const styles = theme => ({
  dashboard: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    padding: 8,
  }
});

export default withStyles(styles)(Dashboard);
