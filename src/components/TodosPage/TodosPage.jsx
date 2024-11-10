import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoElement from '../TodoElement/TodoElement';
import styles from './TodosPage.module.css';

function TodosPage() {
    const [todos, updateTodos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getTodos() {
            try {
                const response = await fetch('http://localhost:3000/todo');
                if (response.ok) {
                    const data = await response.json();
                    updateTodos(data);
                } else{
                    alert('HTTP error: ' + response.status);
                }
            } catch (error) {
                alert(error);
            }
        }
        getTodos();
    }, [])

    return (
        <>
            <h1>Список ваших дел</h1>
            {todos.length == 0 ? (
                <p>Пока тут пусто...</p>
            ) : (
                <ul className={styles.ul}>
                    {todos.map((todo) => (
                        <TodoElement key={todo.id} id={todo.id} todo={todo.todo} details={todo.details} date={todo.deadline}/>
                    ))}
                </ul>
            )}
            <button className={styles.button} onClick={() => navigate('/add')}>+</button>
            {/* <button onClick={() => {updateTodos(prev => structuredClone(prev).sort((a, b) => {return new Date(a.deadline).getDate() - new Date(b.deadline).getDate()}))}}>sort</button> */}
        </>
    );
}

export default TodosPage;
