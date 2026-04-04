import skeletonStyles from '@/styles/skeleton.module.css'
import pageStyles from '@/styles/Foryou.module.css'

const SelectedBookSkeleton = () => (
  <div className={skeletonStyles.selected__skeleton}>
    <div className={skeletonStyles["selected__skeleton--left"]}>
      <div className={`${skeletonStyles.skeleton__subtitle} ${skeletonStyles.skeleton__shimmer}`}></div>
      <div className={`${skeletonStyles.skeleton__subtitle} ${skeletonStyles.skeleton__shimmer}`}></div>
      <div className={`${skeletonStyles.skeleton__subtitle} ${skeletonStyles.skeleton__shimmer}`}></div>
    </div>
    <div className={skeletonStyles["selected__skeleton--line"]}></div>
    <div className={skeletonStyles["selected__skeleton--right"]}>
      <div className={`${skeletonStyles.skeleton__img__selected} ${skeletonStyles.skeleton__shimmer}`}></div>
      <div className={skeletonStyles["selected__skeleton--text"]}>
        <div className={`${skeletonStyles.skeleton__title} ${skeletonStyles.skeleton__shimmer}`}></div>
        <div className={`${skeletonStyles.skeleton__author} ${skeletonStyles.skeleton__shimmer}`}></div>
        <div className={`${skeletonStyles.skeleton__duration} ${skeletonStyles.skeleton__shimmer}`}></div>
      </div>
    </div>
  </div>
)

const BookCardSkeleton = () => (
  <div className={skeletonStyles.skeleton__card}>
    <div className={`${skeletonStyles.skeleton__img} ${skeletonStyles.skeleton__shimmer}`}></div>
    <div className={`${skeletonStyles.skeleton__title} ${skeletonStyles.skeleton__shimmer}`}></div>
    <div className={`${skeletonStyles.skeleton__author} ${skeletonStyles.skeleton__shimmer}`}></div>
    <div className={`${skeletonStyles.skeleton__subtitle} ${skeletonStyles.skeleton__shimmer}`}></div>
    <div className={`${skeletonStyles.skeleton__details} ${skeletonStyles.skeleton__shimmer}`}></div>
  </div>
)

const ForYouSkeleton = () => {
  return (
    <div className={pageStyles.wrapper}>
      <div className={pageStyles.row}>
        <div className={pageStyles.container}>
          <div className={pageStyles["for-you__wrapper"]}>


            <div className={`${skeletonStyles["skeleton__section--title"]} ${skeletonStyles.skeleton__shimmer}`}></div>
            <SelectedBookSkeleton />

            <div className={`${skeletonStyles["skeleton__section--title"]} ${skeletonStyles.skeleton__shimmer}`}></div>
            <div className={`${skeletonStyles["skeleton__section--subtitle"]} ${skeletonStyles.skeleton__shimmer}`}></div>
            <div className={skeletonStyles["skeleton__books--wrapper"]}>
              {Array.from({ length: 5 }).map((_, i) => (
                <BookCardSkeleton key={i} />
              ))}
            </div>


            <div className={`${skeletonStyles["skeleton__section--title"]} ${skeletonStyles.skeleton__shimmer}`}></div>
            <div className={`${skeletonStyles["skeleton__section--subtitle"]} ${skeletonStyles.skeleton__shimmer}`}></div>
            <div className={skeletonStyles["skeleton__books--wrapper"]}>
              {Array.from({ length: 5 }).map((_, i) => (
                <BookCardSkeleton key={i} />
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ForYouSkeleton