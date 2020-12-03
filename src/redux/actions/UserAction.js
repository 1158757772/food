import axios from 'axios'
import { message } from 'antd';
function ChangeUserAction(values,props){
    return (
        // console.log(dispatch,values);
        axios.get(`http://localhost:5000/user?username=${values.username}&password=${values.password}`).then(data=>{
                if(data.data.length){
                    return {
                            type: "ChangeUser",
                            payLoad: data.data
                        }
                }else{
                    message.info('用户名或者密码错误');
                }
            })
    )
    
}
// dispatch( {
//     type: "ChangeUser",
//     payLoad: data.data
// })

export {ChangeUserAction}