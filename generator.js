const fs = require('fs')
const path = require('path')

const isBinary = require('isbinaryfile')

async function generate(dir, files, base = '', rootOptions = {}) {
    const glob = require('glob')

    glob.sync('**/*', {
        cwd: dir,
        nodir: true
    }).forEach(rawPath => {
        const sourcePath = path.resolve(dir, rawPath)
        const filename = path.join(base, rawPath)

        if (isBinary.sync(sourcePath)) {
            files[filename] = fs.readFileSync(sourcePath) // return buffer
        } else {
            let content = fs.readFileSync(sourcePath, 'utf-8')
            if (path.basename(filename) === 'manifest.json') {
                content = content.replace('{{name}}', rootOptions.projectName || '')
            }
            if (filename.charAt(0) === '_' && filename.charAt(1) !== '_') {
                files[`.${filename.slice(1)}`] = content
            } else if (filename.charAt(0) === '_' && filename.charAt(1) === '_') {
                files[`${filename.slice(1)}`] = content
            } else {
                files[filename] = content
            }
        }
    })
}

module.exports = (api, options, rootOptions) => {
    api.extendPackage(pkg => {
        return {
            dependencies: {
            },
            devDependencies: {
            }
        }
    })

    api.render(async function (files) {
        Object.keys(files).forEach(name => {
            delete files[name]
        })
        const template = options.repo || options.template

        const base = '/'
        await generate(path.resolve(__dirname, './template/default'), files, base, rootOptions)
    })
}
