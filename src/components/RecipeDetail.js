import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { ImSpoonKnife, ImClock, ImHome } from "react-icons/im";
import { Link } from "react-router-dom";
import Loader from './Loader'

const RecipeDetail = props => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecipe(props.match.params.id);
  }, []);

  const getRecipe = async id => {
    try {
      const newRecipe = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
    );
    setRecipe(newRecipe.data);
    setLoading(false);
    
    } catch (err) {
         setLoading(false);
    }
  };

  return (
    <RecipeWrap>
      <Link to="/">
        <div className="home">
          <ImHome />
        </div>
      </Link>
      {loading ? <Loader/> :  
      <div className="main">
        {!recipe ? <h1 style = {{textAlign: 'center'}}>No data found</h1> : 
        <>
        <div className="topArea">
          <div className="image">
            <img src={recipe.image} />
          </div>
          <h1 className="title">{recipe.title}</h1>
          <div className="horizontalLine"></div>
          <div className="brief">
            <div className="items">
              <div className="icon">
                <ImClock />
              </div>
              <p className="itemTitle">Total Time:</p>
              <p className="itemValue">{recipe.readyInMinutes}</p>
            </div>
            <div className="items">
              <div className="icon">
                <ImSpoonKnife />
              </div>
              <p className="itemTitle">Yield:</p>
              <p className="itemValue">{recipe.servings}</p>
            </div>
          </div>
        </div>
        <div className="description">
          <h1 className="descTitle">DESCRIPTION</h1>
          <div
            className="descSummary"
            dangerouslySetInnerHTML={{ __html: recipe.summary }}
          />
          <div className="horizontalLine"></div>
        </div>
        <div className="ingredients">
          <h1 className="ingreTitle">INGREDIENTS</h1>
          <ul>
            {recipe.nutrition.ingredients.map(ingredient => (
              <li>
                <span>
                  {ingredient.amount} {ingredient.unit}{" "}
                </span>
                <span style={{ fontWeight: "600" }}>{ingredient.name}</span>
              </li>
            ))}
          </ul>
          <div className="horizontalLine"></div>
        </div>
        <div className="instructions">
          <h1 className="insTitle">INSTRUCTIONS</h1>
          <ol>
            {recipe.analyzedInstructions[0].steps.map(step => (
              <li className="step">
                <span>{step.step}</span>
              </li>
            ))}
          </ol>
          <div className="horizontalLine"></div>
        </div>
        <div className="nutrition">
          <div className="topNutrition">
            <h1 className="nutritionTitle">nutrition facts</h1>
            <p className="nutritionServings">Serves {recipe.servings}</p>
          </div>
          <div className="bottomNutrition">
            {recipe.nutrition.nutrients.map(nutrient => (
              <div className="nutritionList">
                <p className="nutritionName">{nutrient.title}</p>
                <p className="nutritionValue">
                  {nutrient.amount} {nutrient.unit}
                </p>
              </div>
            ))}
          </div>
        </div>
        </>
        }
      </div>
      }
    </RecipeWrap>
  );
};

export default RecipeDetail;

const RecipeWrap = styled.div`
  position: relative;
  .home {
    position: absolute;
    top: -50px;
    left: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background: #00a498;
    border-radius: 50%;
    color: white;
    cursor: pointer;
  }
  .main {
    width: 60%;
    margin: 3rem auto;
    border: 5px solid #6d3c5c;
    margin-top: 6rem;
    margin-bottom: 1rem;
    .topArea {
      background: #6d3c5c;
      color: white;
      position: relative;
      .image {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 180px;
        height: 180px;
        border-radius: 50%;
        border: 5px solid #6d3c5c;
        overflow: hidden;
        img {
          height: 100%;
          width: auto;
        }
      }
      .title {
        font-size: 32px;
        text-align: center;
        font-weight: 500;
        margin: 0;
        padding-top: 6rem;
      }
      .horizontalLine {
        height: 2px;
        width: 80%;
        margin: 1rem auto;
        background: #b7bbc6;
        margin-bottom: 15px;
      }
      .brief {
        display: flex;
        width: 80%;
        justify-content: center;
        margin: auto;
        padding-bottom: 1.5rem;
        .items {
          display: flex;
          margin-right: 2rem;
          .icon {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 0.5rem;
          }
          .itemTitle {
            color: #b39aa7;
            margin: 0;
            margin-right: 0.25rem;
          }
          .itemValue {
            margin: 0;
          }
        }
      }
    }
    .description,
    .ingredients,
    .instructions {
      .descTitle,
      .ingreTitle,
      .insTitle {
        font-size: 13px;
        color: #979599;
        margin: 16px 0;
        letter-spacing: 0.1em;
        font-weight: 500;
        padding: 0 20px;
      }
      .descSummary {
        margin: 0;
        color: #515251;
        margin-bottom: 18px;
        padding: 0 20px;
      }
      .horizontalLine {
        height: 2px;
        width: 100%;
        background: #eae9eb;
      }
    }

    .ingredients {
      ul li {
        margin-bottom: 10px;
        list-style-type: none;
        position: relative;
      }
      ul li:before {
        background-color: #6d3c5c;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        height: 8px;
        width: 8px;
        display: block;
        content: " ";
        left: -20px;
        top: 0.5rem;
        position: absolute;
      }
    }

    .instructions {
      ol {
        counter-reset: li;
      }
      ol li:before {
        content: counter(li);
        counter-increment: li;
        position: absolute;
        background-color: #6d3c5c;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
        height: 16px;
        width: 16px;
        color: #fff;
        left: -20px;
        transform: translateX(-50%);
        line-height: 17px;
        font-size: 11px;
        text-align: center;
        font-family: "Bitter", serif;
        top: 5px;
      }
      ol > li {
        margin-left: 0.5em;
        line-height: 1.46;
      }
      ol li {
        list-style-type: none;
        position: relative;
        margin-bottom: 15px;
      }
    }
    .nutrition {
      margin: 1rem 20px;
      border: 1px solid #6d3c5c;
      .topNutrition {
        padding: 1rem 20px;
        background: #6d3c5c;
        .nutritionTitle {
          font-size: 20px;
          font-weight: 400;
          margin: 0;
          margin-bottom: 0.5rem;
          color: white;
          font-style: italic;
        }
        .nutritionServings {
          color: white;
          font-size: 1rem;
          margin: 0;
          font-style: italic;
        }
      }
      .bottomNutrition {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        .nutritionList {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #ebeaeb;
          .nutritionName {
            font-size: 14px;
            margin: 0;
            padding: 0.5rem 1rem;
          }
          .nutritionValue {
            font-size: 14px;
            margin: 0;
            padding: 0.5rem 1rem;
            color: #724f5f;
            font-weight: 600;
          }
        }
      }
    }
  }

  @media (max-width: 1200px) {
    .home {
      top: -50px;
      left: 90px;
    }
    .main {
      width: 70%;
      .topArea {
        .title {
          font-size: 30px;
        }
        .image {
          height: 155px;
          width: 155px;
        }
      }
    }
  }

  @media (max-width: 1024px) {
    .home {
      top: -70px;
      left: 80px;
    }
    .main {
      width: 75%;
      .topArea {
        .title {
          font-size: 28px;
        }
        .image {
          height: 150px;
          width: 150px;
        }
      }
    }
  }

  @media (max-width: 900px) {
    .home {
      top: -70px;
      left: 70px;
    }
    .main {
      width: 80%;
      .topArea {
        .title {
          font-size: 26px;
        }
        .image {
          height: 145px;
          width: 145px;
        }
      }
    }
  }

  @media (max-width: 700px) {
    .home {
      top: -70px;
      left: 60px;
    }
    .main {
      width: 85%;
      .topArea {
        .title {
          font-size: 24px;
        }
        .image {
          height: 140px;
          width: 140px;
        }
      }
      margin-bottom: 0.5rem;
    }
  }

  @media (max-width: 550px) {
    .home {
      top: -70px;
      left: 50px;
    }
    .main {
      width: 90%;
      .topArea {
        .title {
          font-size: 22px;
        }
        .image {
          height: 135px;
          width: 135px;
        }
      }
      .nutrition {
        margin: 1rem 12px;
        .bottomNutrition {
          grid-template-columns: 1fr;
        }
      }
    }
  }

  @media (max-width: 450px) {
    .home {
      top: -80px;
      left: 20px;
    }
    .main {
      width: 95%;
      .topArea {
        .title {
          font-size: 20px;
        }
        .image {
          height: 130px;
          width: 130px;
        }
      }
    }
  }
`;
