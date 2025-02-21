const express = require('express');
const managerRoute = express.Router();
const managerController = require('../controller/managerController');
const authentication = require('../middleware/jwt');
const checkAdminOrManager = require('../middleware/checkAdminOrManager');
const managerMulter = require('../middleware/managerimg');

managerRoute.post("/Register", authentication, managerMulter, managerController.managerRegister);
managerRoute.post("/Login", managerController.managerLogin);
managerRoute.get("/Profile", authentication, managerController.managerProfile);
managerRoute.post("/ChangePassword", authentication, managerController.managerChangePassword);
managerRoute.post("/forgotPassword", managerController.forgotPassword);
managerRoute.get("/EmployeeList",authentication,managerController.employeeList);

managerRoute.delete("/Delete", authentication, checkAdminOrManager, managerController.deleteManager);
managerRoute.put("/Update", authentication, managerMulter, managerController.updateManager);

module.exports = managerRoute;