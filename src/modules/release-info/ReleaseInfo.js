import React from 'react';
import Time from 'react-time-format'
import { findReleaseInfoData } from './ReleaseInfoService';

export default class ReleaseInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            releaseInfoData: {}
        }
    }

    render() {

        return (
            <table className="w3-table-all">
                <thead>
                    <tr className="w3-light-grey">
                        <th>Property</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>projekt</td>
                    <td>{this.state.releaseInfoData.projekt}</td>
                </tr>
                <tr>
                    <td>version</td>
                    <td>{this.state.releaseInfoData.version}</td>
                </tr>
                <tr>
                    <td>buildDate</td>
                    <td>
                        <Time value={this.state.releaseInfoData.buildDate ? new Date(this.state.releaseInfoData.buildDate) : null} format="DD.MM.YYYY hh:mm:ss" />
                    </td>
                </tr>
            </tbody>
            </table>
        );
    }

    componentDidMount() {
        if(this.state.releaseInfoData !== this.props.releaseInfoData) {
            this.setState({releaseInfoData: this.props.releaseInfoData})
        }
    }

    componentDidUpdate() {
        if(this.state.releaseInfoData !== this.props.releaseInfoData) {
            this.setState({releaseInfoData: this.props.releaseInfoData})
        }
    }

}