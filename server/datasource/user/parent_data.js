const Parent = require('../../../models/parent.js');

const getParentInfor = async (req, res) => {
    try {
        const parent = await Parent.findById(req.params.id);
        return res.status(200).json({
            data: parent
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
};

const getAllParents = async (req, res) => {
    try {
        const parents = await Parent.find();
        return res.status(200).json({
            data: parents
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
};

const createParent = async (req, res) => {
    try {
        const parent = await Parent.create(req.body);
        return res.status(201).json({
            data: parent
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
};

module.exports = {
    getParentInfor,
    getAllParents,
    createParent
};
