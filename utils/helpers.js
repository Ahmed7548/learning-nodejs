const fs=require("fs")

exports.writeToFile = (p,products) => {
    fs.writeFile(p, JSON.stringify(products), (err) => {
    })
}
exports.getDataFromFile=(p,cb,cbArg=[])=> {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb(cbArg)
        } else {
            cb(JSON.parse(fileContent))
        }
    });
}

