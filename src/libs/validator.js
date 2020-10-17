let checkValueIfEmpty = (args) => {
    // console.log('checkValueIfEmpty is getting run');
    // console.log(args);
    return [...args].every((el) => el !== null && el !== undefined && el !== "");
}

module.exports = {
    checkValueIfEmpty: checkValueIfEmpty
}