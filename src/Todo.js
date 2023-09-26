import React from 'react';
import { InputBase, ListItemText, ListItem, Checkbox, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

class Todo extends React.Component {
    constructor(props) {
        super(props);
        // 매개변수의 item의 변수/값을 item에 대입 
        this.state = { item: props.item, readOnly: true };
        this.delete = props.delete;
    }

    deleteEventHandler = () => {
        console.log("delete");
        this.delete(this.state.item);

    }

    offReadOnlyMode = () => {
        console.log("Event!", this.state.readOnly);
        this.setState({ readOnly: false }, () => {
            console.log("ReadOnly?", this.state.readOnly)
        });
    }

    enterKeyEventHandler = (e) => {
        if (e.key === "Enter") {
            this.setState({ readOnly: true })
        }
    }

    editEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.title = e.target.value;
        this.setState({ item: thisItem });
    }

    checkboxEventHandler = (e) => {
        console.log("check box event call");
        const thisItem = this.state.item;
        thisItem.done = thisItem.done ? false : true;
        this.setState({ item: thisItem });
    }


    render() {
        const item = this.state.item;
        return (
            <ListItem>
                <Checkbox
                    checked={item.done}
                    onChange={this.checkboxEventHandler}
                />
                <ListItemText>
                    <InputBase
                        inputProps={{ "aria-label": "naked", readOnly: this.state.readOnly }}
                        type="text"
                        id={item.id}
                        name={item.id}
                        value={item.title}
                        multiline={true}
                        fullWidth={true}
                        onClick={this.offReadOnlyMode}
                        onChange={this.editEventHandler}
                        onKeyPress={this.enterKeyEventHandler}
                    />
                </ListItemText>

                <ListItemSecondaryAction>
                    <IconButton aria-label="Delete"
                        onClick={this.deleteEventHandler}>
                        <DeleteOutlined />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}
export default Todo;