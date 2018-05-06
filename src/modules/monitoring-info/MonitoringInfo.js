import React from 'react';
import Time from 'react-time-format'
import { abbreviate } from '../../utils/StringUtils';

export default class MonitoringInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            monitoringTabData: this.props.monitoringTabData
        }
    }

    render() {

        const body = this.state.monitoringTabData ? this.state.monitoringTabData.map(
            monitoringItem =>
                (

                <tr key={monitoringItem.methodName}>
                    <td title={monitoringItem.methodName} style={{width: "20%"}}>{this.extractMethodName(monitoringItem.methodName)}</td>
                    <td>{monitoringItem.maxDuration}</td>
                    <td>{monitoringItem.averageDuration}</td>
                    <td>{monitoringItem.recentDuration}</td>
                    <td>{monitoringItem.numberOfExceptions}</td>
                    <td>{monitoringItem.numberOfInvocations}</td>
                    <td title={monitoringItem.exception}>{this.extractExceptionName(monitoringItem.exception)}</td>
                    <td>
                        <Time value={new Date(monitoringItem.lastInvocationTimestamp)} format="DD.MM.YYYY hh:mm:ss" />
                    </td>
                </tr>
                )
        ) : <tr />;

        return (
            <table className="w3-table-all">
                <thead>
                    <tr className="w3-light-grey">
                        <th rowSpan={2} style={{textAlign: "center"}}>Method</th>
                        <th colSpan={3} style={{textAlign: "center"}}>Duration (ms)</th>
                        <th colSpan={2} style={{textAlign: "center"}}>Number of</th>
                        <th rowSpan={2} style={{textAlign: "center"}}>Exception</th>
                        <th rowSpan={2} style={{textAlign: "center"}}>Last invocation</th>
                    </tr>
                    <tr className="w3-light-grey">
                        <th style={{textAlign: "center"}}>max</th>
                        <th style={{textAlign: "center"}}>average</th>
                        <th style={{textAlign: "center"}}>recent</th>
                        <th style={{textAlign: "center"}}>exceptions</th>
                        <th style={{textAlign: "center"}}>invocations</th>
                    </tr>
                </thead>
                <tbody>
                    {body}
                </tbody>
            </table>
        );
    }

    componentDidUpdate() {
        if(this.state.monitoringTabData !== this.props.monitoringTabData) {
            this.setState({monitoringTabData: this.props.monitoringTabData})
        }
    }

    extractMethodName(methodNameFull) {
        let calculated = '';
        if(methodNameFull) {
            let matches = methodNameFull.match('(?=.)\\w+(?=\\()');
            if(matches) {
                calculated = abbreviate(matches[0], 40);
            } else {
                calculated = abbreviate(methodNameFull, 40);
            }
        }
        return calculated;
    }

    extractExceptionName(exceptionFull) {
        let calculated = '';
        if(exceptionFull) {
            let matches = exceptionFull.match('(?=.)\\w+(?=:)');
            if(matches) {
                calculated = abbreviate(matches[0], 40);
            } else {
                calculated = abbreviate(exceptionFull, 40);
            }
        }
        return calculated;
    }    
}