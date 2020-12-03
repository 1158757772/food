const UserReducer=(preState={
    user:{}
},action={})=>{
    let {type,payLoad} = action
    let newState={...preState}
    switch(type){
        case "ChangeUser":
            newState.user=payLoad
            return newState
        case "ClearUser":
            newState.user={}
            return newState
        default :
            return preState
    }
}
export default UserReducer