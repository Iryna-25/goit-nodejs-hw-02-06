const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
    const { _id } = req.user;
    const result = await Contact.find({ owner: _id }, "name email phone favorite")
        .populate("owner", "email");
    res.json(result);
};

module.exports = getAll;