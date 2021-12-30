import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery,gql } from '@apollo/client'

const REVIEWS = gql`
query GetReviews{
  reviews{
    data{
      id,
      attributes{
        title,
        rating,
        body,
        categories{
          data{
            id,
            attributes{
              name
            }
          }
        }
      }
    }
  }
}

`

export default function Homepage() {
const{loading,error,data} = useQuery(REVIEWS)
  
  
  console.log(data)
  if(error) return <div> Fetch incomplete</div>
        
  return (
    <div>
      {
        loading ?
        <p>Loading....</p>
        :
        data.reviews.data?.map(review =>(
          <div key={review.id} className="review-card">
            <div className="rating">{review.attributes.rating}</div>
            <h2>{review.attributes.title}</h2>
            {review.attributes.categories.data.map(category =>(
            <small key={category.id}>{category.attributes.name}</small>
    ))}

            <p>{review.attributes.body.substring(0,200)}...</p>

            <Link to={`/details/${review.id}`}>Read More </Link>

          </div>
        ))
        
        
      }
    </div>
  )
}
