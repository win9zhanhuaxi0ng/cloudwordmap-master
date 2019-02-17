import React from 'react'
import {Button, Card, Form} from 'react-bootstrap'
import WordCloudContainer from "./WordCloudContainer";
class TextCloud extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.reviews !== this.props.reviews) {
            this.setState({
                value:this.props.reviews
            })
        }
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
    }


    render() {
        return (
            <div>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control as="textarea" rows={this.props.row} value={this.state.value} onChange={this.handleChange} />
                </Form.Group>
            </Form>
                <Card border="success" style={{marginTop:20}}>
                    <WordCloudContainer reviews = {this.state.value}/>
                </Card>
            </div>
        );
    }
}
export default TextCloud