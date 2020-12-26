import React from 'react'
import Spinner from './loader/spinner.gif'
import styled from 'styled-components'

const Loading = () => {
    return (
        <Spin>
            <img src = {Spinner} alt='spin' className='spin'/>
        </Spin>
    )
}

export default Loading

const Spin = styled.div`
   height: 82.4vh;
   display: flex;
   justify-content: center;
   align-items: center;
   .spin{
       width: 400px;
       height: auto;
   }
`