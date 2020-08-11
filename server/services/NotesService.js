import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class NoteService {

    async create(rawData) {
        let data = await dbContext.Notes.create(rawData)
        return data
    }
    async getAll() {
        let data = await dbContext.Notes.find()
        return data
    }

    async edit(id, update) {
        let data = await dbContext.Notes.findOneAndUpdate({ _id: id }, update, { new: true })
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this note");
        }
        return data;
    }
    async delete(id, userEmail) {
        let data = await dbContext.Notes.findOneAndRemove({ _id: id, creatorEmail: userEmail });
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this note");
        }
        return data;
    }
}

export const noteService = new NoteService()