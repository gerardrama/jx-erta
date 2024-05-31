import React from 'react';
import styles from './TaskCard.module.css';

const TaskCard = ({provided, snapshot, item, ind, index, state, setState, getItemStyle}) => {
    return (
        <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style
            )}
            className={styles.card}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around"
                }}
            >
                {item.content}
                <button
                    type="button"
                    onClick={() => {
                        const newState = [...state];
                        newState[ind].splice(index, 1);
                        setState(
                            newState.filter(group => group.length)
                        );
                    }}
                >
                    delete
                </button>
            </div>
        </div>
    );
};

export default TaskCard;