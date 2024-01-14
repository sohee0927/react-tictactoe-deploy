import React, { useState } from 'react'
import Square from './Square'
import './Board.css';

const Board = ({squares,onClick}) => { //({squares,onClick}) -> 부모(APP)에서 내려준 props를 사용하기위해 선언

    // constructor(props){
    //     //이 constructor에서 this.props를 사용하려면 super(props)라고 정의를 해줘야함
    //     //super를 사용해야 this 를 사용할 수 있음
    //     super(props); 
    //     this.state = {
    //         squares: Array(9).fill(null)
    //     }

    // }


    const renderSquare = (i) => {
        return <Square value={squares[i]} onClick={() => onClick(i)}/>;
    }

    
    

    return (
        <div>
            <div className='board-row'>
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className='board-row'>
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className='board-row'>
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    )

}

export default Board