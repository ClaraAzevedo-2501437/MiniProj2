const express = require('express');
let router = express.Router();
const ExpertController = require('../controllers/expert.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");
const RoleMiddleware = require("../controllers/role.middleware");

router.route('/')
    .get(AuthController.checkAuth, ExpertController.get)
    .post(AuthController.checkAuth, RoleMiddleware.requireAdmin, [
        body('name').isString(),
        body('specialty').isString(),
        body('email').isEmail(),
        body('institution').optional().isString(),
        body('bio').optional().isString(),
        sanitizeBody('bio').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical)
    ], ExpertController.create);

router.route("/deactivate/:id")
    .put(AuthController.checkAuth, RoleMiddleware.requireAdmin, [param("id").isMongoId()], ExpertController.deactivate);

router.route("/activate/:id")
    .put(AuthController.checkAuth, RoleMiddleware.requireAdmin, [param("id").isMongoId()], ExpertController.activate);

router.route('/:id')
    .get(AuthController.checkAuth, [param("id").isMongoId()], ExpertController.getOne)
    .put(AuthController.checkAuth, RoleMiddleware.requireAdmin, [param("id").isMongoId()], ExpertController.update)
    .delete(AuthController.checkAuth, RoleMiddleware.requireAdmin, [param("id").isMongoId()], ExpertController.delete);

module.exports = router;
