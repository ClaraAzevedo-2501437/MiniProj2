const express = require('express');
let router = express.Router();
const SponsorController = require('../controllers/sponsor.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");
const RoleMiddleware = require("../controllers/role.middleware");

router.route('/')
    .get(AuthController.checkAuth, SponsorController.get)
    .post(AuthController.checkAuth, RoleMiddleware.requireAdmin, [
        body('name').isString(),
        body('animal').isString(),
        body('website').optional().isURL(),
        body('description').optional().isString(),
        sanitizeBody('description').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical)
    ], SponsorController.create);

router.route("/deactivate/:id")
    .put(AuthController.checkAuth, RoleMiddleware.requireAdmin, [param("id").isMongoId()], SponsorController.deactivate);

router.route("/activate/:id")
    .put(AuthController.checkAuth, RoleMiddleware.requireAdmin, [param("id").isMongoId()], SponsorController.activate);

router.route('/:id')
    .get(AuthController.checkAuth, [param("id").isMongoId()], SponsorController.getOne)
    .put(AuthController.checkAuth, RoleMiddleware.requireAdmin, [param("id").isMongoId()], SponsorController.update)
    .delete(AuthController.checkAuth, RoleMiddleware.requireAdmin, [param("id").isMongoId()], SponsorController.delete);

module.exports = router;
