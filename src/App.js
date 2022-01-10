import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import Post from './Post.js';
import PostDialog from './PostDialog.js';
import Container from '@mui/material/Container';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }
    updatePosts() {
        // Replace ./data.json with your JSON feed
        fetch('http://localhost:8787/posts').then(response => {
            return response.json();
        }).then(data => {
            var posts = [];
            // Work with JSON data here
            data = JSON.parse(data);
            console.log(data);
            console.log(data.length);
            for (let i=0; i<data.length; i++) {
                posts.push(
                    <Post post={data[i]} post_id={i} key={i} />
                );
            }
            console.log(posts);
            this.setState({ posts: posts });
        }).catch(err => {
            // Do something for an error here
        });
    }
    componentDidMount() {
        this.updatePosts();
    }
    render() {
        return (
            <div className="App">
                <Container maxWidth="sm" color="secondary">
                    {this.state.posts}
                </Container>
                <PostDialog updater={this.updatePosts} />
            </div>
        );
    }
}

export default App;
