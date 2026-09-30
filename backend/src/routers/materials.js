import {Router} from "express";
import {lista, deleta} from "../controllers/materials.js";
import {authenticate, requireRole} from "../middlewares/auth,js";

const routerMaterials = Router();

//autenticação: todas as rotas abaixo exigem token
routerMaterials.use(authenticate);

//admin e usuário podem visualizar
routerMaterials.get("/listar", lista);

//somente admin pode deletar (somente perfil autorizado)
routerMaterials.delete("/:id", requireRole("admin"), deleta);

export default routerMaterials;
