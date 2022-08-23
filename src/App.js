import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import auth from './services/auth'
import SuccessNotification from './components/sucessNotification'
import ErrorNotification from './components/errorNotification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [authur, setAuthur] = useState('')
  const [url, setUrl] = useState('')
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const sessionUser = window.localStorage.getItem('blogUser')
    if(sessionUser){
      const parsedUser = JSON.parse(sessionUser)
      blogService.setToken(parsedUser.token)
      setUser(parsedUser)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))  
  }, [])

  const handleLogin = async e => {
    e.preventDefault()

    try{
      const loggedUser = await auth.login({ username, password })
      window.localStorage.setItem('blogUser', JSON.stringify(loggedUser))
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
      setUsername('')
      setPassword('')
    }catch(_exception){
      setUsername('')
      setPassword('')

      setError('Wrong credentials')
      setTimeout(() => {
        setError(null)
      }, 3000)
    }
  }

  const addBlog = async e => {
    e.preventDefault()
    
    try{
      const blog = { title, authur, url }
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))
      setAuthur('')
      setTitle('')
      setUrl('')

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

  const handleLogout = () => window.localStorage.removeItem('blogUser')

   if(user === null){
    return(
      <form onSubmit={handleLogin}>
      <h1>Login to application</h1>

      <div>
        <label>Username:</label>
        <input type='text' value={username} onChange={({ target }) => setUsername(target.value)}/>
      </div>

      <div>
        <label>Password:</label>
        <input type='password' value={password} onChange={({ target }) => setPassword(target.value)}/>
      </div>

      <button>login</button>
    </form>
    )
   }

  return (
    <div>
      <ErrorNotification message={error} />
      <SuccessNotification message={success} />
      <button onClick={handleLogout}>logout</button>
      <h3>{user.name} logged in</h3>

      <h2>Create new blog</h2>

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

      <h2>blogs</h2>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App