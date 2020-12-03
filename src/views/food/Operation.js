import React from 'react'
import { PageHeader ,Button,Steps,message} from 'antd';
import WriteFoodInfo from './WriteFoodInfo'
import FoodMenuInfo from './FoodMenuInfo'
import Agree from './Agree'
import Axios from 'axios';
const { Step } = Steps;

    

export default function Operation(props) {
    const [foodInfo,setfoodInfo] =React.useState({})
    const [current, setCurrent] = React.useState(0);
    React.useEffect(()=>{
        // console.log(foodInfo); 可以通过foodInfo直接进行访问步骤一所获得表单数据
    },[foodInfo,setfoodInfo])
    const steps = [
        {
          title: '添加菜品基本信息',
          content: <WriteFoodInfo setInfo={setfoodInfo} foodInfo={foodInfo}/>,
        },
        {
          title: '添加该菜品在菜单展示信息',
          content: <FoodMenuInfo foodInfo={foodInfo} setInfo={setfoodInfo} ></FoodMenuInfo>,
        },
        {
          title: '确认信息',
          content: <Agree foodInfo={foodInfo}></Agree>,
        },
      ];
    const next = () => {
      
      if(current===0){
        if(!(foodInfo.name&&foodInfo.type&&foodInfo.mkFoodInfo)){
          message.warning('请填写必要信息');
        }else{
          setCurrent(current + 1);
        }
      }
      else if(current===1){
        if(foodInfo.price){
          setCurrent(current + 1);
        }else{
          message.warning('请填写必要信息');
        }
      }
      
    };
  
    const prev = () => {
      setCurrent(current - 1);
    };
    return (
        <div>
            {/* 页头部分 */}
            <PageHeader
            className="site-page-header"
            onBack={() => {props.history.push('/food/list')}}
            title="添加菜品"
            />
            {/* 步骤条部份 */}
        <Steps current={current}>
            {steps.map(item => (
            <Step key={item.title} title={item.title} />
            ))}
        </Steps>
        {/* 内容 */}
        <div className="steps-content">{steps[current].content}</div>
        {/* 底部按钮 */}
        <div className="steps-action">
            {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
                Next
            </Button>
            )}
            {current === steps.length - 1 && (
            <Button type="primary" onClick={() => {
            //提交信息
            
            const proveInfo={...foodInfo}
            proveInfo.type=proveInfo.type[proveInfo.type.length-1]
            proveInfo.mkFoodInfo=proveInfo.mkFoodInfo.map(item=>{
              return {mkName:item.title,mkCount:item.count}})
            Axios.post('http://localhost:5000/foodList',proveInfo).then(res=>{
              message.success('添加菜品成功!');
              setTimeout(()=>{props.history.push(`/food/list`)},500)
            })
            }}>
                Done
            </Button>
            )}
            {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                Previous
            </Button>
            )}
        </div>
        </div>
    )
}

