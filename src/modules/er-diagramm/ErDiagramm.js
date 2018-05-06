import React from 'react';
import nomnoml from 'nomnoml';
import { map } from './ErNomnomlMapper';


export default class ErDiagramm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            erData: this.props.erData,
            appId: this.props.appId,
            targetId: this.props.targetId
        }
    }

    render() {
        return (
            <div style={{width: 1250, height: 900, overflow:"auto"}}>
                <canvas style={{maxWidth: 1200}} ref={c => this._chart = c}></canvas>
            </div>
        );
    }

    componentDidMount() {
        nomnoml.draw(this._chart, map(this.state.erData));
    }

    componentDidUpdate() {
        if(this.state.erData !== this.props.erData) {
            this.setState({erData: this.props.erData});
            nomnoml.draw(this._chart, map(this.props.erData));
        }
    }

}