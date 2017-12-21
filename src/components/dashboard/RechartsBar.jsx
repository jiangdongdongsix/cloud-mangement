
import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';


const RechartsBar = (props) => (
    <ResponsiveContainer width="100%" height={300}>
        <BarChart width={600} height={300} data={props.data}
                  margin={{top: 20, right: 30, left: 20, bottom: 5}} barSize={60}>
            <XAxis dataKey="name"/>
            <YAxis/>
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