import './core/client/npm-deps'
import './core/client/startup'

// Re-export MeteorScada objects
export MeteorScada from './core/common/namespace'

export { default as NavigationProvider, configureNavigation } from './navigation/provider'
export { default as withNavigation } from './navigation/consumer'
export { default as NavMenuItem } from './navigation/menuitem'
export { default as NavSubMenuItem } from './navigation/submenuitem'
export { default as NavTabItem } from './navigation/tabitem'

export { default as DataTypes, configureData, getData } from './data/common/datatypes'
export { default as withData } from './data/client/observer'
