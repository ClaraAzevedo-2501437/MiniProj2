const AuthMessages = require("../messages/auth.messages");

/**
 * Middleware to check if authenticated user has admin role
 * Must be used after AuthController.checkAuth
 */
exports.requireAdmin = (req, res, callback) => {
    if (!req.user) {
        return res.status(AuthMessages.error.e1.http).send(AuthMessages.error.e1);
    }
    
    if (req.user.type !== 'admin') {
        return res.status(403).send({
            http: 403,
            code: "FORBIDDEN",
            type: "error",
            message: "Acesso negado. Apenas administradores podem executar esta ação."
        });
    }
    
    return callback();
};

/**
 * Middleware to check if user is authenticated (any role)
 * Alias for AuthController.checkAuth for consistency
 */
exports.requireUser = (req, res, callback) => {
    if (!req.user) {
        return res.status(AuthMessages.error.e1.http).send(AuthMessages.error.e1);
    }
    return callback();
};
