import React, { Component } from 'react'
import { Transfer,Table, InputNumber  } from 'antd';
import axios from 'axios'
import difference from 'lodash/difference';
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
    <Transfer {...restProps} showSelectAll={false}>
      {({
        direction,
        filteredItems,
        onItemSelectAll,
        onItemSelect,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled,
      }) => {
        const columns = direction === 'left' ? leftColumns : rightColumns;
  
        const rowSelection = {
          getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
          onSelectAll(selected, selectedRows) {
            const treeSelectedKeys = selectedRows
              .filter(item => !item.disabled)
              .map(({ key }) => key);
            const diffKeys = selected
              ? difference(treeSelectedKeys, listSelectedKeys)
              : difference(listSelectedKeys, treeSelectedKeys);
            onItemSelectAll(diffKeys, selected);
          },
          onSelect({ key }, selected) {
            onItemSelect(key, selected);
          },
          selectedRowKeys: listSelectedKeys,
        };
  
        return (
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredItems}
            size="small"
            style={{ pointerEvents: listDisabled ? 'none' : null }}
            pagination={{pageSize: 5}}
          />
        );
      }}
    </Transfer>
  );
  //该数组为原料数组
  const con=[]
  const leftTableColumns = [
    {
      dataIndex: 'title',
      title: '原料名称',
    },
    {
      title: '数量(千克)',
      render: tag => <InputNumber onChange={(data)=>{
          for(var i=0;i<con.length;i++){
            if(con[i].key===tag.key){
                con[i].count=data
                return
            }
          }
          con.push({...tag,count:data})
    }}></InputNumber>,
    },
  ];
  

  
//   con.filter(item=>item.key===tag.key).count
export default class Mkfood extends Component {
    
    state = {
        targetKeys:this.props.haveSelectedKeys,
        selectedKeys: [],
        disabled: false,
        mockData:[],
        showSearch: true,
    };
    rightTableColumns = [
      {
        dataIndex: 'title',
        title: '原料名称',
      },
      {
          title: '数量(千克)',
          render: tag => <span>{this.props.orgCom&&this.props.orgCom.filter(item=>item.key===tag.key)[0].count}</span>,
          //.filter(item=>item.key===tag.key)[0].count
      },
    ]
    componentDidMount(){
        axios.get('http://localhost:5000/MkFood').then(item=>{
            let data=item.data.map(item=>{
              return{
                key:item.id,
                title:item.title,
              }
            })
            this.setState({
                mockData:data
            })
        })
          
          
    }
    
    UNSAFE_componentWillReceiveProps(newprops){
      if(newprops.haveSelectedKeys.length){
      this.setState({
        targetKeys:newprops.haveSelectedKeys
      })
    }
    }
    // componentWillUnmount(){
    //   console.log(this.state.targetKeys);
    // }
    //左右切换时的回调函数
    onChange = (targetKeys, direction, moveKeys) => {
        this.setState({ targetKeys: targetKeys });
        this.props.mkFoodInfo(con)
        
        
        
        
      }

    render() {
        const { targetKeys,mockData,showSearch } = this.state;
        return (
            <div>
                <TableTransfer
                    dataSource={mockData}
                    targetKeys={targetKeys}
                    showSearch={showSearch}
                    onChange={this.onChange}
                    filterOption={(inputValue, item) =>
                        item.title.indexOf(inputValue) !== -1 
                    }
                    leftColumns={leftTableColumns}
                    rightColumns={this.rightTableColumns}
                    
                    />
            </div>
        )
    }
}
