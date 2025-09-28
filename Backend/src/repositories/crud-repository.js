const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");


class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const response = await this.model.create(data);
        return response;
    }

    async destroy(data) {
        const response = await this.model.destroy({
            where: {
                id: data
            }
        });
        if(!response){
            throw new AppError("Not able to Delete resourse", StatusCodes.NOT_FOUND);
        }
        return response;
    }
    
    async get(data) {
        const response = await this.model.findByPk(data);
        if(!response){
            throw new AppError("not able to find resourse", StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async getAll() {
        const response = await this.model.findAll();
        return response;
    }

    async update(id, data) {
        const [updatedRowCount] = await this.model.update(data, {
            where: {
                id: id
            }
        });
    
        if (updatedRowCount === 0) {
            throw new AppError("Resource not found for update", StatusCodes.NOT_FOUND);
        }

        const response = await this.model.findByPk(id);
        return response;
    }
}

module.exports = CrudRepository;