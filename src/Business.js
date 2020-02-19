import React, { Component } from 'react'
import { BUSINESSES } from "./mock-business"
import { ListGroup, ListGroupItem, Media, CardImg,  Container, Row, Col  } from 'reactstrap';
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
    //GET https://api.yelp.com/v3/businesses/{id}/reviews
    
    componentDidMount() {
        // I will use fake api from jsonplaceholder website
        // this return 100 business 
        fetch("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=Alpharetta", 
         {
            //mode: 'no-cors', // 'cors' by default
            method: 'GET', 
            headers: {
                //'Content-Type': 'application/x-www-form-encoded',
                'Authorization': 'Bearer DOIkuu6qz2t-LyFO-8Z29oUmYtoIGLkLWdgY7GJIAPW2ZK7FkQMZ1RHvUS2MbbJN5i_MWEZGnMqnHs2iNSRnUsFg6SxncOcQ6u3ct96aw0XEjYIqvhUPqrlep8JIXnYx',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                //'Origin': '',
                //'Host': 'api.yelp.com',
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
                                    {bs.id}
                                </Col>

                                <Col md="8">
                                    
                                    <Media className="mt-1">
                                        <Media left middle href="#">
                                        </Media>
                                        <Media body>

                                            <Media heading>
                                                {bs.location.address1} , {bs.location.city}
                                                {bs.name}
                                            </Media>
                                            {bs.review_count} 
                                            <Link to = "/business/" {...bs.id } > See review </Link>

                                        </Media>
                                    </Media>
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
