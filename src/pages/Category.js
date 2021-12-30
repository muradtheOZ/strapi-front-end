import React from 'react';
import { useQuery,gql } from '@apollo/client';
import{useParams,Link} from 'react-router-dom';

const CATEGORY = gql`
query GetCategory($id:ID!){
  category(id:$id){
    data{
      id
      attributes{
        name,
        reviews{
          data{
                id,
                attributes{
                  rating,
                  title,
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
      
    }
  
  }
}
`

const Category = () => {
  const {id} = useParams()
  const {loading,error,data} = useQuery(CATEGORY,{
    variables: {
      id:id
    }
  })
  console.log("data from category field",data)
  console.log("category list",data?.category.data.attributes.reviews.data.map(categories =>(
    categories.attributes.categories.data.map(category =>(
      category.attributes.name
    ))
  )))
  if(loading) return <p>Loading...</p>
  if(error) return <p>Problem in fetching data</p>
  return (
    <div>
      {
        loading ?
        <p>Loading....</p>
        :
        <div>
          <h2>{data.category.data.attributes.name}</h2>

          {data.category.data.attributes.reviews.data?.map(review =>(
          <div key={review.id} className="review-card">
            <div className="rating">{review.attributes.rating}</div>
            <h2>{review.attributes.title}</h2>
          {review.attributes.categories.data.map(category =>(
            <small>{category.attributes.name}</small>
    ))}

            <p>{review.attributes.body.substring(0,200)}...</p>

            <Link to={`/details/${review.id}`}>Read More </Link>

          </div>
        ))}
        </div>
        
        
        
      }
    </div>
  );
};

export default Category;