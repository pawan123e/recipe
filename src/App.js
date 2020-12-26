import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Search } from "react-feather";
import { Link } from "react-router-dom";
import Pagination from './components/Pagination'
import Loader from './components/Loader'

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [pages, setPages] = useState('');
  const [number, setNumber] = useState(10);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    getDefaultRecipes();
  }, []);

  const getDefaultRecipes = async () => {
    const newRecipes = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${searchText ? searchText : 'pasta'}&maxFat=100&maxProtein=100&maxCarbs=100&maxCalories=800&number=${number}&offset=${(currentPage -
        1) *
        number}&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
    );
    setLoading(false);
    
    setRecipes(newRecipes.data.results);
  };

  useEffect(() => {
    setLoading(true)
    getDefaultRecipes();
  }, [currentPage]);

  const onsubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const newRecipes = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${searchText}&maxFat=100&maxProtein=100&maxCarbs=100&maxCalories=800&number=${number}&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
    );
    setLoading(false);
    const totalPages = Math.ceil(newRecipes.data.totalResults / number);;
    setPages(totalPages);
    setRecipes(newRecipes.data.results);
  };

  console.log("recipes", recipes);

  return (
    <AppWrap>
      <h1>Get Recipes</h1>
      <form onSubmit={onsubmit}>
        <div className="formInput">
          <input
            type="text"
            placeholder="Search recipe..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
          <div className="formIcon">
            <Search size={22} />
          </div>
        </div>
      </form>
      {loading ? <Loader/> : 
      <div className="recipeContainer">
        {recipes.map(recipe => {
          console.log("hello how are you donig");

          return (
            <div className="recipeCard" key={recipe.id}>
              <img src={recipe.image} />
              <div className="recipeDetail">
                <h3 className="recipeTitle">{recipe.title}</h3>
                {recipe.nutrition.nutrients.map(nutrient => (
                  <p className="recipeNutrition">
                    {nutrient.title}: {nutrient.amount}
                    {nutrient.unit}
                  </p>
                ))}
                <Link to={`/recipe/${recipe.id}`}>
                  <button className='btn'>Read More</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      }
      {pages > 1 && <Pagination pages = {pages} setCurrentPage={setCurrentPage}/>}
    </AppWrap>
  );
};

const AppWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background: rgb(254,254,254);
  min-height: 100vh;
  width: 100%;
  .formInput {
    position: relative;
    .formIcon {
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translate(0, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(100, 100, 100, 0.8);
    }
  }
  input {
    border: none;
    padding: 0.8rem 1rem;
    width: 300px;
    border: 1px solid rgba(100, 100, 100, 0.5);
    border-radius: 5px;
    outline: none;
    padding-left: 2.5rem;
  }
  .recipeContainer {
    width: 85%;
    margin: auto;
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    grid-gap: 1rem;
    .recipeCard {
      background: white;
      border-radius: 5px;
      box-shadow: 0px 0px 22px -11px rgba(0,0,0,0.5);
}
      .recipeDetail {
        padding: 1rem;
        .btn {
          background: #6d3c5c;
          border: none;
          padding: 0.5rem 1rem;
          color: white;
          cursor: pointer;
          border-radius: 3px;
          transition: all 0.25s ease;
          margin-top: 0.5rem;
          &:hover {
            opacity: 0.9;
          }
        }
        .recipeTitle {
          margin: 0;
          padding: 0;
          font-size: 1rem;
          font-weight: 500;
        }
        .recipeNutrition {
          margin: 0.25rem 0;
          padding: 0;
        }
      }
      img {
        width: 100%;
        height: auto;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }
    }
  }


  @media (max-width: 400px) {
    input {
      width: 250px;
    }
  }
`;

export default App;
