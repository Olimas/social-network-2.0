import s from "./ProfileInfo.module.css";
import {createField, Input, Textarea} from "../../../common/formsControls/FormControls";
import {Form, reduxForm} from "redux-form";
import styles from "../../../common/formsControls/FormControls.module.css";
import React from "react";

const ProfileDataForm = ({handleSubmit, profile, error}) => {
  return <Form onSubmit={handleSubmit}>
    <div>
      <button>Save changes</button>
    </div>
    {error &&
    <div className={styles.formSummaryError}>
      {error}
    </div>
    }
    <div className={s.fullName}><h3>FullName:
      <span>{createField("full name", "fullName", [], Input)}</span>
    </h3></div>
    <h2>Profile description</h2>
    <div><h3>AboutMe:
      <span>{createField("about me", "aboutMe", [], Textarea)}</span>
    </h3></div>
    <div><b>LookingForAJob:
      <span>{createField("", "lookingForAJob", [], Input, {type: "checkbox"})}</span>
    </b></div>
    <div><b>My professional skills:
      <span>{createField("description", "lookingForAJobDescription", [], Textarea)}</span>
    </b></div>
    <div className={s.profileContacts}>
      <div><h3>Contacts:</h3>{Object.keys(profile.contacts).map(key => {
        return <div key={key}>
          <span>{key}: {createField(key, "contacts." + key, [], Input)}</span>
        </div>
      })}</div>
    </div>
    {/*<Contacts key={key} contactTitle={key} contactValue={profile.contacts[key] || "not added"}/>*/}
  </Form>
}

const ProfileDataFormReduxForm = reduxForm({
  form: 'editProfile'
})(ProfileDataForm)

export default ProfileDataFormReduxForm;
