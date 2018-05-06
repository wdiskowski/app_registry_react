import React from 'react';
import { abbreviate } from '../../utils/StringUtils';

export default class LogInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            logInfoData: []
        }
    }

    render() {

        const body = this.state.logInfoData.map(
            logItem =>
                <tr key={logItem.key}>
                    <td title = {logItem.key}>{abbreviate(logItem.key, 30)}</td>
                    <td title = {logItem.value}>{abbreviate(logItem.value, 140)}</td>
                </tr>
        )

        return (
            <table className="w3-table-all">
                <thead>
                    <tr className="w3-light-grey">
                        <th>Name</th>
                        <th>Path</th>
                    </tr>
                </thead>
                <tbody>
                    {body}
                </tbody>
            </table>
        );
    }

    componentDidMount() {
        if(this.state.logInfoData !== this.props.logInfoData) {
            this.setState({logInfoData: this.props.logInfoData})
        }
    }

    componentDidUpdate() {
        if(this.state.logInfoData !== this.props.logInfoData) {
            this.setState({logInfoData: this.props.logInfoData})
        }
    }
}