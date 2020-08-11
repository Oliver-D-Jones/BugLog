import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class BugService {
    async getAll(req) {
        const { page = 1, limit = 5 } = req.query;
        let bugs = await dbContext.Bugs.find().limit(limit*1).skip((page-1)*limit).exec();
        const count = await dbContext.Bugs.countDocuments();

        return {bugs,totalPages:Math.ceil(count/limit),currentPage:page};
        
    }

    async getOne(id) {
        let data = await dbContext.Bugs.findOne({ _id: id })
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this object")
        }
        return data
    }
    async getNotes(id) {
        let data = await dbContext.Notes.find({ bug: id }).populate("bug")
        if (!data) {
            throw new BadRequest("Invalid ID or no notes for this bug")
        }
        return data
    }

    async create(rawData) {
        let data = await dbContext.Bugs.create(rawData)
        return data
    }
    async edit(id, update) {
        let data = await dbContext.Bugs.findOneAndUpdate({ _id: id }, update, { new: true })
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this object");
        }
        return data;
    }
    async delete(id,userEmail) {
        let data = await dbContext.Bugs.findOneAndRemove({ _id: id, creatorEmail: userEmail });
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this object");
        }
        return data;
    }
    async deleteAll(userEmail) {
        let data = await dbContext.Bugs.deleteMany({ creatorEmail: userEmail });
        if (!data) {
            throw new BadRequest("Invalid userEmail or you do not own this object");
        }
        return data;
    }
}

export const bugsService = new BugService()