import React, { Component } from 'react'
import Card from './Card'
import HomeTarget from './HomeTarget'
export default class Home extends Component {
    render() {
        return (
            <div>
                <div style={{float:"left",width:'70%'}}>
                    <HomeTarget></HomeTarget>
                </div>
                <div style={{float:"right",width:'30%'}}>
                    <Card></Card>
                </div>
            </div>
        )
    }
}
