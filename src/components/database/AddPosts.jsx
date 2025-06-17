import React, { useState } from 'react'
import { useAddUsersMutation, useUpdateUsersMutation } from '../../features/apiSlice'
import PostList from './PostList';

const AddPosts = () => {

    const [addPost, { isLoading, isError }] = useAddUsersMutation();
    const [updateUsers] = useUpdateUsersMutation();

    const initialInput = {
        username: "",
        email: "",
        password: ""
    }

    const [input, setInput] = useState(initialInput);

    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [originalInput, setOriginalInput] = useState(initialInput);
    const [isDirty, setIsDirty] = useState(false)


    const isInputValid = input.username && input.email && input.password;
    const isSameAsOriginal = JSON.stringify(input) === JSON.stringify(initialInput);
    const isSubmitDisabled = !isInputValid || (editMode && isSameAsOriginal);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value
        }))
        setIsDirty(true)
    }

    if (isLoading) {
        return <div className="spinner-border text-primary" role="status" style={{
            position: 'absolute',
            top: '50%', left: '50%', transform: 'translate(-50% -50%)'
        }}>
            <span className="visually-hidden">Loading...</span>
        </div>
    }

    if (isError) {
        return <h4>OH there is an error</h4>
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, email, password } = input;

        if (!username || !email || !password) {
            alert("Please fill in all fields");
            return;
        }

        try {
            if (editMode) {
                await updateUsers({ id: editId, patch: input }).unwrap()
                setEditMode(false)
                setEditId(null)
            } else {
                await addPost(input).unwrap()
            }

        } catch (error) {
            console.error("data is not updating", error)
        }
        setInput(initialInput)
        setOriginalInput(initialInput)

    }

    const handleEdit = (user) => {
        const editedUser = {
            username: user.username,
            email: user.email,
            password: user.password || ""
        }
        setInput(editedUser);
        setOriginalInput(editedUser);
        setEditMode(true);
        setEditId(user.id);
    }

    const handleCancel = () => {
        setInput(initialInput);
        setOriginalInput(initialInput);
        setEditMode(false)
    }

    return (

        <div style={{ width: '600px', margin: "0 auto" }}>
            <form onSubmit={handleSubmit} style={{
                display: "flex", flexDirection: "column",
                gap: "1rem",
            }} className='form-input'>
                <label htmlFor="username"></label>
                <input
                    type="text"
                    name='username'
                    value={input.username}
                    placeholder='username'
                    onChange={handleChange}
                />
                <label htmlFor="Email"></label>
                <input
                    type="email"
                    name='email'
                    value={input.email}
                    placeholder='example@gmail.com'
                    onChange={handleChange}
                />
                <label htmlFor="Password"></label>
                <input
                    type="password"
                    name='password'
                    value={input.password}
                    placeholder='Password'
                    onChange={handleChange}
                />

                <button className='form-button'
                    disabled={isSubmitDisabled}
                    style={{
                        opacity: isSubmitDisabled ? 0.5 : 1,
                        cursor: isSubmitDisabled ? "not-allowed" : "pointer"
                    }}
                >

                    {editMode ? "Update User" : "Add User"}
                </button>

            </form>
            {editMode ? <button onClick={handleCancel} style={{
                marginTop: "10px", border: "none", borderRadius: "7px",
                cursor: 'pointer', backgroundColor: 'grey',
                padding: '7px 12px', color: 'white'
            }}>
                Cancel
            </button> : ""}

            <PostList handleEdit={handleEdit} />
        </div>

    )
}

export default AddPosts;