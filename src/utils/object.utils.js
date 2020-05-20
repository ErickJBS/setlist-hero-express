const removeNullAndUndefined = (object) => {
    for (const key in object) {
        if (object[key] == null)
            delete object[key];
    }
    return object;
}

module.exports = { removeNullAndUndefined }
