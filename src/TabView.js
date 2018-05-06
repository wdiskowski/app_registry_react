import React from "react";
import ErDiagrammTabView from './modules/er-diagramm/ErDiagrammTabView';
import ConfigInfoTabView from './modules/config-info/ConfigInfoTabView';
import ReleaseInfoTabView from './modules/release-info/ReleaseInfoTabView';
import LogInfoTabView from './modules/log-info/LogInfoTabView';
import InterfaceInfoTabView from './modules/interface-info/InterfaceInfoTabView';
import MonitoringInfoTabView from './modules/monitoring-info/MonitoringInfoTabView';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { findUrl } from './services/ConfigService';
import { findRegistryData } from './services/RegistryService';



export default class TabView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
            baseUrl: "",
            registryData: {},
            appId: this.props.appId,
            targetId: this.props.targetId
        }
    }
    render() {
        return (
            <Tabs style={{ marginLeft: this.props.sideWidth }} selectedTabClassName='w3-light-blue' selectedIndex={this.state.tabIndex}
                onSelect={tabIndex => this.setState({ tabIndex })}>
                <TabList>
                    <Tab>Release Info</Tab>
                    <Tab disabled={!this.state.registryData.configInfo}>Config Info</Tab>
                    <Tab disabled={!this.state.registryData.logInfo}>Log Info</Tab>
                    <Tab disabled={!this.state.registryData.interfaceInfo}>Interface Info</Tab>
                    <Tab disabled={!this.state.registryData.monitoringInfo}>Monitoring Info</Tab>
                    <Tab disabled={!this.state.registryData.erDiagramm}>ER Diagramm</Tab>
                    <Tab disabled={!this.state.registryData.classDiagramm}>Class Diagramm</Tab>
                    <sup>{this.props.appId} ({this.props.targetId})</sup>
                </TabList>
                <TabPanel>
                    <ReleaseInfoTabView appId={this.props.appId} targetId={this.props.targetId} 
                        url={this.state.baseUrl + (this.state.registryData.releaseInfo ? this.state.registryData.releaseInfo : "")} />
                </TabPanel>
                <TabPanel>
                    <ConfigInfoTabView appId={this.props.appId} targetId={this.props.targetId} 
                        url={this.state.baseUrl + (this.state.registryData.configInfo ? this.state.registryData.configInfo : "")} />
                </TabPanel>
                <TabPanel>
                    <LogInfoTabView appId={this.props.appId} targetId={this.props.targetId} 
                        url={this.state.baseUrl + (this.state.registryData.logInfo ? this.state.registryData.logInfo : "")} />
                </TabPanel>
                <TabPanel>
                    <InterfaceInfoTabView appId={this.props.appId} targetId={this.props.targetId} 
                        url={this.state.baseUrl + (this.state.registryData.interfaceInfo ? this.state.registryData.interfaceInfo : "")} />
                </TabPanel>
                <TabPanel>
                    <MonitoringInfoTabView appId={this.props.appId} targetId={this.props.targetId} 
                        baseUrl={this.state.baseUrl} relativePath={(this.state.registryData.monitoringInfo ? this.state.registryData.monitoringInfo : {})} />
                </TabPanel>
                <TabPanel>
                    <ErDiagrammTabView appId={this.props.appId} targetId={this.props.targetId} 
                        url={this.state.baseUrl + (this.state.registryData.erDiagramm ? this.state.registryData.erDiagramm : "")} />
                </TabPanel>
                <TabPanel>
                    <h2>Class Diagramm</h2>
                </TabPanel>
            </Tabs>
        )
    }

    componentDidUpdate() {
        let { appId, targetId } = this.props;
        if (appId !== this.state.appId || targetId !== this.state.targetId) {
            this.setState({ appId, targetId, tabIndex: 0 })
            this.loadRegistryData();
        }
    }

    componentDidMount() {
        this.loadRegistryData();
    }

    loadRegistryData() {
        return findUrl(this.props.appId, this.props.targetId,
            baseUrl => {
                this.setState({baseUrl});
                findRegistryData(baseUrl + "/registry",
                    registryData => this.setState({ registryData })
                );
            }
        );
    }

}

