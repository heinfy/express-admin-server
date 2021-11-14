var RolesService = require('../service/roles');

module.exports = class UsersController {
  roles(req, res) {
    RolesService.roles(req, res);
  }
  create(req, res) {
    RolesService.create(req, res);
  }
  update(req, res) {
    RolesService.update(req, res);
  }
  delete(req, res) {
    RolesService.delete(req, res);
  }
  getRoleInfoByRoleid(req, res) {
    RolesService.getRoleInfoByRoleid(req, res);
  }
  giveRoleAuths(req, res) {
    RolesService.giveRoleAuths(req, res);
  }
  getAuthsByRoleid(req, res) {
    RolesService.getAuthsByRoleid(req, res);
  }
};
