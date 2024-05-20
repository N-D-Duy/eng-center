const Schedule = require('../../../models/schedule.js');

const getScheduleInfor = async (req, res) => {
    try {
        const schedule = await Schedule.findById(req.params.id);
        return res.status(200).json({
            data: schedule
        });
    }
    catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
};

module.exports = getScheduleInfor;