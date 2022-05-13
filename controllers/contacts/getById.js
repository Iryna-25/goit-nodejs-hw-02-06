const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers");

const getById = async (req, res) => {
    const { _id: owner } = req.user;
    const { contactId } = req.params;

    const result = await Contact.findOne({_id: contactId, owner});
    if (!result) {
        throw createError(404, "Not found")
    }
    res.json(result);
    console.log(req.params);

};

module.exports = getById;