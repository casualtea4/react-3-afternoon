import React, { Component } from 'react';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import axios  from 'axios';
import Post from './Post/Post'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts')
      .then(response => {
        this.setState({posts: response.data});
        // console.log(response)

      })
      .catch(()=>console.log("didn't work ya noob"))
  }

  updatePost(id,text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`,{text})
      .then(response =>{
        this.setState({post:response.data})
      })
      .catch(()=>console.log("i exist just incase"))
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api?id=${id}`)
    .then(response=>{
      this.setState({posts:response.data})
    })
  }

  createPost() {

  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose />

         {
         posts.map(
          post=> 
            (<Post 
              key={post.id}
              text={post.text}
              date={post.date}
              id={post.id}
              updatePostFn={this.updatePost}
              deletePostFn={this.deletePost}/>
         ))}
        </section>
      </div>
    );
  }
}

export default App;
