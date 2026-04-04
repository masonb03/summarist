import React from 'react'
import pageStyle from "../../../styles/settings.module.css";
import skeleton from "../../../styles/skeleton.module.css";

const loading = () => {
  return (
    <div className={pageStyle.wrapper}>
      <div className={pageStyle.container}>
        <div className={pageStyle.row}>
          <div className={`${skeleton['skeleton__settings--title']} ${skeleton['skeleton__shimmer']}`}></div>

          <div className={pageStyle['setting__content']}>
            <div className={`${skeleton['skeleton__settings--subtitle']} ${skeleton['skeleton__shimmer']}`}></div>
            <div className={`${skeleton['skeleton__settings--text']} ${skeleton['skeleton__shimmer']}`}></div>
          </div>
          
          <div className={pageStyle['setting__content']}>
            <div className={`${skeleton['skeleton__settings--subtitle']} ${skeleton['skeleton__shimmer']}`}></div>
            <div className={`${skeleton['skeleton__settings--text']} ${skeleton['skeleton__shimmer']}`}></div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default loading