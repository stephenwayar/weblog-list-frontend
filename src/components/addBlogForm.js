import React, { useState } from "react"
import blogService from "../services/blogs"

export default function AddBlogFrom({ setBlogs, setSuccess, blogs, blogRef, setError }){
  const [title, setTitle] = useState('')
  const [authur, setAuthur] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async e => {
    e.preventDefault()
    
    try{
      const blog = { title, authur, url }
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))
      setAuthur('')
      setTitle('')
      setUrl('')
      blogRef.current.toggleVisibility()

      setSuccess('Sucessfully added note')
      setTimeout(() => {
        setSuccess(null)
      }, 3000)
    }catch(exception){
      setAuthur('')
      setTitle('')
      setUrl('')

      setError('There was an error adding note')
      setTimeout(() => {
        setError(null)
      }, 3000)
    }

  }

  return(
    <form onSubmit={addBlog}>
      <div>
        <label>title</label>
        <input value={title} type='text' onChange={({ target }) => setTitle(target.value)} />
      </div>

      <div>
        <label>authur</label>
        <input value={authur} type='text' onChange={({ target }) => setAuthur(target.value)} />
      </div>

      <div>
        <label>url</label>
        <input value={url} type='text' onChange={({ target }) => setUrl(target.value)} />
      </div>

      <button>add blog</button>
    </form>
  )
}