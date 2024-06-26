import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "../TaskCard";
import styles from "./TaskBoard.module.css"
import {emitTaskDrag} from "../../socketConnection.ts";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}-${new Date().getTime()}`,
        content: `item ${k + offset}`
    }));

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    // TODO: BASIC WEB SOCKET IMPLEMENTATION, CHANGE/REMOVE LATER
    emitTaskDrag(droppableSource);
    return result;
};
const grid = 10;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    // background: isDragging ? "lightgreen" : "white",
    background: "white",

    // styles we need to apply on draggables
    ...draggableStyle
});
const getListStyle = isDraggingOver => ({
    // background: isDraggingOver ? "lightblue" : "#F0F2F5",
    background: "#F0F2F5",
    padding: grid,
    width: 350
});

function TaskBoard() {
    const [state, setState] = useState([getItems(10), getItems(5, 10), getItems(2, 15), getItems(0, 17), getItems(2, 17)]);

    function onDragEnd(result) {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (sInd === dInd) {
            const items = reorder(state[sInd], source.index, destination.index);
            const newState = [...state];
            newState[sInd] = items;
            setState(newState);
        } else {
            const result = move(state[sInd], state[dInd], source, destination);
            const newState = [...state];
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];

            setState(newState.filter(group => group.length));
        }
    }

    const getGroupName = (index: number) => {
        switch(index) {
            case 0:
                return "Backlog";
            case 1:
                return "In Progress";
            case 2:
                return "In Review";
            case 3:
                return "Ready forSchedule";
            case 4:
                return "Scheduled";
            case 5:
                return "Done";
            default:
                return "Group";
        }
    }

    return (
        <div style={{
            width: '100%',
            height: '100%',
            paddingTop: '80px',
        }}>
            {/* <button
                type="button"
                onClick={() => {
                    setState([...state, []]);
                }}
            >
                Add new group
            </button>
            <button
                type="button"
                onClick={() => {
                    setState([...state, getItems(1)]);
                }}
            >
                Add new item
            </button> */}
            <div style={{ display: "flex", height: "100%" }}>
                <DragDropContext onDragEnd={onDragEnd}>
                    {state.map((el, ind) => (
                        <Droppable key={ind} droppableId={`${ind}`}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                    {...provided.droppableProps}
                                    className={styles.column}
                                >
                                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "15px"}}>
                                        <h3 style={{marginTop: 0, marginBottom: 0, marginLeft: '15px'}}>{getGroupName(ind)}</h3>
                                        <Button 
                                            type="dashed" 
                                            onClick={() => console.log("aaa")} 
                                            icon={<PlusOutlined style={{opacity: '0.75'}}/>}
                                        ></Button>
                                    </div>
                                    <div className={styles.cardContainer}>
                                        {el.map((item, index) => (
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <TaskCard
                                                        provided={provided}
                                                        snapshot={snapshot}
                                                        getItemStyle={getItemStyle}
                                                        index={index}
                                                    />
                                                )}
                                            </Draggable>
                                        ))}
                                    </div>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </DragDropContext>
            </div>
        </div>
    );
}

export default TaskBoard
