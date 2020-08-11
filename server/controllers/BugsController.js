import express from "express";
import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0provider";
import { bugsService } from "../services/BugsService";

export class BugsController extends BaseController {
    constructor() {
        super("api/bug");
        this.router
            .use(auth0Provider.getAuthorizedUserInfo)
            .get("", this.getAll)
            .post("", this.create)
            .get("/:id", this.getOne)
            .get("/:id/note", this.getNotes)
            .put("/:id", this.edit)
            .delete("", this.deleteAll)
            .delete("/:id", this.delete)
    }
    // async getAll(req, res, next) {
    //     try {

    //         let bugs = await bugsService.getAll();
    //         res.send(bugs);
    //     } catch (error) {
    //         next(error);
    //     }
    // }
    async getAll(req, res, next) {
        try {

            let bugs = await bugsService.getAll(req)
            res.send(bugs);
        } catch (error) {
            next(error);
        }
    }

    async getOne(req, res, next) {
        try {
            let bug = await bugsService.getOne(req.params.id);
            res.send(bug);
        } catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            req.body.creatorEmail = req.userInfo.email;
            req.body.closed = false;
            let bug = await bugsService.create(req.body);
            res.send(bug);
        } catch (error) {
            next(error);
        }
    }
    async edit(req, res, next) {
        try {
            let bug = await bugsService.edit(req.body.id, req.body);
            res.send(req.body);
        } catch (error) {
            next(error);
        }
    }
    async getNotes(req, res, next) {
        try {
            let notes = await bugsService.getNotes(req.params.id);
            res.send(notes);
        } catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            let bug = await bugsService.delete(req.params.id, req.userInfo.email);
            res.send(req.body);
        } catch (error) {
            next(error);
        }
    }
    async deleteAll(req, res, next) {
        try {
            await bugsService.deleteAll(req.userInfo.email);
            res.send(req.body);
        } catch (error) {
            next(error);
        }
    }
    appendToBody(body) {
        body.closed = false;
        body.closedDate = null;
        return body;
    }
}