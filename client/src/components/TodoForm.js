import React, { useState, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_TODO } from '../utils/Mutations';
import Auth from '../utils/auth';

function TodoForm(props) {
    const [input, setInput] = useState({ input: "" })
    const [addTask] = useMutation(SAVE_TODO);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const mutationResponse = await addTask({
            variables: {
                input: input,
            }
        });
        console.log(mutationResponse);
    };
    setInput('');
};

return (
    <form onSubmit={handleSubmit} className='todo-form'>
        {props.edit ? (
            <>
                <input
                    placeholder='Update your item'
                    value={input}
                    onChange={handleChange}
                    name='text'
                    ref={inputRef}
                    className='todo-input edit'
                />
                <button onClick={handleSubmit} className='todo-button edit'>
                    Update
          </button>
            </>
        ) : (
            <>
                <input
                    placeholder='Add a todo'
                    value={input}
                    onChange={handleChange}
                    name='text'
                    className='todo-input'
                    ref={inputRef}
                />
                <button onClick={handleSubmit} className='todo-button'>
                    Add todo
          </button>
            </>
        )}
    </form>
);


export default TodoForm;
