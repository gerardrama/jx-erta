import React from 'react'
import styles from './Departments.module.css'
import { Avatar, Badge, Button, Card, Tooltip } from 'antd'
import { EditOutlined, PlusOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons';
import DepartmentModal from '../../components/DepartmentModal';
import { departmentCards } from '../../shared/data';
import { DepartmentType } from '../../shared/models';

const Departments = () => {
    const [openDepartmentModal, setOpenDepartmentModal] = React.useState(false);
    const [updateRecord, setUpdateRecord] = React.useState<DepartmentType | null>(null);

  return (
    <div>
        <DepartmentModal open={openDepartmentModal} setOpen={setOpenDepartmentModal} updateRecord={updateRecord} 
            // tableRefetch={faq.refetch}
        />
        <h1>Departments</h1>

        <div className={styles.cardsContainer}>
            {departmentCards.map((card, index) => (
                <Card 
                    className={styles.card}
                    classNames={{
                        body: styles.cardBody,
                        title: styles.cardTitle
                    }}
                    title={card.title} 
                    bordered={false}
                    actions={[
                        <EditOutlined key="edit" onClick={() => {
                            setUpdateRecord(departmentCards[index]);
                            setOpenDepartmentModal(true);
                        }} />,
                    ]}
                >   
                    <div className={styles.cardDescription}>
                        {card.description}
                    </div>

                    <div className={styles.cardFooter}>
                        <div>
                            <Avatar.Group maxCount={9} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                                {card.employees.map((employee, index) => (
                                    <Tooltip title={employee.name} placement="top">
                                        <Avatar style={{ backgroundColor: '#f56a00' }}>{employee.name[0]}</Avatar>
                                    </Tooltip>
                                ))}
                            </Avatar.Group>
                        </div>
                    </div>
                </Card>
            ))}

            <Button 
                type="dashed"
                icon={<PlusOutlined />} 
                size="large"
                className={styles.addCardButton}
                onClick={() => {
                    setUpdateRecord(null);
                    setOpenDepartmentModal(true);
                }}
            ></Button>
        </div>    
    </div>
  )
}

export default Departments