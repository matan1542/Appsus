import { ReviewPreview } from "./ReviewPreview.jsx";

export function ReviewList({ reviews, removeReview }) {
    return reviews.map(review => {
    return <ReviewPreview key={review.id} review={review} removeReview={removeReview} />
});
}
