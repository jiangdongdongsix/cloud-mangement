/**
 * Created by hao.cheng on 2017/4/17.
 */
import React,{Component} from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,Label} from 'recharts';


class EchartsQueueTime extends React.Component{
    render(){
        return(
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    data={this.props.data}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}
                >
                    <XAxis dataKey="name">
                        <Label value={this.props.flag === '0' ? '日期' :'排队时间'} offset={-10} position="insideBottomRight" />
                    </XAxis>
                    <YAxis label={{ value: this.props.flag === '0' ? '等待时间' :'流失人数', position: 'insideTopLeft', textAnchor: 'right',offset:'-3' }} />
                    <CartesianGrid strokeDasharray="3 3"  vertical={true}/>
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" legendType="square"  dataKey="小桌" stroke="#f55b59" activeDot={{r: 8}} />
                    <Line type="monotone" legendType="square" dataKey="中桌" stroke="#47dad8"  unit="89" activeDot={{r: 8}} />
                    <Line type="monotone" legendType="square" dataKey="大桌" stroke="#29cd84" activeDot={{r: 8}} />
                </LineChart>
            </ResponsiveContainer>
        )
    }
}



export default EchartsQueueTime;