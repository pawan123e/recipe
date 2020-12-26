import React, { useState, useEffect } from 'react';
import styled from 'styled-components'

function Pagination({ pages = 10, setCurrentPage }) {

  const numberOfPages = []
  for (let i = 1; i <= pages; i++) {
    numberOfPages.push(i)
  }

  const [currentButton, setCurrentButton] = useState(1)

  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([])

  useEffect(() => {
    let tempNumberOfPages = [...arrOfCurrButtons]

    let dotsInitial = '...'
    let dotsLeft = '... '
    let dotsRight = ' ...'

    if (numberOfPages.length < 6) {
      tempNumberOfPages = numberOfPages
    }

    else if (currentButton >= 1 && currentButton <= 3) {
      tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length]
    }

    else if (currentButton === 4) {
      const sliced = numberOfPages.slice(0, 5)
      tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length]
    }

    else if (currentButton > 4 && currentButton < numberOfPages.length - 2) {              
      const sliced1 = numberOfPages.slice(currentButton - 2, currentButton)                
      const sliced2 = numberOfPages.slice(currentButton, currentButton + 1)                
      tempNumberOfPages = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, numberOfPages.length]) 
    }
    
    else if (currentButton > numberOfPages.length - 3) {                 
      const sliced = numberOfPages.slice(numberOfPages.length - 4)       
      tempNumberOfPages = ([1, dotsLeft, ...sliced])                        
    }
    
    else if (currentButton === dotsInitial) {
      setCurrentButton(arrOfCurrButtons[arrOfCurrButtons.length-3] + 1) 
    }
    else if (currentButton === dotsRight) {
      setCurrentButton(arrOfCurrButtons[3] + 2)
    }

    else if (currentButton === dotsLeft) {
      setCurrentButton(arrOfCurrButtons[3] - 2)
    }

    setArrOfCurrButtons(tempNumberOfPages)
    setCurrentPage(currentButton)
  }, [currentButton])


  return (
    <PaginationWrap >
      <div className="pagination-container">
      <a
        href="#"
        className={`${currentButton === 1 ? 'disabled' : ''}`}
        onClick={() => setCurrentButton(prev => prev <= 1 ? prev : prev - 1)}
      >
      &laquo; Prev
      </a>

      {arrOfCurrButtons.map(((item, index) => {
        return <a
          href="#"
          key={index}
          className={`${currentButton === item ? 'active' : ''} page`}
          onClick={() => setCurrentButton(item)}
        >
          {item}
        </a>
      }))}

      <a
        href="#"
        className={`${currentButton === numberOfPages.length ? 'disabled' : ''}`}
        onClick={() => setCurrentButton(prev => prev >= numberOfPages.length ? prev : prev + 1)}
      >
        Next &raquo;
      </a>
      </div>
    </PaginationWrap>
  );
}

const PaginationWrap = styled.div`
margin: 1rem 0;
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-weight: 500;
  font-size: 15px;
  .page {
    display: block;
  }
  a:hover:not(.active) {background-color: #ddd;}
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
    color: black;
    padding: 0.5rem 1rem;
    text-decoration: none;
    transition: background-color .2s;
    border: 1px solid #ddd;
    cursor: pointer;
    &.active {
    background-color: #64a281;
    color: white;
    border: 1px solid #64a281;
  }
  &.disabled { 
    opacity: 0.2;
  }

  }
  
}

@media(max-width: 700px) {
.pagination-container {
  .page {
    display: none;
  }
}
}
`

export default Pagination
