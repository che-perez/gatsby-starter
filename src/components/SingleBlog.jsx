import React from "react"
import { graphql } from "gatsby"

import("../scss/styles.scss");

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  const blog  = frontmatter;
  console.log(blog);
  return (
    <div className="blog-post-container">
      <div className="blog-post">
        <h1>{blog.title}</h1>
        <h2>{blog.date}</h2>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
      { blog.isimage ? <img alt='' src={blog.image}></img> : <p>No Image</p> }
      <ul>
        { blog.items.map((item, index) => {
          return (
            <li key={ index }>{ item.name }</li>
          )
        })}
      </ul>
    </div>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        isimage
        image
        items {
          name
        }
      }
    }
  }
`