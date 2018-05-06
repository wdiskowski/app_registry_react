import React from 'react';
import { abbreviate } from '../../utils/StringUtils';

export default class InterfaceInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            interfaceInfoData: []
        }
    }

    render() {

        const body = this.state.interfaceInfoData.map(
            interfaceItem =>
                <tr key={interfaceItem.name}>
                    <td title = {interfaceItem.description}>{abbreviate(interfaceItem.name, 30)}</td>
                    <td title = {interfaceItem.url}>{abbreviate(interfaceItem.url, 140)}</td>
                </tr>
        )

        return (
            <table className="w3-table-all">
                <thead>
                    <tr className="w3-light-grey">
                        <th>Name</th>
                        <th>URL</th>
                    </tr>
                </thead>
                <tbody>
                    {body}
                </tbody>
            </table>
        );
    }

    componentDidMount() {
        if(this.state.interfaceInfoData !== this.props.interfaceInfoData) {
            this.setState({interfaceInfoData: this.props.interfaceInfoData})
        }
    }

    componentDidUpdate() {
        if(this.state.interfaceInfoData !== this.props.interfaceInfoData) {
            this.setState({interfaceInfoData: this.props.interfaceInfoData})
        }
    }

}