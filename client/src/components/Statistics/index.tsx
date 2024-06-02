import { Line } from '@ant-design/plots';
import { Statistic } from 'antd';
import StatisticCard from './StatisticCard';
import { config } from './data';

const Statistics = () => {
  return (
    <div style={{paddingTop: '80px',}}>
        <div style={{
            display: "flex",
            gap: "10px"
        }}>
            <div style={{    
                display: "flex", 
                flexDirection: "column",
                minWidth: "300px",
                gap: "10px"
            }}>
                <StatisticCard>
                    <Statistic title="Employees" value={52} valueStyle={{fontSize: "35px"}}/>
                </StatisticCard>
                <StatisticCard>
                    <Statistic title="Tasks finished today" value={3} valueStyle={{fontSize: "35px"}} />
                </StatisticCard>
                <StatisticCard>
                    <Statistic title="Tasks finished this week" value={15} valueStyle={{fontSize: "35px"}} />
                </StatisticCard>
                <StatisticCard>
                    <Statistic title="Unfinished tasks" value={108} valueStyle={{fontSize: "35px"}} />
                </StatisticCard>
            </div>
            <StatisticCard 
                title="Tasks finished this month"
                style={{flex: 1}}
            >
                <Line {...config} />
            </StatisticCard>
        </div>

    </div>
  )
}

export default Statistics