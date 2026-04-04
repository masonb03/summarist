// components/skeletons/BookSkeleton.tsx
import skeletonStyles from '@/styles/skeleton.module.css'
import pageStyles from '@/styles/book.module.css'

const BookSkeleton = () => {
  return (
    <div className={pageStyles.row}>
      <div className={pageStyles.container}>
        <div className={pageStyles.wrapper}>

          {/* left side */}
          <div className={pageStyles.book}>

            {/* title, author, subtitle */}
            <div className={`${skeletonStyles['skeleton__book--title']} ${skeletonStyles['skeleton__shimmer']}`}></div>
            <div className={`${skeletonStyles['skeleton__book--author']} ${skeletonStyles['skeleton__shimmer']}`}></div>
            <div className={`${skeletonStyles['skeleton__book--subtitle']} ${skeletonStyles['skeleton__shimmer']}`}></div>

            {/* description icons row */}
            <div className={pageStyles.book__wrapper}>
              <div className={pageStyles["book__description--wrapper"]}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className={`${skeletonStyles['skeleton__book--icon']} ${skeletonStyles['skeleton__shimmer']}`}></div>
                ))}
              </div>
            </div>

            {/* buttons */}
            <div className={pageStyles["book__read--btn-wrapper"]}>
              <div className={`${skeletonStyles['skeleton__book--btn']} ${skeletonStyles['skeleton__shimmer']}`}></div>
              <div className={`${skeletonStyles['skeleton__book--btn']} ${skeletonStyles['skeleton__shimmer']}`}></div>
            </div>

            {/* bookmark */}
            <div className={`${skeletonStyles['skeleton__book--bookmark']} ${skeletonStyles['skeleton__shimmer']}`}></div>

            {/* what's it about */}
            <div className={`${skeletonStyles['skeleton__book--second-title']} ${skeletonStyles['skeleton__shimmer']}`}></div>

            {/* tags */}
            <div className={skeletonStyles['skeleton__tags--wrapper']}>
              <div className={`${skeletonStyles['skeleton__tag']} ${skeletonStyles['skeleton__shimmer']}`}></div>
              <div className={`${skeletonStyles['skeleton__tag']} ${skeletonStyles['skeleton__shimmer']}`}></div>
            </div>

            {/* summary paragraphs */}
            <div className={skeletonStyles['skeleton__description--wrapper']}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className={`${skeletonStyles['skeleton__description--line']} ${skeletonStyles['skeleton__shimmer']}`}></div>
              ))}
            </div>

            {/* about the author */}
            <div className={`${skeletonStyles['skeleton__book--second-title']} ${skeletonStyles['skeleton__shimmer']}`}></div>
            <div className={skeletonStyles['skeleton__description--wrapper']}>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className={`${skeletonStyles['skeleton__description--line']} ${skeletonStyles['skeleton__shimmer']}`}></div>
              ))}
            </div>

          </div>

          {/* right side - book image */}
          <div className={pageStyles["book__img--wrapper"]}>
            <div className={`${skeletonStyles['skeleton__book--image']} ${skeletonStyles['skeleton__shimmer']}`}></div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default BookSkeleton;