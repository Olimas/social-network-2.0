import React, {useEffect, useState} from "react";
import s from './ProfileInfo.module.css';

const ProfileStatusWithHooks = (props) => {

  //* Hook useState
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  //* Hook useEffect
  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  }

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  }

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  }

  return (
    <div className={s.profileStatus}>
      {!editMode && <div>
        <span onDoubleClick={activateEditMode}>{props.status || "status not added"}</span>
      </div>}
      {editMode && <div>
        <input value={status} onChange={onStatusChange} onBlur={deactivateEditMode} autoFocus={true}></input>
      </div>}
    </div>
  )

};

export default ProfileStatusWithHooks;

