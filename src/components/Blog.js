import React, { useState } from "react"

const Blog = ({blog}) => {
  const [show, setShow] = useState(false)

  const visiblility = { display: show ? '' : 'none' }

  return(
    <div>
      <div>
        <h4>{blog.title}</h4>
        <button onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</button> 
      </div>

      <div style={visiblility}>
        <h5>{blog.author}</h5>

        <h5>{blog.url}</h5>

        <h5>Likes: {blog.likes}</h5>
        <button>like</button>
      </div>
    </div>  
  )
}

export default Blog