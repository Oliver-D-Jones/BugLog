import express from "express";
import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0provider";
import { noteService } from "../services/NotesService";

export class NotesController extends BaseController {
    constructor() {
        super("api/note");
        this.router
        .use(auth0Provider.getAuthorizedUserInfo)
        .get("",this.getAll)
        .post("", this.create)
        .delete("/:id",this.delete)
    }
    async getAll(req, res, next) {
        try {
            let notes = await noteService.getAll();
            res.send(notes);
        } catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            req.body.creatorEmail = req.userInfo.email;
            let note = await noteService.create(req.body);
            res.send(note);
        } catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            let note = await noteService.delete(req.params.id, req.userInfo.email);
            res.send(req.body);
        } catch (error) {
            next(error);
        }
    }
}