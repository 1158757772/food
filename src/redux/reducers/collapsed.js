const Collapsed=(preState={
    collapsed:false
},action={})=>{
    let {type} = action
    let newState={...preState}
    switch(type){
        case "ChangeCollapsed":
            newState.collapsed=!newState.collapsed
            return newState
        default :
            return preState
    }
}
export default Collapsed