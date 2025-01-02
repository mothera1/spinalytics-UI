import React from "react";
import { Component } from "react";

const metadata = {
  Artists : {url: "https://yd4fvv7sik.execute-api.us-east-2.amazonaws.com/prod/artists", title : "Artist"},
  Genres : {url: "https://yd4fvv7sik.execute-api.us-east-2.amazonaws.com/prod/genres", title : "Genre"},
  Songs : {url: "https://yd4fvv7sik.execute-api.us-east-2.amazonaws.com/prod/songs", title : "Song"}
}


class TopTen extends Component {
    state = {
        targetShow : "",
        toptentype : "Artists",
        data : []
    }
    
    constructor(props) {
        super(props);
        this.state = {
            toptentype : props.toptentype,
            targetShow : props.targetShow,
            data : []
        }
    }

    componentDidUpdate(prevProps, prevState,  snapshot) {
        if (prevState.targetShow !== this.state.targetShow) {
            console.log("New Show Selected:" + this.state.targetShow)
            if (this.state.toptentype.length > 0){
                //console.log("New Url" + metadata[this.state.toptentype].url)
            }
            
            this.getContent()
        }
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps)
        this.setState({targetShow : newProps.targetShow})
    }


    getContent() {
        console.log(this.state.targetShow)
        if (this.state.targetShow.length === 0) {
            console.log("No Show")
            return
        }
        
        const headers = { 'x-api-key': process.env.REACT_APP_SPIN_QUERY };
        /*
        const params = { show : this.state.targetShow}
        const encodedParams = new URLSearchParams();
        for (const [key, value] of Object.entries(params)) {
            encodedParams.append(key, encodeURIComponent(value))
        }
        console.log(encodedParams)
        
        const url = metadata[this.state.toptentype].url + "?" + encodedParams.toString()
        console.log(url)
        */
        try {
            var url = new URL(metadata[this.state.toptentype].url),
            params = {show : this.state.targetShow}
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
            fetch(
                url,
                {
                    method: 'GET',
                    headers,
                }
            )
                .then(response => response.json())
                .then(json => {
                console.log(json);
                console.log(headers);
                var lst = json.results
                    this.setState(() => {
                        return {
                            data : lst
                        };
                      
                    });
                    
                });
        } catch (error) {
            console.log('Error: ' + error);
        }
      }
    

    componentDidMount() {}

    componentWillUnmount() {}


    render() {
        return (
            <div className="TopTen">
                <table className="toptentable-body">
                    <thead>
                        <tr>
                            <td className="title-header"> {metadata[this.state.toptentype].title} </td>
                            <td> count</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((columns, index) => (
                            <tr key={columns[0]}>
                                {columns.map((column, column_index) => (
                                    <td className="toptendata" key={columns[0] + column_index}> 
                                        {column}
                                    </td>
                                ))}
                            
                            </tr>
                        ))}
                    
                    </tbody>
                </table>
            </div>
        )
    }

}

TopTen.defaultProps = {
    targetShow : "",
    toptentype : "Artists"
}

export default TopTen