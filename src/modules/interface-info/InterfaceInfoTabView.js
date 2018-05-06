import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { findInterfaceInfoData } from './InterfaceInfoService';
import InterfaceInfo from './InterfaceInfo';
import { sort } from '../../utils/PropertySorter';


export default class InterfaceInfoTabView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            interfaceInfoMultiData: [{interfaceInfoData:[]}],
            appId: this.props.appId,
            targetId: this.props.targetId,
            url: this.props.url
        }
    }

    render() {
        const tabs = this.state.interfaceInfoMultiData.length < 2 ? '' :
            this.state.interfaceInfoMultiData.map((interfaceInfoTabData, index) =>
                <Tab key={index}>{interfaceInfoTabData.name}</Tab>
            );

        const tabPanels = this.state.interfaceInfoMultiData.length < 2 ? '' :
            this.state.interfaceInfoMultiData.map((interfaceInfoTabData, index) =>
                <TabPanel key={index} >
                    <InterfaceInfo interfaceInfoData={sort(interfaceInfoTabData.interfaceInfoData, 'name')} />
                </TabPanel>
            );


        return (
            this.state.interfaceInfoMultiData.length < 2 ?
                <InterfaceInfo interfaceInfoData={this.state.interfaceInfoMultiData.length > 0 ? sort(this.state.interfaceInfoMultiData[0].interfaceInfoData, 'name') : {}} /> :
                <Tabs style={{ marginLeft: this.props.sideWidth }} selectedTabClassName={'w3-light-blue'}>
                    <TabList>
                        {tabs}
                    </TabList>
                    {tabPanels}
                </Tabs>);
    }

    componentDidMount() {
        this.loadInterfaceInfoData();
    }

    componentDidUpdate() {
        if (this.state.url !== this.props.url) {
            this.setState({ url: this.props.url });
            this.loadInterfaceInfoData();
        }
    }

    loadInterfaceInfoData() {
        return findInterfaceInfoData(this.props.url,
            data => this.setState({ 
                interfaceInfoMultiData: data.length > 0 && data[0].hasOwnProperty('interfaceInfoData') ? data : new Array({interfaceInfoData: data}) })
        );
    }


}