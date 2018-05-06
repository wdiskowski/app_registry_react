import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { findClassDiagrammData } from './ClassDiagrammService';
import ClassDiagramm from './ClassDiagramm';


export default class ClassDiagrammTabView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classData: [],
            appId: this.props.appId,
            targetId: this.props.targetId,
            url: this.props.url
        }
    }

    render() {
        const tabs = this.state.classData.length < 2 ? '' :
            this.state.classData.map((classTabData, index) =>
                <Tab key={index}>{classTabData.name}</Tab>
            );

        const tabPanels = this.state.classData.length < 2 ? '' :
            this.state.classData.map((classTabData, index) =>
                <TabPanel key={index} >
                    <ClassDiagramm classData={classTabData} />
                </TabPanel>
            );


        return (
            this.state.classData.length < 2 ?
                <ClassDiagramm classData={this.state.classData.length > 0 ? this.state.classData[0] : {}} /> :
                <Tabs style={{ marginLeft: this.props.sideWidth }} selectedTabClassName={'w3-light-blue'}>
                    <TabList>
                        {tabs}
                    </TabList>
                    {tabPanels}
                </Tabs>);
    }

    componentDidMount() {
        this.loadclassData();
    }

    componentDidUpdate() {
        if (this.state.url !== this.props.url) {
            this.setState({ url: this.props.url });
            this.loadclassData();
        }
    }

    loadclassData() {
        return findClassDiagrammData(this.props.url,
            classData => this.setState({ classData })
        );
    }
}