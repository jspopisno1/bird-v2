var {combineReducers} = require('redux')

var TYPES = {
    changeName: 'change-name'
}

var triggers = {
    // action creator (动作创建函数)
    changeName(name) {
        return {
            // 动作类型
            type: TYPES.changeName,

            // 动作所需的数据
            name
        }
    }
}

var reducer = combineReducers({
    name(state = 'liang', action) {
        console.log('@debug,', action)

        switch (action.type) {
            case TYPES.changeName:
                return action.name || ''
            default:
                return state
        }
    }
})

module.exports = {
    TYPES,
    triggers,
    reducer
}