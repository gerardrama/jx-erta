import React from 'react'
import styles from './Projects.module.css'
import { Badge, Button, Card } from 'antd'
import { EditOutlined, ProjectOutlined, PlusOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons';
import ProjectModal from '../../components/ProjectModal';
import { projectCards } from '../../shared/data';
import { ProjectType } from '../../shared/models';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
    const navigate = useNavigate();

    const [openProjectModal, setOpenProjectModal] = React.useState(false);
    const [updateRecord, setUpdateRecord] = React.useState<ProjectType | null>(null);

    const handleBoardNavigation = (index: number) => {
        navigate(`/dashboard/boards/${index}`);
    }

  return (
    <div style={{paddingTop: '80px',}}>
        <ProjectModal open={openProjectModal} setOpen={setOpenProjectModal} updateRecord={updateRecord} 
            // tableRefetch={faq.refetch}
        />
        {/* <h1>Projects</h1> */}

        <div className={styles.cardsContainer}>
            {projectCards.map((card, index) => (
                <Badge.Ribbon 
                    key={index}
                    text={card.status.name}
                    color={card.status.color}
                >
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
                                setUpdateRecord(projectCards[index]);
                                setOpenProjectModal(true);
                            }} />,
                            <ProjectOutlined onClick={() => handleBoardNavigation(index)} key="board" />,
                        ]}
                    >   
                        <div className={styles.cardDescription}>
                            {card.description}
                        </div>

                        <div className={styles.cardFooter}>
                            <div>
                                <UserOutlined />
                                {card.client}
                            </div>
                            <div>
                                <CalendarOutlined />
                                {new Date(card.deadline).toLocaleDateString()}
                            </div>
                        </div>
                    </Card>
                </Badge.Ribbon>
            ))}

            <Button 
                type="dashed"
                icon={<PlusOutlined />} 
                size="large"
                className={styles.addCardButton}
                onClick={() => {
                    setUpdateRecord(null);
                    setOpenProjectModal(true);
                }}
            ></Button>
        </div>    
    </div>
  )
}

export default Projects