module.exports = [{
    type: 'list',
    name: 'template',
    message: '请选择 管理端 模板',
    choices: [{
        name: '默认模板',
        value: 'default'
    }, {
        name: '算了，我不要模板',
        value: 'None'
    }
    ],
    default: 'None'
}
]