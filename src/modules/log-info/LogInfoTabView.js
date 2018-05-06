import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { findLogInfoData } from './LogInfoService';
import LogInfo from './LogInfo';
import { sort } from '../../utils/PropertySorter';


export default class LogInfoTabView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            logInfoMultiData: [{logInfoData:[]}],
            appId: this.props.appId,
            targetId: this.props.targetId,
            url: this.props.url
        }
    }

    render() {
        const tabs = this.state.logInfoMultiData.length < 2 ? '' :
            this.state.logInfoMultiData.map((logInfoTabData, index) =>
                <Tab key={index}>{logInfoTabData.name}</Tab>
            );

        const tabPanels = this.state.logInfoMultiData.length < 2 ? '' :
            this.state.logInfoMultiData.map((logInfoTabData, index) =>
                <TabPanel key={index} >
                    <LogInfo logInfoData={sort(logInfoTabData.logInfoData, 'key')} />
                </TabPanel>
            );


        return (
            this.state.logInfoMultiData.length < 2 ?
                <LogInfo logInfoData={this.state.logInfoMultiData.length > 0 ? sort(this.state.logInfoMultiData[0].logInfoData, 'key') : {}} /> :
                <Tabs style={{ marginLeft: this.props.sideWidth }} selectedTabClassName={'w3-light-blue'}>
                    <TabList>
                        {tabs}
                    </TabList>
                    {tabPanels}
                </Tabs>);
    }

    componentDidMount() {
        this.loadLogInfoData();
    }

    componentDidUpdate() {
        if (this.state.url !== this.props.url) {
            this.setState({ url: this.props.url });
            this.loadLogInfoData();
        }
    }

    loadLogInfoData() {
        return findLogInfoData(this.props.url,
            data => this.setState({ 
                logInfoMultiData: data.length > 0 && data[0].hasOwnProperty('logInfoData') ? data : new Array({logInfoData: data}) })
        );
    }


}