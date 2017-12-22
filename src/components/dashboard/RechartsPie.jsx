/**
 * Created by hao.cheng on 2017/5/5.
 */
import React from 'react';

import {Tooltip,ResponsiveContainer,PieChart, Pie,Cell} from 'recharts';

class RechartsPie extends React.Component {
    render () {
        const COLORS = ['#FFAC47', '#748df6','#F35959','#FED852','#6ADFE9','#8ACF65'];
        const { data } = this.props;
        console.log(data);
        return (
            <ResponsiveContainer width="100%" height={300}>
                <PieChart width={400} height={300} style={{zIndex:999}}>
                    <Pie data={data} cx={120} cy={100} innerRadius={50} outerRadius={100}>
                    {
                        data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                    }
                    </Pie>
                    <Tooltip/>
                </PieChart>
            </ResponsiveContainer>

        );

    }
}

export default RechartsPie;

