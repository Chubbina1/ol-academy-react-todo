import React from "react";
import '../Styles/style.css'

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newtext: [
        { text: "Learn React", id: 1, isDone: false },
        { text: "Learn Node", id: 2, isDone: false },
      ],
      inputValue: "",
      editId: null,
      editValue: "",
    };
  }

  handleonTodo = () => {
    const {newtext, inputValue} = this.state;
    if (inputValue.trim() === "") {
      alert("Please enter a task");
      return;}
    const isDuplicate = newtext.some((task) => task.text.toLocaleLowerCase() === inputValue.toLowerCase());
    if (isDuplicate){
        alert("There is a task already used with this name:" + inputValue);
                return;
    }
    const useid = this.state.newtext.map((Project) => Project.id);

    let newId = 0;
    if (useid.length > 0) {
      newId = Math.max(...useid) + 1;
    }

    const newid = Math.max(...useid) + 1;

    this.setState({
      newtext: [
        ...this.state.newtext,
        { text: this.state.inputValue, id: newid, isDone: false },
      ],
      inputValue: "",
    });
  };

  handledelete = (id) => {
    const choosenid = this.state.newtext.filter(
      (Project) => Project.id !== id
    );
    this.setState({ newtext: choosenid });
  };

  handleComplete = (id) => {
    this.setState((prevState) => {
      const updatedTasks = prevState.newtext.map((task) => {
        if (task.id === id) {
          return { ...task, isDone: !task.isDone };
        }
        return task;
      });
      return { newtext: updatedTasks };
    });
  };

  handleEdit = (id) => {
    const taskToEdit = this.state.newtext.find(task => task.id === id);
    this.setState({ editId: id, editValue: taskToEdit.text });
  }

  handleEditChange = (event) => {
    this.setState({ editValue: event.target.value });
  }

  handleSaveEdit = () => {
    this.setState((prevState) => {
      const updatedTasks = prevState.newtext.map((task) => {
        if (task.id === prevState.editId) {
          return { ...task, text: prevState.editValue };
        }
        return task;
      });
      return { newtext: updatedTasks, editId: null, editValue: "" };
    });
  };

  handleCheckboxChange = (id) => {
    this.setState((prevState) => {
      const updatedTasks = prevState.newtext.map((task) => {
        if (task.id === id) {
          return { ...task, isDone: !task.isDone };
        }
        return task;
      });
      return { newtext: updatedTasks };
    });
  };

 

  handleMoveUp = (index) => {
    if (index > 0) {
      this.setState((prevState) => {
        const updatedTasks = [...prevState.newtext];
        const temp = updatedTasks[index];
        updatedTasks[index] = updatedTasks[index - 1];
        updatedTasks[index - 1] = temp;
        return { newtext: updatedTasks };
      });
    }
  };

  handleMoveDown = (index) => {
    if (index < this.state.newtext.length - 1) {
      this.setState((prevState) => {
        const updatedTasks = [...prevState.newtext];
        const temp = updatedTasks[index];
        updatedTasks[index] = updatedTasks[index + 1];
        updatedTasks[index + 1] = temp;
        return { newtext: updatedTasks };
      });
    }
  };

  handleDeleteAll = () => {
    this.setState({newtext: []});
  };

  handleDeleteCompleted = () => {
    const updatedTasks = this.state.newtext.filter((task) => !task.isDone);
    this.setState({ newtext: updatedTasks });
  };

  render() {
    return (
      <div className="div">
        <h1 className="title">Todo List</h1>
        {this.state.newtext?.length > 0 ? (
          <div className="div">
            <ul className="sia">
              {this.state.newtext.map((task, index) => (
                <li
                  key={task.id}
                  style={{ textDecoration: task.isDone ? "line-through" : "none", color: task.isDone ? "red" : "black" }}
                >
                    <input type="checkbox"
                    checked={task.isDone}
                    onChange={() => this.handleCheckboxChange(task.id)}
                    />
                  {this.state.editId === task.id ? (
                    <div className="div">
                      <input className="input"
                        type="text"
                        value={this.state.editValue}
                        onChange={this.handleEditChange}
                      />
                      <button className="buttonsave" onClick={this.handleSaveEdit}>Save</button>
                    </div>
                  ) : (
                    <div className="div">
                      {task.text}
                      <button className="box" onClick={() => this.handledelete(task.id)}>
                        Delete
                      </button>
                      <button className="backgr" onClick={() => this.handleComplete(task.id)}>
                        Mark as Complete
                      </button>
                      <button className="edit" onClick={() => this.handleEdit(task.id)}>
                        Edit
                      </button>
                      <button className="up"
                        onClick={() => this.handleMoveUp(index)}
                        disabled={index === 0}>Move Up</button>
                        <button className="down" onClick={() => this.handleMoveDown(index)}
                        disabled={index === this.state.newtext.length - 1}>MOve Down</button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>NO Items Found</p>
        )}

       

        
        <div>
          <input
            type="text"
            value={this.state.inputValue}
            onChange={(event) =>
              this.setState({ inputValue: event.target.value })
            }
          />
          <button className="newtext" onClick={this.handleonTodo}>Add New Text</button>
          <div><button className="deleteall" onClick={this.handleDeleteAll}>Delete All Tasks</button> </div>
          <button className="deletemark" onClick={this.handleDeleteCompleted}>Delete Completed Tasks</button>
        </div>
        
       
    
      </div>
    
    );
  }
}

export default Project;
