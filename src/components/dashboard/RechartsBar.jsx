
import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,Label} from 'recharts';


const RechartsBar = (props) => (
    <ResponsiveContainer width="100%" height={300}>
        <BarChart width={600} height={300} data={props.data}
                  margin={{top: 20, right: 10, left: 0, bottom: 5}} barSize={60}>
            <XAxis dataKey="name">
                <Label value="门店" offset={0} position="insideBottomRight" />
            </XAxis>
            <YAxis label={{ value: '平均时长', position: 'insideTopLeft', textAnchor: 'right',offset:'-19' }} />
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Bar dataKey="小桌" fill="#ffac47" stackId="a"/>
            <Bar dataKey="中桌" fill="#f55c59" stackId="a"/>
            <Bar dataKey="大桌" fill="#5ad8d6" stackId="a"/>
        </BarChart>
    </ResponsiveContainer>
);

export default RechartsBar;