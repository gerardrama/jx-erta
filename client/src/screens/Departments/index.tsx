import React from 'react'
import styles from './Departments.module.css'
import { Avatar, Button, Card, Tooltip } from 'antd'
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import DepartmentModal from '../../components/DepartmentModal';
import { useGetDepartmentsQuery } from '../../redux/services/endpoints';

const Departments = () => {
    const [openDepartmentModal, setOpenDepartmentModal] = React.useState(false);
    const [updateRecord, setUpdateRecord] = React.useState<any | null>(null);

    const departments = useGetDepartmentsQuery();

  return (
    <div style={{paddingTop: '80px',}}>
        <DepartmentModal open={openDepartmentModal} setOpen={setOpenDepartmentModal} updateRecord={updateRecord} tableRefetch={departments.refetch} />
        <h1>Departments</h1>

        <div className={styles.cardsContainer}>
            {departments.data?.map((card:any, index: number) => (
                <Card 
                    key={index}
                    className={styles.card}
                    classNames={{
                        body: styles.cardBody,
                        title: styles.cardTitle
                    }}
                    title={card.name} 
                    bordered={false}
                    actions={[
                        <EditOutlined key="edit" onClick={() => {
                            setUpdateRecord(card);
                            setOpenDepartmentModal(true);
                        }} />,
                    ]}
                >   
                    <div className={styles.cardDescription}>
                        {card.description ?? 'No description'}
                    </div>

                    <div className={styles.cardFooter}>
                        <div>
                            <Avatar.Group maxCount={9} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                                {card.employees?.map((employee: any, index: number) => (
                                    <Tooltip title={employee.name} placement="top" key={index}>
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