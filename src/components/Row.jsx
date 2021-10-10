import React from "react";
import classNames from "classnames";

export default function Row({ divId }) {
  //   const [activeTag, setActiveTag] = React.useState(null)

  return (
    <div dir="rtl" id={divId}>
      <label>
        מ<input className="start"></input>
      </label>
      <label>
        ל<input classname="destination"></input>
      </label>
      <label>
        כמה פעמים בחודש בערך אני אעשה את הנסיעה<input></input>
      </label>
      <label>
        רב פס<input></input>
      </label>
      <label>
        רב קו
        <input></input>
      </label>
      <label>
        הלוך ושוב?<input type="checkbox"></input>
      </label>
    </div>
    // <div className="article-preview" key={article?.slug}>
    //   <div className="article-meta">
    //     <a>
    //       <img src={article?.author?.image} />
    //     </a>
    //     <div className="info">
    //       <a className="author">{article?.author?.username}</a>
    //       <span className="date">{article?.createdAt}</span>
    //     </div>
    //     <button
    //       //   onClick={() => favorite.mutate()}
    //       type="button"
    //       className={classNames('btn btn-sm', {
    //         'btn-outline-primary': !article?.favorited,
    //         'btn-primary': article?.favorited,
    //       })}
    //       disabled={false}
    //     >
    //       <i className="ion-heart" />
    //       &nbsp; {article?.favoritesCount}
    //     </button>
    //   </div>
    //   <a className="preview-link">
    //     <h1>{article?.title}</h1>
    //     <p>{article?.description}</p>
    //     <span>Read more...</span>
    //     <ul className="tag-list">
    //       {article?.tagList.map((tag) => {
    //         return (
    //           <li onClick={() => setActiveTag(tag)} className="tag-default tag-pill tag-outline">
    //             {tag}
    //           </li>
    //         )
    //       })}
    //     </ul>
    //   </a>
    // </div>
  );
}
