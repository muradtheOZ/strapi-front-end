import React from 'react';
import { Link } from 'react-router-dom'
import { useQuery,gql } from '@apollo/client';

const Category = gql`
  query GetCategories{
    categories{
      data{
        id
        attributes{
          name
        }
        
      }
      
      
    }
  }
`

const SiteHeader = () => {
  const {loading,error,data} = useQuery(Category)


  console.log(data)
  if(loading) return <p>Loading...</p>
  if (error) return <p> Problem in data fetch... </p>
  return (
    <div className="site-header">
      <Link to="/"><h1>Strapi learn</h1></Link>
      <nav className="categories">
        <span>Filter reviews by category: </span>
        {data.categories.data?.map(category =>(
          <Link key ={category.id} to={`/category/${category.id}`}>{category.attributes.name}</Link>
        ))}
      </nav>
    </div>
  );
};

export default SiteHeader;
