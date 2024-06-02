import React from 'react';
import styles from './TaskCard.module.css';
import { Avatar, Badge, Button, Card, Divider, Input, Modal, Tooltip } from 'antd';
import {UserOutlined, AntDesignOutlined, EditOutlined, SaveOutlined} from '@ant-design/icons';
import Comments from '../Comments';

const TaskDetails = ({isSubTask}) => {

    const [isSubTaskOpen, setIsSubTaskOpen] = React.useState(false);
    const [isEditingTitle, setIsEditingTitle] = React.useState(false);
    const [isEditingDescription, setIsEditingDescription] = React.useState(false);

    const showSubTask = () => {
        setIsSubTaskOpen(true);
    };

    const handleSubTaskClose = () => {
        setIsSubTaskOpen(false);
    };

    const handleDescriptionButtonClick = () => {
        if(isEditingDescription) {
            setIsEditingDescription(false);
        } else {
            setIsEditingDescription(true);
        }
    }

    const handleTitleClick = () => {
        if(isEditingTitle) {
            setIsEditingTitle(false);
        } else {
            setIsEditingTitle(true);
        }
    }
    
    return (
        <div className={styles.bodyWrapper}>
            <Modal open={isSubTaskOpen} onCancel={handleSubTaskClose} footer='' width='50%'>
                <TaskDetails isSubTask={true}/>
            </Modal>
            <div className={styles.header}>
                {isEditingTitle ? <div>
                    <Input style={{width: '100%'}}></Input>
                    <Button type="dashed" onClick={() => setIsEditingTitle(false)} icon={<SaveOutlined style={{opacity: '0.75'}} />} style={{marginLeft: '20px', marginRight: '20px', width: '45px'}}></Button>
                    </div>
                    : 
                    <p onClick={() => setIsEditingTitle(true)}>Card title</p>
                }
                
            </div>
            <Divider style={{marginTop: '14px', marginBottom: 0}} />
            <div className={styles.bodyLayout}>
                <div className={styles.innerBody}>
                    <div className={styles.generalInfo}>
                        <div className={styles.asignees}>
                            <p>Asignees</p>
                            <div>
                                <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                                    <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
                                    <Avatar style={{ backgroundColor: '#f56a00' }}>F</Avatar>
                                    <Tooltip title="Ant User" placement="top">
                                        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                    </Tooltip>
                                    <Avatar style={{ backgroundColor: '#1677ff' }} icon={<AntDesignOutlined />} />
                                </Avatar.Group>
                            </div>
                        </div>
                        <div className={styles.status}>
                            <p>Status</p>
                            <div>
                                <p></p>
                                {/* <Badge status="processing" text="In Progress" /> */}
                            </div>
                        </div>
                        <div className={styles.priority}>
                            <p>Priority</p>
                            <div style={{backgroundColor: 'red'}}>
                                Critical
                                {/* <Badge status="processing" text="In Progress" /> */}
                            </div>
                        </div>
                        <div className={styles.departament}>
                            <p>Departament</p>
                            <div>

                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.description}>
                            <p>Description</p>
                            <Button type="dashed" onClick={handleDescriptionButtonClick} icon={isEditingDescription ?  <SaveOutlined style={{opacity: '0.75'}} /> : <EditOutlined style={{opacity: '0.75'}}/>}></Button>
                        </div>
                        {isEditingDescription ? <Input.TextArea style={{marginTop: '10px'}}></Input.TextArea> : <p style={{fontSize: '14px'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. In saepe numquam error fugiat earum blanditiis recusandae ea eius minima. Ad perspiciatis neque dignissimos labore explicabo molestias excepturi, repellendus assumenda tenetur.</p>}
                    </div>
                    {!isSubTask && <div>
                        <p>Sub-Tasks</p>
                        <Card size="small" title="Subtask 1" extra={<Button size='small' onClick={showSubTask}>More</Button>}>
                            <div className={styles.subtaskBody}>
                                <div>
                                    <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                                        <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
                                        <Avatar style={{ backgroundColor: '#f56a00' }}>F</Avatar>
                                        <Tooltip title="Ant User" placement="top">
                                            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                        </Tooltip>
                                        <Avatar style={{ backgroundColor: '#1677ff' }} icon={<AntDesignOutlined />} />
                                    </Avatar.Group>
                                </div>
                                <div>
                                    <p>In Progress</p>
                                </div>
                                <div className={styles.priority}>
                                    <div style={{backgroundColor: 'red'}}>
                                        Critical
                                    </div>
                                </div>
                                <div>
                                    <p>Design</p>
                                </div>
                            </div>
                        </Card>
                    </div>}
                </div>
                <div className={styles.actions}>
                    <p style={{fontSize: 'small'}}>Actions</p>
                    <div>
                        <Button size='small'>Edit Asignees</Button>
                        <Button size='small'>Edit Status</Button>
                        <Button size='small'>Edit Priority</Button>
                        <Button size='small'>Edit Department</Button>
                    </div>
                </div>
            </div>
            <Divider/>
            <div className={styles.comments}>
                <Comments/>
            </div>
        </div>
    );
}

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
            <Modal open={isModalOpen} onCancel={handleCancel} footer='' width='50%'>
                <TaskDetails isSubTask={false}/>
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