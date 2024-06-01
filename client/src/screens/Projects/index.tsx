import React from 'react'
import styles from './Projects.module.css'
import { Badge, Button, Card } from 'antd'
import { EditOutlined, ProjectOutlined, PlusOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons';

const Projects = () => {
    const cards = [
        {
            title: 'Card title 1',
            description: 'Card description 1',
            status: {
                text: 'In Progress',
                color: 'blue'
            },
            client: 'John Doe',
            deadline: '2021-10-10'
        },
        {
            title: 'Card title 2 asdsadas dsad sa dsad sadsad',
            description: 'Card description 2',
            status: {
                text: 'Finished',
                color: 'green'
            },
            client: 'John Doe',
            deadline: '2021-10-10'
        },
        {
            title: 'Card title 3',
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            status: {
                text: 'Paused',
                color: 'grey'
            },
            client: 'John Doe',
            deadline: '2021-10-10'
        }
    ]

  return (
    <div>
        <h1>Projects</h1>

        <div className={styles.cardsContainer}>
            {cards.map((card, index) => (
                <Badge.Ribbon 
                    text={card.status.text}
                    color={card.status.color}
                >
                    <Card 
                        key={index}
                        className={styles.card}
                        classNames={{
                            body: styles.cardBody,
                            title: styles.cardTitle
                        }}
                        title={card.title} 
                        bordered={false}
                        actions={[
                            <EditOutlined key="edit" />,
                            <ProjectOutlined key="board" />,
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
                                {card.deadline}
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
            ></Button>
        </div>    
    </div>
  )
}

export default Projects