import React, { Component } from 'react'
import CommentInput from './CommentInputContainer'
import CommentList from './CommentListContainer'


class CommentApp extends Component {
  render () {
    return (
      <div>
        <CommentInput  />
        <CommentList />
      </div>
    )
  }
}
export default CommentApp