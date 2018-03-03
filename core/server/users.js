import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { Roles } from 'meteor/alanning:roles'

// Create default user on start up if it doesn't exist
const defaultUser = {
  username: 'admin',
  email: '',
  password: 'Password123!',
  profile: {
    name: 'Admin',
    resetRequired: true
  },
  roles: ['guest', 'operator', 'admin']
};

const userExists = Meteor.users.findOne({ 'username': defaultUser.username });

if (!userExists) {
  const {roles, ...options} = defaultUser;
  const userId = Accounts.createUser(options);
  Roles.addUsersToRoles(userId, roles);
}
