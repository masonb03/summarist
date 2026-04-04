// components/skeletons/SearchSkeleton.tsx
import skeletonStyles from '@/styles/skeleton.module.css'
import styles from '@/styles/Searchbar.module.css'

const SearchResultSkeleton = () => (
  <div className={`${styles["search__book--link"]}`}>
    <div className={`${skeletonStyles['skeleton__search--img']} ${skeletonStyles['skeleton__shimmer']}`}></div>
    <div className={skeletonStyles['skeleton__search--info']}>
      <div className={`${skeletonStyles['skeleton__search--title']} ${skeletonStyles['skeleton__shimmer']}`}></div>
      <div className={`${skeletonStyles['skeleton__search--author']} ${skeletonStyles['skeleton__shimmer']}`}></div>
      <div className={`${skeletonStyles['skeleton__search--duration']} ${skeletonStyles['skeleton__shimmer']}`}></div>
    </div>
  </div>
)

const SearchSkeleton = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <SearchResultSkeleton key={i} />
      ))}
    </>
  )
}

export default SearchSkeleton;