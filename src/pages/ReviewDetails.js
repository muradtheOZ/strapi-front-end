import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery,gql } from '@apollo/client'

const Review = gql`
  query GetReview($id:ID!){
    review(id: $id){
      data{
        id
        attributes{
          title,
          rating,
          body
        }
      }
    }
  }
`

const Reviewdetails = () => {
  const {id} = useParams()
  
  const {loading,error,data} = useQuery(Review,{
    variables: {
      id:id
    }
  })
  if(loading) return <p>Loading....</p>
  if(error) return <p>Error :( </p>
  console.log(data)
  return (
    <div>
      <div className="review-card">
            <div className="rating">{data.review.data.attributes.rating}</div>
            <h2>{data.review.data.attributes.title}</h2>
            <small>console list</small>

            <p>{data.review.data.attributes.body}</p>

          </div>
    </div>
  );
};

export default Reviewdetails;