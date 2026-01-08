import express from "express";
//needs to be implemented
const ExpressRouter = express.Router();
ExpressRouter.get("/", (req, res) => {
    res.json({ info: "you are gei, good morning" });
});
export { ExpressRouter };
