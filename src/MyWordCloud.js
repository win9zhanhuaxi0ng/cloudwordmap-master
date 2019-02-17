import React from 'react';
import ReactWordCloud from 'react-wordcloud';
import ResizeAware from '../node_modules/react-resize-aware';

const excludedWords = ['come', 'get', 'give', 'go', 'keep', 'let', 'make', 'put', 'seem', 'take',
        'be', 'do', 'have', 'say', 'see', 'send', 'may', 'will', 'about', 'across', 'after', 'against', 'among',
        'at', 'before', 'between', 'by, down', 'from', 'in', 'off', 'on', 'over', 'throught','to', 'under', 'up',
        'with', 'as', 'for', 'of', 'till', 'than', 'a', 'the', 'all', 'any', 'every', 'no', 'other', 'some', 'such',
        'that', 'this', 'I', 'he', 'you', 'who', 'and', 'because', 'but', 'or', 'if', 'though', 'while', 'how', 'when',
        'where', 'why', 'again', 'ever', 'far', 'forward', 'here', 'near', 'now', 'out', 'still', 'then', 'there', 'together',
        'well', 'almost', 'enough', 'even', 'little', 'much', 'not', 'only', 'quite', 'so', 'very', 'tomorrow', 'yesterday', 'north',
        'south', 'east', 'west', 'please', 'yes','are','is','it','an','was'];

    class MyWordCloud extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            word:[],
            WORD_KEY: 'word',
            fontFamily: 'helvetica',
            WORD_COUNT_KEY: 'value',
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.reviews !== this.props.reviews) {
            let tempWords = this.props.reviews.split(' ')
            if(tempWords != null) {
                let word = tempWords.filter(word => excludedWords.indexOf(word) === -1)
                this.extractKeyword(word)
            }
        }
    }

    extractKeyword(words){
        var temp = new Map();
        var arrayLength = words.length;
        for (var i = 0; i < arrayLength; i++) {
            if(temp.has(words[i])){
                temp.set(words[i],temp.get(words[i])+1);
            }else{
                temp.set(words[i],1);
            }
        }
        var finalWord = [];
        temp.forEach(function(v, key) {
            finalWord.push({word:key,value:v})
        });
        console.log(finalWord)
        this.setState({
            word : finalWord
        })
    }
    render(){
        return (
            <ResizeAware>
                {size => {
                    const width = size.width || 400; // default width
                    const height = 350; // 5:3 ratio
                    return (
                        <ReactWordCloud
                            fontFamily={this.state.fontFamily}
                            height={height}
                            maxWords={'100'}
                            orientationAngles={'20'}
                            scale={'sqrt'}
                            spiral={'rectangular'}
                            tooltipEnabled={'false'}
                            transitionDuration={'250'}
                            width={width || 400}
                            words={this.state.word}
                            wordCountKey={this.state.WORD_COUNT_KEY}
                            wordKey={this.state.WORD_KEY}
                        />
                    );
                }}
            </ResizeAware>
        );
    }

};

export default MyWordCloud;