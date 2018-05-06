import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { findErDiagrammData } from './ErDiagrammService';
import ErDiagramm from './ErDiagramm';


export default class ErDiagrammTabView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            erData: [],
            appId: this.props.appId,
            targetId: this.props.targetId,
            url: this.props.url
        }
    }

    render() {
        const tabs = this.state.erData.length < 2 ? '' :
            this.state.erData.map((erTabData, index) =>
                <Tab key={index}>{erTabData.name}</Tab>
            );

        const tabPanels = this.state.erData.length < 2 ? '' :
            this.state.erData.map((erTabData, index) =>
                <TabPanel key={index} >
                    <ErDiagramm erData={erTabData} />
                </TabPanel>
            );


        return (
            this.state.erData.length < 2 ?
                <ErDiagramm erData={this.state.erData.length > 0 ? this.state.erData[0] : {}} /> :
                <Tabs style={{ marginLeft: this.props.sideWidth }} selectedTabClassName={'w3-light-blue'}>
                    <TabList>
                        {tabs}
                    </TabList>
                    {tabPanels}
                </Tabs>);
    }

    componentDidMount() {
        this.loadErData();
    }

    componentDidUpdate() {
        if (this.state.url !== this.props.url) {
            this.setState({ url: this.props.url });
            this.loadErData();
        }
    }

    loadErData() {
        return findErDiagrammData(this.props.url,
            erData => this.setState({ erData })
        );
    }
}