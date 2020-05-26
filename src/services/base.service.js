const RequestError = require('../errors/request.error')
const { removeNullAndUndefined } = require('../utils/object.utils')
const { Model } = require('mongoose')

class BaseService {

    constructor(model) {
        if (model.prototype instanceof Model) {
            this.model = model;
            this.modelName = model.modelName;
        } else {
            throw new Error(`${model.name} is not an instance of mongoose.Model`)
        }
    }

    async create(obj) {
        obj = removeNullAndUndefined(obj);
        const newData = new this.model(obj);
        return newData.save();
    }

    async find({ filter, skip, limit, sort } = {}) {
        return this.model.find(filter)
            .limit(limit).skip(skip).sort(sort);
    }

    async findById(id) {
        const obj = await this.model.findById(id);
        if (!obj) {
            throw new RequestError(404, `Couldn't find ${this.modelName} with id ${id}`);
        }

        return obj;
    }

    async update(id, fields) {
        const obj = await this.model.findById(id);
        if (!obj) {
            throw new RequestError(404, `Couldn't find ${this.modelName} with id ${id}`);
        }

        fields = removeNullAndUndefined(fields);
        
        return this.model.findByIdAndUpdate(
            id, fields, {
                new: true,
                useFindAndModify: false
            }
        );
    }

    async delete(id) {
        const obj = await this.model.findById(id);
        if (!obj) {
            throw new RequestError(404, `Couldn't find ${this.modelName} with id ${id}`);
        }

        return this.model.deleteOne({ _id: id });
    }
}

module.exports = BaseService;