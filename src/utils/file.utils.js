const getFileExtension = (fileName) => {
    const parts = fileName.split('.');
    if (parts.length == 1)
        return null;
    const lastIndex = parts.length - 1;
    return parts[lastIndex];
}

module.exports = {
    getFileExtension
}