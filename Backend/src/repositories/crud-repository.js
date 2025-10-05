const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data, transaction = null) {
        return await this.model.create(data, { transaction });
    }

    async destroy(id, transaction = null) {
        const response = await this.model.destroy({
            where: { id },
            transaction
        });

        if (!response) {
            throw new AppError("Not able to Delete resource", StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async get(id, transaction = null) {
        const response = await this.model.findByPk(id, { transaction });
        if (!response) {
            throw new AppError("Not able to find resource", StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async getAll(transaction = null) {
        return await this.model.findAll({ transaction });
    }

    async update(id, data, transaction = null) {
        const [updatedRowCount] = await this.model.update(data, {
            where: { id },
            transaction
        });

        if (updatedRowCount === 0) {
            throw new AppError("Resource not found for update", StatusCodes.NOT_FOUND);
        }

        return await this.model.findByPk(id, { transaction });
    }
}

module.exports = CrudRepository;

