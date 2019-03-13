export default {
    state: {
        collapsed: false,
        pwdVisible: false
    },
    effects: {

    },
    reducers:{
        //菜单伸缩
        menuToggle(state){
            const { collapsed } = state
            state.collapsed = !collapsed
            return state
        },
        //修改密码显示隐藏
        pwdWinToggle(state){
            const { pwdVisible } = state
            state.pwdVisible = !pwdVisible
            return state
        }
    }
}
