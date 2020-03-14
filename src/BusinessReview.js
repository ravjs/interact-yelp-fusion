import React from 'react';
import {  Container,  ListGroupItem, ListGroup, ListGroupItemHeading, ListGroupItemText, Card, CardImg, Row, Col,Button, 
CardText, CardTitle, CardBody} from 'reactstrap';
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
            business: null,
            reviews: [],
            id: null ,
        };
        

    }

    componentDidMount () {
       
        const { match: { params } } = this.props;

        console.log(" ID ==> " + params.userId);
        this.setState({ id: params.userId });
        
        //

        // GET BUSINESS INFOS
        async function getBusiness(id) {
            const config = {
                method: 'GET',
                url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}`,
                headers: { 
                    'Authorization': 'Bearer DOIkuu6qz2t-LyFO-8Z29oUmYtoIGLkLWdgY7GJIAPW2ZK7FkQMZ1RHvUS2MbbJN5i_MWEZGnMqnHs2iNSRnUsFg6SxncOcQ6u3ct96aw0XEjYIqvhUPqrlep8JIXnYx',
                }
            }
            let res = await axios(config)
            return res.data ;
        }
        
        getBusiness(params.userId)
        .then(
            // handle the result
            (result) => {
                this.setState({
                    //isLoaded : true,
                    business : result//.reviews
                })
                console.log(this.state.business);


                // For reviews
                getReviews(params.userId)
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

            } ,
            // Handle error 
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
                console.log('ERROR in getting the business');
                console.log(error);
            }
        )

        // GET REVIEWS OF THE BUSINESS
        async function getReviews(id) {
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
        
 

        /*
        axios.all([getBusiness(), getReviews()])
        .then(axios.spread(function (acct, perms) {
            // Both requests are now complete
            this.setState({
                isLoaded: true,
                error
            })

        }));

        */
       

    }

    

    render(){

        //this.setState( { id : useParams() });
        const {error, isLoaded, business, reviews, id} = this.state;

        if(error){
            return <div>Error in loading</div>
        }else if (!isLoaded) {
            return <div>Loading ...</div>
        }else{

            console.log(business.image_url) ; 
            //return true;
            return (
                <div>

                    <Container>

                    <Link to = {`/business/`} > Go back on business </Link>

                
                <h3> Reviews of {this.state.business.name}  </h3>
                <Row>

                    <Col md="3"> 
                        <Card> 
                            <CardImg top width="100%" src={business.image_url} alt="Card image for " />
                        </Card> 
                    </Col>

                    <Col md="9">
                        <h3> Name: {business.name} </h3>

                        <p> Location: {business.location.address1} , {business.location.city} </p>
                        <p> Reviews : {business.review_count} </p>
                        
                    </Col>

                </Row>
               
            
            
            <h3> Restaurants in Alpharetta </h3>
            

            {
            
                reviews.map(rev => (
            
                    <Row>

                        <Col md="4" key={rev.id}>
                        
                            <Card sm="12" >
                                <CardImg top width="100%" src={rev.user.image_url}  alt="Card image cap" />
                                <CardBody>
                                    <CardTitle> {rev.user.name}  </CardTitle>
                                    <CardText>{rev.text} </CardText>
                                    <CardText>
                                        <small className="">{rev.rate}</small>
                                    </CardText>
                                </CardBody>
                            </Card>
                        </Col>

                    </Row>
                ))
            }



            </Container>
            
           

            </div> 
            
             ) 
        }

        

    
   
    };
}

export default BusinessReview;