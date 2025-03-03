const express = require('express');
const employeeRoute = express.Router();
const employeeController = require('../controller/employeeController');
const checkAdminOrManager = require('../middleware/checkAdminOrManager');
const authentication = require('../middleware/jwt');
const employeeMulter = require('../middleware/empolyeeimg');

employeeRoute.post("/Register",authentication, employeeMulter, employeeController.employeeRegister);
employeeRoute.post("/Login", employeeController.employeeLogin);
employeeRoute.get("/List", authentication, checkAdminOrManager, employeeController.employeeList);
employeeRoute.get("/Profile", authentication, employeeController.employeeProfile);
employeeRoute.post("/ChangePassword", authentication, employeeController.employeeChangePassword);
employeeRoute.post("/ForgotPassword", employeeController.forgotPassword);
employeeRoute.post("/ResetPassword", employeeController.resetPassword);
employeeRoute.put("/Update", authentication, employeeMulter, employeeController.updateemployee);

module.exports = employeeRoute;