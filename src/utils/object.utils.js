const removeNullAndUndefined = (object) => {
    for (const key in object) {
        if (object[key] == null)
            delete object[key];
    }
    return object;
}

const normalizeMongoId = (array) => {
    array.forEach(item => {
        item.id = item._id;
        delete item._id;
        delete item.__v;
    });
    return array;
}

module.exports = { removeNullAndUndefined, normalizeMongoId }
