const router = require("express").Router();
const {
  login,
  refreshToken,
  register,
} = require("../controllers/auth.controller");
const { auth, isAdmin } = require("../middlewares/auth");
const { validate } = require('../validators');
const { rules: loginRules } = require('../validators/auth/login')
const { rules: registerRules } = require('../validators/auth/register')


/**
 * @swagger
 * /api/v1.0/auth/login:
 *  post:
 *   tags: [Auth]
 *   description: Login user
 *   produces: [application/json]
 *   parameters: [{name: "body", in: "body", example: {email: "test@gmail.com", password: "123456"}}]
 *   responses: { 200: {status:"Success",message: "Login successfully!"}, 400: {status:"Error",message: "Email and password are required!"} , 500: {status:"Error",message: "Internal server error"}}
 * /api/v1.0/auth/register:
 *  post:
 *   tags: [Auth]
 *   description: Register user
 *   produces: [application/json]
 *   parameters: [{name: "body", in: "body", example: {firstName:"John","lastName":"Doe",email: "test@gmail.com", password: "123456",gender:",male",dateOfBirth:"1009-09-09",nationalCode:"4276656542",phone:"09129876543"}}]
 *   responses: { 200: {status:"Success",message: "Register successfully!"}, 400: {status:"Error",message: "Email and password are required!"} , 500: {status:"Error",message: "Internal server error"}}
 * /api/v1.0/auth/refreshToken:
 *  get:
 *   tags: [Auth]
 *   description: Get Refresh Token
 *   produces: [application/json]
 *   responses: { 200: {status:"Success",token:"82eqkjshdajkshdjaksd6asdausjkdhasdm,ansdmasjhdgaiusgjhkasdjashjfdgjhasd"}, 400: {status:"Error",message: "Refresh token is required!"} , 500: {status:"Error",message: "Internal server error"}}
 *      
 *
 *     
 * 
 *
 *
 *
 */

router.post("/login",[loginRules() , validate], login);
router.post("/register", [registerRules() , validate], register);
router.get("/refreshToken", [auth], refreshToken);

module.exports = router;
