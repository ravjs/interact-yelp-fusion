import React from 'react';
import {  Container,  ListGroupItem, ListGroup, ListGroupItemHeading, ListGroupItemText, Card, CardImg} from 'reactstrap';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useParams
  } from "react-router-dom";

class BusinessReview extends React.Component {
    constructor(props) {

        super(props);

        // State declaration
        this.state = {
            error : null,
            isLoaded : false,
            reviews: [],
            id: null ,
        };
        

    }

    componentDidMount () {
       
        const { match: { params } } = this.props;

        console.log(" ID ==> " + params.userId);
        this.setState({ id: params.userId });
        

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
                    
                    <Link to = {`/business/`} > Go back on business </Link>

                Reviews - {this.state.id} 
            
               
            
            <Container>
            <h3> Restaurants in Alpharetta </h3>
            
            <ListGroup> 

            {
            
                reviews.map(rev => (
            
                    <ListGroupItem key={rev.id}  >
                        
                        <Card>
                            <CardImg top width="200" src={rev.user.image_url}  alt="Card image cap" />
                           
                        </Card>
                        <ListGroupItemHeading> {rev.user.name} </ListGroupItemHeading>
                        <ListGroupItemText> {rev.text}      </ListGroupItemText>

                        <p> {rev.rate} </p>
                        
            
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