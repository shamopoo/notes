import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CommentInput from './CommentInput'
import { addComment } from '../reducers/comments'

class CommentInputContainer extends Component {
    static propTypes = {
      comments: PropTypes.array,
      onSubmit: PropTypes.func
    }

    constructor () {
       super()
       this.state = {
          username: ''
       }
    }

    componentWillMount () {
        this._loadUsername()
    }

    _loadUsername () {
        let username = localStorage.getItem('username')
        username && this.setState({username})
    }

    // 失去焦点保存名字
    _saveUsername (username) {
      let oldUserName = localStorage.getItem('username') || ''
      username && oldUserName !== username &&  localStorage.setItem('username', username)
    }

    handleSubmitComment (comment) {
      if (!comment) return
      if (!comment.username) return alert('请输入用户名')
      if (!comment.content) return alert('请输入评论内容')
        const { comments } = this.props
        const newComments = [...comments, comment]
        localStorage.setItem('comments', JSON.stringify(newComments))
        if (this.props.onSubmit) {
            this.props.onSubmit(comment)
        }
    }
    render () {
      return(
        <CommentInput 
        username={this.state.username}
        onUserNameInputBlur={this._saveUsername.bind(this)}
        onSubmit={this.handleSubmitComment.bind(this)} />
      )
    }
}


const mapStateToProps = (state) => {
  return {
    comments: state.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (comment) => {
      dispatch(addComment(comment))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentInputContainer)