/**
 * Created by Danijel Vincijanović on 21/10/2017.
 * Contact: danijel.vincijanovic@gmail.com
 */

const fs = require('fs')

class FileManager {
    writeToFile (filePath, content) {
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, content, (error) => {
                if (error) reject(error)
                else resolve(content)
            })
        })
    }

    readFile (filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, (error, content) => {
                if (error) reject(error)
                else resolve(content)
            })
        })
    }

    isCreated (filePath) {
        return fs.existsSync(filePath)
    }

    createFile (filePath) {
        fs.openSync(filePath, 'w');
    }
}

module.exports = new FileManager()