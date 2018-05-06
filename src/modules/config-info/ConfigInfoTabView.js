import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { findConfigInfoData } from './ConfigInfoService';
import ConfigInfo from './ConfigInfo';
import { sort } from '../../utils/PropertySorter';


export default class ConfigInfoTabView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            configInfoMultiData: [{configInfoData:[]}],
            appId: this.props.appId,
            targetId: this.props.targetId,
            url: this.props.url
        }
    }

    render() {
        const tabs = this.state.configInfoMultiData.length < 2 ? '' :
            this.state.configInfoMultiData.map((configInfoTabData, index) =>
                <Tab key={index}>{configInfoTabData.name}</Tab>
            );

        const tabPanels = this.state.configInfoMultiData.length < 2 ? '' :
            this.state.configInfoMultiData.map((configInfoTabData, index) =>
                <TabPanel key={index} >
                    <ConfigInfo configInfoData={sort(configInfoTabData.configInfoData, 'key')} />
                </TabPanel>
            );


        return (
            this.state.configInfoMultiData.length < 2 ?
                <ConfigInfo configInfoData={this.state.configInfoMultiData.length > 0 ? sort(this.state.configInfoMultiData[0].configInfoData, 'key') : {}} /> :
                <Tabs style={{ marginLeft: this.props.sideWidth }} selectedTabClassName={'w3-light-blue'}>
                    <TabList>
                        {tabs}
                    </TabList>
                    {tabPanels}
                </Tabs>);
    }

    componentDidMount() {
        this.loadConfigInfoData();
    }

    componentDidUpdate() {
        if (this.state.url !== this.props.url) {
            this.setState({ url: this.props.url });
            this.loadConfigInfoData();
        }
    }

    loadConfigInfoData() {
        return findConfigInfoData(this.props.url,
            data => this.setState({ 
                configInfoMultiData: data.length > 0 && data[0].hasOwnProperty('configInfoData') ? data : new Array({configInfoData: data}) })
        );
    }


}