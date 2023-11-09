const router = require("express").Router();

const {
  create,
  get,
  getAll,
  update,
  delete: deleteRole,
} = require("../controllers/role.controller");
const { auth, isAdmin } = require("../middlewares/auth");
const { validate } = require('../validators');
const { rules: createRules } = require('../validators/role/create')
const { rules: updateRules } = require('../validators/role/update')



/**
 * @swagger
 * /api/v1.0/role/:
 *  post:
 *   tags: [Role]
 *   description: Create
 *   produces: [application/json]
 *   parameters: [{name: "body", in: "body", example: {title:"Admin"}}]
 *   responses: { 200: {status:"Success",message: "Data created successfully"}, 400: {status:"Error",message: "Title is required!"} , 500: {status:"Error",message: "Internal server error"}}
 * /api/v1.0/auth/:
 *  get:
 *   tags: [Role]
 *   description: Get All roles
 *   produces: [application/json]
 *   responses: { 200: {status:"Success",data:[{id:1,title:"Admin"}]}, 400: {status:"Error",message: "Bad request!"} , 500: {status:"Error",message: "Internal server error"}}
 *      
 *
 *     
 * 
 *
 *
 *
 */



router.post("/", [auth, isAdmin,createRules(),validate], create);
router.get("/", [auth, isAdmin], getAll);
router.get("/:id", [auth, isAdmin], get);
router.put("/:id", [auth, isAdmin,updateRules(),validate], update);
router.delete("/:id", [auth, isAdmin], deleteRole);


module.exports = router;