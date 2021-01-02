import React from 'react';
import TodoList from './todoList'
import {useSpring, animated} from 'react-spring';
import '../App.css';

export const Actions = {
    ADD_TODO: 'add_todo',
    TOGGLE: 'toggle',
    DEL_TODO: 'del_todo',
    DEL_ALL: 'del_all'
}

const App = () => {
    const props = useSpring({
        from: {opacity: 0, marginTop: -500},
        to: {opacity: 1, marginTop: 0}
    });

    const center = {
        textAlign: 'center',
        marginTop: '10px',
        marginBottom: '10px',
    }

    const [txt, setTxt] = React.useState('');
    const [error, setError] = React.useState(false);

    const reducer = (todos, action) => {
        switch(action.type){
            case Actions.ADD_TODO:
                return [...todos, newTodo(action.payload.name)];
            case Actions.TOGGLE:
                return todos.map(todo => {
                    if(todo.id === action.payload.id){
                        return{...todo, remove: !todo.remove}
                    }
                    return todo;
                })
            case Actions.DEL_TODO:
                return todos.filter(todo => {
                    return todo.id !== action.payload.id;
                })
            case Actions.DEL_ALL:
                return todos =[];
            default: 
            return todos;    
        }
    }
    const [todos, dispatch] = React.useReducer(reducer, []); 

    function newTodo(name) {
        return {
            id: Math.random(),
            name: name,
            remove: false
        };
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(txt){
        dispatch({type: Actions.ADD_TODO, payload: {name: txt}});
        setTxt('');
        setError(false);
        }
        else{
            setError(true);
        }
    }
    const handleDeleteAll = () =>{
        dispatch({type: Actions.DEL_ALL});
        setError(false);
    }
    return (
    <animated.div style={props} className="container">
      <div style={center}>
          <h3 style={{margin: '40px 0', fontFamily: 'Satisfy, cursive', fontSize: '40px'}}>Todo List App</h3>
          <div className="form-group">
          <input type="text" value={txt} className="form-control font-weight-bold" onChange={e => setTxt(e.target.value)} />
          </div>
          {error ? <span style={{color: 'red', float:"left"}}>Enter some todos</span> : null}
          <div style={{marginBottom: '100px'}}>
          <button onClick={handleSubmit} className="btn btn-success ml-50 float-right">Add</button>
          <button onClick={handleDeleteAll} className="btn btn-danger ml-50 float-right" style={{marginRight: '5px'}}>
          <i className="fa fa-minus-circle" style={{marginRight: '5px'}} aria-hidden="true"></i>Delete All
          </button>
          </div>
          <ul style={{margin: 'auto auto'}}>
          {todos.map(todo => {
                return <TodoList key={todo.id} todo={todo} dispatch={dispatch} />
          })}
          </ul>
        
      </div>
    </animated.div>
  )
}

export default App;
