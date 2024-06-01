import { Badge, Popover, Card } from 'antd'
import { BellOutlined } from '@ant-design/icons'
import styles from './Notifications.module.css'
import React from 'react'


const NotificationCard = () => {
  return (
    
    <Card
        title="Card title"
        onClick={() => console.log('clicked')}
        style={{ margin: '10px 0' }}
    >
        <p>description</p>
    </Card>
  )
}

const Notifications = () => {

    const [open, setOpen] = React.useState(false);

    const hide = () => {
        setOpen(false);
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    return (
    <Popover
        content={<NotificationCard />}
        title="Notifications"
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
        placement="bottomRight"
        className={styles.bell}
        overlayClassName={styles.popover}
    >
        <Badge count={5}>
            <BellOutlined style={{fontSize: '20px'}} />
        </Badge>
    </Popover>
    )
}

export default Notifications