import React, { useState } from "react"
import axios from "axios"
import blogService from "../services/blogs"

const Blog = ({ blog }) => {
  const [show, setShow] = useState(false)

  const [noOfLikes, setNoOfLikes] = useState(blog.likes)

  const visiblility = { display: show ? '' : 'none' }

  const likeBlog = () => {
    const like = {
      likes : noOfLikes + 1
    }

    blogService.likeBlog(like, blog).then(res => {
      setNoOfLikes(noOfLikes + 1)
    })
  }
  return(
    <div>
      <div>
        <h4>{blog.title}</h4>
        <button onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</button> 
      </div>

      <div style={visiblility}>
        <h5>{blog.author}</h5>

        <h5>{blog.url}</h5>

        <h5>Likes: {noOfLikes}</h5>
        <button onClick={likeBlog}>like</button>
      </div>
    </div>  
  )
}

export default Blog