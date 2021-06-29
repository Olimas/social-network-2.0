import React from "react";
import s from './ProfileInfo.module.css';

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    state: this.props.status
  }

  activateEditMode = () => {
    this.setState({
      editMode: true
    })
  }
  deactivateEditMode = () => {
    this.setState({
      editMode: false
    })
    this.props.updateStatus(this.state.status);
  }
  onStatusChange = (e) => {
    this.setState({
      status: e.currentTarget.value
    })
  }

  render() {
    return (
      <div className={s.profileStatus}>

        {!this.state.editMode &&
        <div>
          <span onDoubleClick={this.activateEditMode}>{this.props.status || "status not added"}</span>
        </div>
        }

        {this.state.editMode &&
        <div>
          <input onChange={this.onStatusChange} value={this.props.status} autoFocus={true}
                 onBlur={this.deactivateEditMode}> </input>
        </div>
        }

      </div>
    )
  }
}

export default ProfileStatus;

