import s from "./ProfileInfo.module.css";
import {createField, GetStringKeys, Input, Textarea} from "../../../common/formsControls/FormControls";
import {Form, InjectedFormProps, reduxForm} from "redux-form";
import styles from "../../../common/formsControls/FormControls.module.css";
import React from "react";
import {ProfileType} from "../../../../types/types";

type PropsType = {
  profile: ProfileType
};
type ProfileTypeKeys = GetStringKeys<ProfileType>;

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> =
  ({handleSubmit, profile, error}) => {
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
        <span>{createField<ProfileTypeKeys>("full name", "fullName", [], Input)}</span>
      </h3></div>
      <h2>Profile description</h2>
      <div><h3>AboutMe:
        <span>{createField<ProfileTypeKeys>("about me", "aboutMe", [], Textarea)}</span>
      </h3></div>
      <div><b>LookingForAJob:
        <span>{createField<ProfileTypeKeys>("", "lookingForAJob", [], Input, {type: "checkbox"})}</span>
      </b></div>
      <div><b>My professional skills:
        <span>{createField<ProfileTypeKeys>("description", "lookingForAJobDescription", [], Textarea)}</span>
      </b></div>
      <div className={s.profileContacts}>
        <div><h3>Contacts:</h3>{Object.keys(profile.contacts).map(key => {
          return <div key={key}>
            {/*TODO: create some solution for embedded objects*/}
            <span>{key}: {createField(key, "contacts." + key, [], Input)}</span>
          </div>
        })}</div>
      </div>
      {/*<Contacts key={key} contactTitle={key} contactValue={profile.contacts[key] || "not added"}/>*/}
    </Form>
  }

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({
  form: 'editProfile'
})(ProfileDataForm)

export default ProfileDataFormReduxForm;
