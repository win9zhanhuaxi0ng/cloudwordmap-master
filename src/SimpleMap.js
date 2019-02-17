import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import {MAP} from 'react-google-maps/lib/constants'
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
import WordCloudContainer from "./WordCloudContainer";
import {Container, Row, Col, Card,Badge} from "react-bootstrap"
import TextCloud from "./TextCloud";
import Speech from "./Speech";
Geocode.setApiKey( "AIzaSyCmFNlFFhjIwFmiDo7P8h6Yb0gGCN2Tazs" );
Geocode.enableDebug();

const google = window.google
const GoogleMapExample = withGoogleMap(props => (
    <GoogleMap
        ref={props.onMapLoad}
        center = {props.center}
        defaultZoom = { 15 }
        onClick={props.handleClickedMap}
    >
        <Autocomplete
            style={{
                width: '100%',
                height: '40px',
                paddingLeft: '16px',
                marginTop: '2px',
                marginBottom: '100px'
            }}
            onPlaceSelected={ props.onPlaceSelected }
            types={['(regions)']}
        />
    </GoogleMap>
));
class Map extends Component {
    constructor( props ){
        super( props );
        this.state = {
            address: '',
            city: '',
            area: '',
            state: '',
            placeId:'',
            reviews:'',
            lat: 40.904146,
            lng: -73.132052,
            data: [],
        }
    }
    handleClickedMap = (e) => {
        let newLat = e.latLng.lat(),
            newLng = e.latLng.lng();
        let that = this._map
        let other = this
        Geocode.fromLatLng( newLat , newLng ).then(
            response => {
                const placeId =  response.results[0].place_id
                this.setState( {
                    placeId:(placeId) ? placeId : '',
                    lat:newLat,
                    lng:newLng
                },()=>{
                    var request = {
                        placeId: this.state.placeId,
                        fields: ['review']
                    };
                    var service = new google.maps.places.PlacesService(that.context[MAP]);
                    service.getDetails(request, function(place, status) {
                        let str = '';
                        if(place.reviews!=null) {
                            for (let i = 0; i < place.reviews.length; i++) {
                                str += place.reviews[i].text + ' '
                            }
                        }else{
                            str = "This place does not have any review, Please choose other place"
                        }
                        other.setState({
                            reviews:str
                        })
                    })
                } )
            },
            error => {
                console.error(error);
            }
        );
    }
    onMapLoad = (map) => {
        this._map = map;
    }
    onPlaceSelected = ( place ) => {
        console.log( 'plc', place );
        const
            latValue = place.geometry.location.lat(),
            lngValue = place.geometry.location.lng(),
            placeId =  place.place_id;
        // Set these values in the state.
        this.setState({
            placeId:(placeId) ? placeId : '',
            lat:latValue,
            lng:lngValue
        })
    };
    render() {
        return(
            <Container>
                <Row  className="justify-content-md-center">
                    <Card className="text-center" bg="secondary" text="white" style={{ width: '50rem' }}>
                        <Card.Header> <h1><Badge variant="secondary">Word Cloud</Badge>
                        </h1></Card.Header>
                        <Card.Body>
                            <Card.Title>Map Reviews</Card.Title>
                            <Card.Text>
                                Click the place in the map, too see all the reviews, and the keyword generated in the word cloud.
                            </Card.Text>
                        </Card.Body>
                    </Card>;
                </Row>
                <Row>
                    <div style={{margin: 20 }}/>
                </Row>
                <Row>
                <Col sm={4}>
                    <TextCloud reviews = {this.state.reviews} row = {11}/>
                </Col>
                    <Col>
                        <div style={{margin: 10 }}/>
                    </Col>
                <Col sm={7}>
                    <Card border="light">
                    <div>
                    <GoogleMapExample
                        onMapLoad = {this.onMapLoad}
                        handleClickedMap = {this.handleClickedMap}
                        center = { {lat: this.state.lat, lng: this.state.lng}}
                        onPlaceSelected = {this.onPlaceSelected}
                    containerElement={ <div style={{ height: `600px`, width: '700px' }} /> }
                    mapElement={ <div style={{ height: `100%` }} /> }
                    />
                    </div>
                    </Card>
                </Col>
                </Row>
                <Row>
                    <div style={{margin: 20 }}/>
                </Row>
                <Row  className="justify-content-md-center">
                    <Card className="text-center" bg="secondary" text="white" style={{ width: '50rem' }}>
                        <Card.Header><h1><Badge variant="secondary">Speech To Text</Badge>
                        </h1></Card.Header>
                        <Card.Body>
                            <Card.Title>Word Cloud</Card.Title>
                            <Card.Text>
                                press record button to start record your voice, it will generate the word cloud dynamically, press button again to stop recording.
                                Note: you can also type into textarea
                            </Card.Text>
                        </Card.Body>
                    </Card>;
                </Row>
                <Row>
                    <div style={{margin: 20 }}/>
                </Row>
                <Row>
                    <Col>
                        <Speech/>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default Map;