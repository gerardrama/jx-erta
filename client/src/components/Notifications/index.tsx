import { Badge, Popover, Card } from 'antd'
import { BellOutlined } from '@ant-design/icons'
import styles from './Notifications.module.css'
import React from 'react'


const NotificationCard = () => {
    const data = [
        {
            title: 'Coca-Cola Campaign',
            description: 'Han added you to this card',
        },
        {
            title: 'Pepsi logo',
            description: 'Era left a comment',
        },
        {
            title: 'Pepsi social media',
            description: 'Era removed you from this card',
        }
    ]
  return (
    <div>
        {data.map((item, index) => (
            <Card
                title={item.title}
                size='small'
                onClick={() => console.log('clicked')}
                style={{ margin: '10px 0' }}
                key={index}
            >
                <p style={{margin: 0}}>{item.description}</p>
            </Card>
        ))}
    </div>
  )
}

const Notifications = () => {

    const [open, setOpen] = React.useState(false);

    // const hide = () => {
    //     setOpen(false);
    // };

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