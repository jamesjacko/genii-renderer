import React, { Component } from 'react';
import MURV, { Gene } from 'murv-component';
import Config from '../data/Config';
import queryString from 'query-string';
import canvg from 'canvg';

class Renderer extends Component {
    constructor(props) {
        super(props)
        let params = {
            shape: Gene.shape.BAR,
            color: Gene.color.FROM_DATA,
            color_key: Gene.color_key.OFF,
            path_points: Gene.path_points.EVEN,
            path_mode: Gene.path_mode.INLINE,
            path_rotation: Gene.path_rotation.NONE,
            path_grouping: Gene.path_grouping.NONE,
            object_rotation: Gene.object_rotation.NONE,
            object_size: Gene.object_size.FULL,
            filter: Gene.filter.OFF,
            debugging: Gene.debugging.OFF
        }
        this.gene = new Gene(params);
    }

    componentDidMount() {
        const values = queryString.parse(this.props.location.search)
        for (let index = 0; index < Object.keys(values).length; index++) {
            const key = Object.keys(values)[index];
            let value;
            if (!isNaN(key)) {
                value = parseInt(values[key]);
                this.gene[key] = value
            } else {
                value = values[key]
                this.gene[key] = Gene[key][value.toUpperCase()]
            }
        }
        this.setState({
            gene: this.gene,
        })
    }

    componentDidUpdate(){
        const svg = document.querySelector('.renderer svg');
        const canvas = document.createElement("canvas");
        const div = document.createElement("div");
        canvas.width = svg.clientWidth;
        canvas.height = svg.clientHeight;
        svg.parentNode.insertBefore(canvas, svg);
        svg.parentNode.removeChild(svg);
        div.appendChild(svg);
        canvg(canvas, div.innerHTML);
        var dataURL = canvas.toDataURL();
        console.log(dataURL)
    }

    render() {
        return (
            <div>
                {this.state === null ? "" : (
                    <div className="renderer">
                        <MURV config={Config} gene={this.state.gene} />
                    </div>
                )
                }
            </div>
        )
    }
}

export default Renderer;