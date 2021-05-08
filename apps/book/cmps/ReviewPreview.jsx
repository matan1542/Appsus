

export function ReviewPreview({review, removeReview}){
    return (<React.Fragment>
        <div className="full-name">{review.fullName}</div>
        <div className="rate">{review.rate}</div>
        <div className="date">{review.date}</div>
        <div className="user-review">{review.userReview}</div>
        <button onClick={() => removeReview(review.id)}>X</button>
    </React.Fragment>)
}