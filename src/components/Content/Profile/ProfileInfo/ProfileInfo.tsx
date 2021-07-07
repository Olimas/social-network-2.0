import s from './ProfileInfo.module.css';
import Preloader from "../../../common/preloader/Preloader";
import userPhoto from '../../../../assets/images/user.png'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import React, {ChangeEvent, useState} from "react";
import ProfileDataForm from "./ProfileDataForm";
import {ContactsType, ProfileType} from "../../../../types/types";

type PropsType = {
  profile: ProfileType | null
  status: string
  updateStatus: (status: string) => void
  isOwner: boolean
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

  let [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader/>
  }
  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files?.length) {
      savePhoto(e.target.files[0]);
    }
  }

  const onSubmit = (formData: ProfileType) => {
    //TODO: remove then
    saveProfile(formData).then(() => {
      setEditMode(false);
    });
  }

  return (
    <div className={s.profile}>
      <div className={s.profileContainer}>
        <div className={s.profileLogo}>
          <img src={profile.photos.large || userPhoto} alt="user not added image"/>
          <div>{isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}</div>
        </div>
        <div className={s.profileDescription}>
          <b>Status: <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/></b>
          {editMode
            ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
            : <ProfileData goToEditMode={() => {
              setEditMode(true)
            }} profile={profile} isOwner={isOwner}
            />}

        </div>
      </div>
    </div>
  );
};

type ProfileDataPropsType = {
  profile: ProfileType
  isOwner: boolean
  goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
  return <div>
    {isOwner && <div>
      <button onClick={goToEditMode}>Edit profile</button>
    </div>}
    <div className={s.fullName}><h3>FullName: <span>{profile.fullName || "not added"}</span></h3></div>
    <h2>Profile description</h2>
    <div><h3>AboutMe: <span>{profile.aboutMe || "not added"}</span></h3></div>
    <div><b>LookingForAJob: <span>{profile.lookingForAJob ? "yes" : "no"}</span></b></div>
    {profile.lookingForAJob &&
    <div><b>My professional skills: <span>{profile.lookingForAJobDescription || "not added"}</span></b></div>
    }
    <div className={s.profileContacts}>
      <div><h3>Contacts:</h3>
        {Object
          .keys(profile.contacts)
          .map(key => {
            return <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key as keyof  ContactsType] || "not added"}/>
          })}
      </div>
    </div>
  </div>
}

type ContactsPropsType = {
  contactTitle: string
  contactValue: string
}

const Contacts: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
  return <div className={s.contacts}><b>{contactTitle}: </b>{contactValue}</div>
}

export default ProfileInfo;
