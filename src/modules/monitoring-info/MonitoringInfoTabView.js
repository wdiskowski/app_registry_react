import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { findSlowestMethods, findExceptionalMethods } from './MonitoringInfoService';
import MonitoringInfo from './MonitoringInfo';


export default class MonitoringInfoTabView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            slowestMethods: [],
            exceptionalMethods: [],
            appId: this.props.appId,
            targetId: this.props.targetId,
            baseUrl: this.props.baseUrl,
            relativePath: this.props.relativePath
        }
    }

    render() {
        return (
            <Tabs style={{ marginLeft: this.props.sideWidth }} selectedTabClassName={'w3-light-blue'}>
                <TabList>
                    <Tab>Slowest</Tab>
                    <Tab>Exceptional</Tab>
                </TabList>
                <TabPanel>
                    <MonitoringInfo monitoringTabData={this.state.slowestMethods} />
                </TabPanel>
                <TabPanel>
                    <MonitoringInfo monitoringTabData={this.state.exceptionalMethods} />
                </TabPanel>
            </Tabs>
        );
    }

    componentDidMount() {
        this.loadMonitoringInfoData();
    }

    componentDidUpdate() {
        if (this.state.baseUrl !== this.props.baseUrl) {
            this.setState({ baseUrl: this.props.baseUrl, relativePath: this.props.relativePath });
            this.loadMonitoringInfoData();
        }
    }

    loadMonitoringInfoData() {
        if (this.props.relativePath) {
            if (this.props.relativePath.slowest) {
                findSlowestMethods(this.props.baseUrl + this.props.relativePath.slowest,
                    slowestMethods => this.setState({ slowestMethods })

                );
            }
            if (this.props.relativePath.exceptional) {
                findExceptionalMethods(this.props.baseUrl + this.props.relativePath.exceptional,
                    exceptionalMethods => this.setState({ exceptionalMethods })

                )
            }
        }
    }

}