import React, {Component} from "react"
import MyWordCloud from  './MyWordCloud'


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '300',
    height: '100%',
    backgroundColor: '##f5f5f5',
    float: 'left'
  },

};

class WordCloudContainer extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return(
        <div style={styles.container}>

          <MyWordCloud reviews = {this.props.reviews} />

        </div>

    )
  }
}

export default WordCloudContainer
