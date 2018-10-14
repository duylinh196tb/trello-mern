import React, { Component } from "react";
import styled from "styled-components";
import Task from "./Task";
import { Droppable, Draggable } from "react-beautiful-dnd";

const Input = styled.input`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 300px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  background-color: ${props => (props.isDraggingOver ? "lightgrey" : "white")};
  flex-grow: 1;
  min-height: 100px;
`;

export default class componentName extends Component {
  handKeyPress = e => {
    if (e.key === "Enter") {
      console.log("Enter");
    }
  };

  render() {
    return (
      <Draggable draggableId={this.props.column._id} index={this.props.index}>
        {provided => (
          <Container {...provided.draggableProps} innerRef={provided.innerRef}>
            <Title {...provided.dragHandleProps}>
              {this.props.column.title}
            </Title>
            <Droppable droppableId={this.props.column._id} type="task">
              {(provided, snapshot) => (
                <TaskList
                  innerRef={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {this.props.tasks.map((task, index) => (
                    <Task task={task} key={index} index={index} />
                  ))}
                  <TaskList style={{ padding: 0 }}>
                    <Input
                      placeholder="Thêm công việc"
                      onBlur={() => console.log("err")}
                      onKeyPress={this.handKeyPress}
                    />
                  </TaskList>
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    );
  }
}
