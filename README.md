# MeteorScada

Meteor package for building SCADA systems

## Getting Started

First, install Meteor. The instruction can be found at https://www.meteor.com/install.

Create an empty Meteor project:

```bash
meteor create --bare <path>
```

Since meteor-scada package has not been published on Atmosphere yet, you need to clone meteor-scada repository to `packages` directory of your project. You can also keep the copy of meteor-scada somewhere else, and create a symbolic link.


```bash
mkdir packages
git -C packages clone git@github.com:alexshn/meteor-scada.git
```

Remove redundant default packages and add meteor-scada package to the project:
```bash
meteor remove standard-minifier-css
meteor add meteor-scada
```

Install NPM dependencies:
```bash
meteor npm install --save meteor-node-stubs @babel/runtime bcrypt
meteor npm install --save react react-dom prop-types react-router react-router-dom
meteor npm install --save material-ui@next
```

Run your project:
```bash
meteor
```
