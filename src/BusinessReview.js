import React from 'react';
import { Button, Container, Row, ListGroupItem, ListGroup, ListGroupItemHeading, ListGroupItemText} from 'reactstrap';
import {useParams} from 'react-router-dom';      
import axios from 'axios';

class BusinessReview extends React.Component {
    constructor(props) {

        super(props);

        // Don't do this!
        this.state = {
            error : null,
            isLoaded : false,
            reviews: [],
            id: null ,
        };
        

    }

    componentDidMount () {
        //const { term } = this.props.location.state.term
        //const { id } = this.props.match.params
        
        
        const { match: { params } } = this.props;

        console.log(" ID ==> " + params.userId);
        this.setState({ id: params.userId });
        /*
        axios.get(`/api/users/${params.userId}`)
        .then(({ data: user }) => {
          console.log('user', user);
    
          this.setState({ user });
        });
        */

        async function makeRequest(id) {

            const config = {
                method: 'GET',
                url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}/reviews`,
                headers: { 
                    'Authorization': 'Bearer DOIkuu6qz2t-LyFO-8Z29oUmYtoIGLkLWdgY7GJIAPW2ZK7FkQMZ1RHvUS2MbbJN5i_MWEZGnMqnHs2iNSRnUsFg6SxncOcQ6u3ct96aw0XEjYIqvhUPqrlep8JIXnYx',
                }
            }
        
            let res = await axios(config)
            
            return res.data ;
        }
        
        makeRequest(params.userId)
        
        .then(
            // handle the result
            (result) => {
                this.setState({
                    isLoaded : true,
                    reviews : result.reviews
                })
                console.log(this.state.reviews);
            } ,
            // Handle error 
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
                console.log('ERROR');
                console.log(error);
            }
        )
        /*
        if( this.state.reviews = makeRequest(params.userId) ){
            this.setState({
                isLoaded : true,
            })
        }else{
            this.setState({
                isLoaded: true,
                error : "Error"
            })
        }
        */

        //console.log(this.state.reviews)

    }

    

    render(){

        //this.setState( { id : useParams() });
        const {error, isLoaded, reviews, id} = this.state;

        if(error){
            return <div>Error in loading</div>
        }else if (!isLoaded) {
            return <div>Loading ...</div>
        }else{

            return (
                <div>
                Reviews - {this.state.id} 
            
               
            
            <Container>
            <h3> Restaurants in Alpharetta </h3>
            
            <ListGroup> 

            {
            
                reviews.map(rev => (
            
                    <ListGroupItem key={rev.id}  >
                        
                        <ListGroupItemHeading> {rev.user.name} </ListGroupItemHeading>
                        <ListGroupItemText> {rev.text}      </ListGroupItemText>

                        <p> {rev.rate} </p>
                        <p> {rev.user.image_url} </p>
            
                    </ListGroupItem>
                    
                ))
            }

            </ListGroup>
            </Container>
            
            </div> 
            
             ) 
        }

        

    
   
    };
}

export default BusinessReview;