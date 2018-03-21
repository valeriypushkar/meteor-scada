import MeteorScada from '../../core/common/namespace'
import RuntimeDataClient from './runtime'


/**
 * Observe data changes on client.
 * @param {function} dataFunc function returns props for the wrapped component
 * @param {React.Component} WrappedComponent component to be wrapped
 */
export default function withData(dataFunc, WrappedComponent) {
  // TODO: implement observer
}

MeteorScada.withData = withData;
