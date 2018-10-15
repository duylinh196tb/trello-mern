import React from "react";
import "@atlaskit/css-reset";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Column from "./Column";
import update from "immutability-helper";
import { connect } from "react-redux";
import { actCreateColumn } from "../../redux/actions/boards";
const Container = styled.div`
  display: flex;
`;

const Form = styled.form`
  height: auto;
  margin: 8px;
  width: auto;
  input {
    border: 1px solid lightgrey;
    height: 40px;
    padding-left: 5px;
  }
  .btnGroup {
    display: flex;
    margin-top: 8px;
    justify-content: flex-end;
  }
`;

class Board extends React.Component {
  // state = initialData;
  state = {
    tasks: [],
    columns: [],
    columnOrder: [],
    titleColumn: ""
  };

  componentDidMount() {
    this.setState({ ...this.props.board });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.board !== nextProps.board) {
      this.setState({ ...nextProps.board });
    }
  }

  addColumn = () => {
    if (this.state.titleColumn)
      this.props.actCreateColumn({
        title: this.state.titleColumn,
        board: this.state._id
      });

    this.setState({ titleColumn: "" });
  };

  handleBlur = e => {
    this.addColumn();
  };

  handleSubmit = e => {
    e.preventDefault();
    this.addColumn();
  };

  onDragEnd = result => {
    // console.log(result);
    const { columns } = this.state;
    const { destination, source, draggableId, type } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const start = source.droppableId;
    const finish = destination.droppableId;

    // console.log(start, finish);
    if (type === "column") {
      return this.setState(
        update(this.state, {
          columnOrder: {
            $splice: [[source.index, 1], [destination.index, 0, draggableId]]
          }
        })
      );
    }

    // If start === finish
    if (start === finish) {
      const columnIndex = columns.findIndex(
        e => e._id === destination.droppableId
      );
      const column = columns[columnIndex];

      const newColumn = update(column, {
        taskOrder: {
          $splice: [[source.index, 1], [destination.index, 0, draggableId]]
        }
      });

      return this.setState(
        update(this.state, {
          columns: {
            $splice: [[columnIndex, 1, newColumn]]
          }
        })
      );
    }

    //
    const startColumnIndex = columns.findIndex(
      e => e._id === source.droppableId
    );
    const finishColumnIndex = columns.findIndex(
      e => e._id === destination.droppableId
    );

    const columnStart = columns[startColumnIndex];
    const columnFinish = columns[finishColumnIndex];

    const newColumnStart = update(columnStart, {
      taskOrder: {
        $splice: [[source.index, 1]]
      }
    });
    const newColumnFinish = update(columnFinish, {
      taskOrder: {
        $splice: [[destination.index, 0, draggableId]]
      }
    });

    return this.setState(
      update(this.state, {
        columns: {
          $splice: [
            [startColumnIndex, 1, newColumnStart],
            [finishColumnIndex, 1, newColumnFinish]
          ]
        }
      })
    );
  };
  render() {
    let { columnOrder, columns, tasks } = this.state;

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {provided => (
            <Container
              {...provided.droppableProps}
              innerRef={provided.innerRef}
            >
              {columnOrder.map((columnId, index) => {
                const column =
                  columns[columns.findIndex(e => e._id === columnId)];
                const taskList = column.taskOrder.map(
                  taskId => tasks[tasks.findIndex(e => e._id === taskId)]
                );

                return (
                  <Column
                    key={index}
                    column={column}
                    tasks={taskList}
                    index={index}
                  />
                );
              })}
              <Form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  onBlur={this.handleBlur}
                  placeholder="Nhập tên cột"
                  value={this.state.titleColumn}
                  onChange={e => this.setState({ titleColumn: e.target.value })}
                />
                {/* <div className="btnGroup" /> */}
              </Form>
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default connect(
  null,
  { actCreateColumn }
)(Board);
