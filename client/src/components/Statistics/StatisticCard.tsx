import { Card } from 'antd'
import styles from './Statistics.module.css'

const StatisticCard = ({children, title, style}: any) => {
  return (
    <Card 
        className={styles.card}
        classNames={{
            body: styles.cardBody,
            title: styles.cardTitle
        }}
        title={title}
        bordered={false}
        style={style}
    >   
        {children}
    </Card>
  )
}

export default StatisticCard