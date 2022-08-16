import React, { Component } from 'react';
import MovieAPIservice from '../services/MovieAPIservice';
import '../components/Listmovie.module.css'

class ListMoviesComponents extends Component {
    constructor(props){
        super(props);
        this.state = {
            movies:[]
        }

        this.addMovie = this.addMovie.bind(this);
        this.editMovie = this.editMovie.bind(this);
    }

    componentDidMount(){
             MovieAPIservice.getMovies().then((res) => {
                this.setState({movies: res.data});
             })
    }

    addMovie(){
          this.props.history.push('/api/add-movies');
    }

    editMovie(id){
            this.props.history.push(`/api/update-movies/${id}`);
    }


    render() {
        return (
            <div>
                 <h2 className='text-center'>Movies List Manager</h2>
                 <div className="row">
                    <a href="http://localhost:3000/api/add-movies">Add Movie</a>
                 </div>
                 <div className="row">
                    <table  className='table table-striped table-bordered ' style={{width: '100%'}} >
                        <thead>
                            <tr>
                                <th className='table-width' style={{width: '15%'}} >Title</th>
                                <th style={{width: '30%'}}>Movie Poster</th>
                                <th style={{width: '15%'}}>Released</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.movies.map(
                                    movie =>
                                    <tr key = {movie.id}>
                                        <td>{movie.name}</td>

                                        <td> <img src={movie.poster} alt="" width="120" height="120" /> </td>
                                        <td>{movie.release}</td>
                                        <td>
                                            <button onClick={() => this.editMovie(movie.id)} className="btn btn-info">Update</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>

                    </table>
                 </div>
            </div>
        );
    }
}

export default ListMoviesComponents;