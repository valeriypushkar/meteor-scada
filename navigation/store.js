import MeteorScada from '../core/common/namespace'

/**
 * @file Navigation configuration store.
 * User needs to register NavigationProvider to provide configuration.
 * @see NavigationProvider
 * @private
 */

var navigation = {};
var subscribers = new Map();
var lastId = 1;

/**
 * Publish new navigation configuration.
 * NavigationProvider use this method to provide new configuration.
 * @param {object} nav new navigation configuration
 * @see NavigationProvider
 * @private
 */
export function publishNavigation(nav) {
  if (navigation === nav) {
    return; // Avoid endless loop though it should not happen
  }

  // Update configuration and notify all subscribers
  navigation = nav;
  subscribers.forEach(value => value(navigation));
}

/**
 * Subscribe to navigation configuration changes.
 * @param {function} func callback function that receives new configuration
 * @see NavigationConsumer
 * @private
 */
export function subscribeNavigation(func) {
  subscribers.set(lastId, func);
  func(navigation); // update with current configuration
  return lastId++;
}

/**
 * Unsubscribe from navigation configuration changes.
 * @param {function} id
 * @see NavigationConsumer
 * @private
 */
export function unsubscribeNavigation(id) {
  subscribers.delete(id);
}
