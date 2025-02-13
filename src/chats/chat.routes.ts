import express from "express";
import { validate } from "@src/shared/middleware/validate";
import * as Validation from "./validations";
import * as Handler from "./chat.handler";
import { verifyJWT } from "@src/shared/middleware/verifyJWT";

const router = express.Router();

router.post("/conversation/start", verifyJWT, validate(Validation.startPrivateConversation), Handler.startPrivateConversation);
router.get("/conversation/list", verifyJWT ,Handler.getConversationsList);
router.get("/conversation/:conversation_id/messages", verifyJWT, Handler.getMessagesByConversation);

export default router;

