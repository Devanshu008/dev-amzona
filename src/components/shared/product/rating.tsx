import { Star } from 'lucide-react'

const Rating = ({
  rating = 0,
  size = 6,
}: {
  rating: number
  size?: number
}) => {
  const fullStars = Math.floor(rating)
  const partialStar = rating % 1
  const emptyStars = 5 - fullStars - Math.ceil(rating)

  return (
    <div
      className='flex items-center'
      aria-label={`Rating: ${rating} out of 5 stars`}
    >
      {Array.from({ length: fullStars }).map((_, index) => (
        <Star
          key={index}
          className={`h-${size} w-${size} fill-primary text-primary`}
        />
      ))}
      {partialStar > 0 && (
        <div className='relative'>
          <Star className={`h-${size} w-${size} text-primary`} />
          <div
            className='absolute top-0 left-0 overflow-hidden'
            style={{ width: `${partialStar * 100}%` }}
          >
            <Star className={`h-${size} w-${size} fill-primary text-primary`} />
          </div>
        </div>
      )}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <Star key={index} className={`h-${size} w-${size} text-primary`} />
      ))}
    </div>
  )
}

export default Rating
