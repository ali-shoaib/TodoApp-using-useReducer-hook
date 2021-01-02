import React from 'react'
import {Actions} from './App';
import {useSpring, animated} from 'react-spring';

const TodoList = ({todo, dispatch}) => {
    const toggle = {
        fontSize: '25px',
        margin: '6px',
        fontFamily: 'Source Code Pro, cursive'
    }
    const handleToggle = () => {
        dispatch({type: Actions.TOGGLE, payload: {id: todo.id}});
    }
    const handleDelete = () => {
        dispatch({type: Actions.DEL_TODO, payload: {id: todo.id}})
    }
    const props = useSpring({
        from: {marginLeft: -2000, },
        to: {marginLeft: 0, }
    });

  return (
    <>
        <animated.div style={ props}>    
        {todo.remove ? <del style={toggle} >
            {todo.name}
        </del>
        :
        <span style={toggle}>
            {todo.name}
        </span>}
        <button onClick={handleToggle} className="btn btn-primary">{todo.remove ? 'Completed' : 'Incomplete'}</button>{' '}
        <button onClick={handleDelete} className="btn btn-warning"><i className="fa fa-trash" aria-hidden="true"></i></button>
        </animated.div>
    </>
  )
}

export default TodoList;
