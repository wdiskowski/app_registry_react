import React from 'react';
import nomnoml from 'nomnoml';
import { map } from './ClassNomnomlMapper';


export default class ClassDiagramm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classData: this.props.classData,
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
        nomnoml.draw(this._chart, map(this.state.classData));
    }

    componentDidUpdate() {
        if(this.state.classData !== this.props.classData) {
            this.setState({classData: this.props.classData});
            nomnoml.draw(this._chart, map(this.props.classData));
        }
    }

}