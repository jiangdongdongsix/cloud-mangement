/**
 * Created by hao.cheng on 2017/4/17.
 */
import React,{Component} from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';


class EchartsQueueTime extends React.Component{
    render(){
        return(
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={this.props.data}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="小桌" stroke="#8884d8" activeDot={{r: 8}} />
                    <Line type="monotone" dataKey="中桌" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="大桌" stroke="#5f5f5f" />
                </LineChart>
            </ResponsiveContainer>
        )
    }
}



export default EchartsQueueTime;