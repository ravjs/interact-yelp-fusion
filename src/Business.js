import React, { Component } from 'react'
import { BUSINESSES } from "./mock-business"
import { CardImg,  Container, Row, Col  } from 'reactstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useParams
  } from "react-router-dom";

export class business extends Component {
    constructor(props){
        super(props);
        this.state = {
            error : null,
            isLoaded : false,
            business : []        
        };
    }
    
    componentDidMount() {
        // CORS not support by the API
        fetch("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=Alpharetta", 
         {
            method: 'GET', 
            headers: {
                //'Content-Type': 'application/x-www-form-encoded',
                'Authorization': 'Bearer DOIkuu6qz2t-LyFO-8Z29oUmYtoIGLkLWdgY7GJIAPW2ZK7FkQMZ1RHvUS2MbbJN5i_MWEZGnMqnHs2iNSRnUsFg6SxncOcQ6u3ct96aw0XEjYIqvhUPqrlep8JIXnYx',
               
                'Accept' : '*/*',
                'Access-Control-Allow-Origin': '*'

            },

        })
        .then( response => response.json() )

        .then(
            // handle the result
             (result) => {
                this.setState({
                    isLoaded : true,
                    business : result //businesses
                })
                console.log(result.businesses);
            } ,
            // Handle error 
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
                console.log('ERROR');
                console.log(error);
            },
        )
    }
    
    
    render() {

        
        let ListBusiness = [];
        ListBusiness = BUSINESSES.businesses;
        console.log("BB" + ListBusiness);


        const {error, isLoaded, business} = this.state;
        if(error){
            return <div>Error in loading</div>
        }else if (!isLoaded) {
            return <div>Loading ...</div>
        }else{

            return(
                <Container>
                     <h3> Restaurants in Alpharetta </h3>
                    
                   
                    {
                        business.businesses.map(bs => (
                            <Row key={bs.id}  >

                                <Col md="4"> 
                                    <CardImg top width="200" src={bs.image_url} alt="Card image cap" />
                                   
                                </Col>

                                <Col md="8">
                                    
                                    <p> {bs.location.address1} , {bs.location.city} </p>
                                    <p> {bs.name} </p>
                                    <p> {bs.review_count} </p>
                                    <Link to = {`/business/${bs.id}`} > See review </Link>
       
                                </Col>

                            </Row>
                            
                           
                        ))
                    }
                </Container>
            );
        }    

        
    }

    
    
}

export default business
