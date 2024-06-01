import React from 'react';
import styles from './TaskCard.module.css';
import { Avatar, Badge, Card, Modal, Tooltip } from 'antd';
import {UserOutlined, AntDesignOutlined} from '@ant-design/icons';

const TaskCard = ({provided, snapshot, getItemStyle}) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel} footer=''>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
                
                <Card 
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )}
                    className={styles.card}
                    title="Card title"
                    onClick={showModal}
                    >
                    <Badge.Ribbon rootClassName={styles.ribbon} text="Critical" color="red"></Badge.Ribbon>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                    <div className={styles.avatars}>
                        <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
                            <Avatar style={{ backgroundColor: '#f56a00' }}>F</Avatar>
                            <Tooltip title="Ant User" placement="top">
                                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                            </Tooltip>
                            <Avatar style={{ backgroundColor: '#1677ff' }} icon={<AntDesignOutlined />} />
                        </Avatar.Group>
                    </div>
                </Card>
        </>
    );
};

export default TaskCard;