import React from 'react';
import { abbreviate } from '../../utils/StringUtils';

export default class ConfigInfo extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = {
            configInfoData: []
        }
    }

    render() {

        const body = this.state.configInfoData.map(
            configItem =>
                <tr key={configItem.key}>
                    <td title={configItem.key}>{abbreviate(configItem.key, 30)}</td>
                    <td title={configItem.value}>{abbreviate(configItem.value, 140)}</td>
                </tr>
        )

        return (
            <table className="w3-table-all">
                <thead>
                    <tr className="w3-light-grey">
                        <th>Property</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {body}
                </tbody>
            </table>
        );
    }

    componentDidMount() {
        if(this.state.configInfoData !== this.props.configInfoData) {
            this.setState({configInfoData: this.props.configInfoData})
        }
    }

    componentDidUpdate() {
        if(this.state.configInfoData !== this.props.configInfoData) {
            this.setState({configInfoData: this.props.configInfoData})
        }
    }

}