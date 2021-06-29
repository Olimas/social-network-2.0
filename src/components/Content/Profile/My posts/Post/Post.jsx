import s from './Post.module.css';

const Post = (props) => {
  return (
    <div className={s.post}>
      <div className={s.postColumn}>
        <div className={s.postImg}>
          <img src="https://www.searchpng.com/wp-content/uploads/2019/02/Profile-PNG-Icon.png" alt="profile"/>
          <span>Likes: {props.likesCount}</span>
        </div>
        <div className={s.postLike}>
          <span> Like</span>
        </div>
      </div>
      <div className={s.postColumn}>
        <div className={s.postDescription}>
          <p className={s.postMessage}>{props.message}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
