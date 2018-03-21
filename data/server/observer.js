import MeteorScada from '../../core/common/namespace'
import RuntimeDataServer from './runtime'

/**
 * Observe data changes on server.
 * Runs function that is provided a parameter and remembers which data is used.
 * When some of data is changed re-runs the function.
 * @param {function} func function that uses data
 * @return TBD: id or object to stop observer
 */
export default function observeData(func) {
  // TODO: implement observer
}

MeteorScada.observeData = observeData;
