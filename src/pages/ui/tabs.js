import React from 'react'
import {Card, Button,Tabs, message, Icon} from 'antd'
import './ui.less'
const TabPane = Tabs.TabPane;
export default class Tab extends React.Component{

    newTabIndex = 0;

    handleCallback = (key)=>{
        message.info("您选择了页面标签"+key);
    }

    componentWillMount(){
        const panes = [
            {
                title:'tab 1',
                content:'tab 1',
                key:'1'
            },
            {
                title:'tab 2',
                content:'tab 2',
                key:'2'
            },
            {
                title:'tab 3',
                content:'tab 3',
                key:'3'
            }
        ];
        this.setState({
            panes,
            activekey:panes[0].key
        });
    }

    onChange = (activekey)=>{
        this.setState({
            activekey
        })
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: activeKey, content: 'New Tab Pane', key: activeKey });
        this.setState({ panes, activeKey });
    };
    
    remove = targetKey => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
          if (lastIndex >= 0) {
            activeKey = panes[lastIndex].key;
          } else {
            activeKey = panes[0].key;
          }
        }
        this.setState({ panes, activeKey });
    };

    render(){
        return(
            <div>
                <Card title="Tab页签" className="card-wrap">
                    <Tabs defaultActiveKey='1' onChange={this.handleCallback}>
                        <TabPane tab="Tab 1" key="1">
                            Content of Tab Pane 1
                        </TabPane>
                        <TabPane tab="Tab 2" key="2" disabled> 
                            Content of Tab Pane 2
                        </TabPane>
                        <TabPane tab="Tab 3" key="3">
                            Content of Tab Pane 3
                        </TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab带图的页签" className="card-wrap">
                    <Tabs defaultActiveKey='1' onChange={this.handleCallback}>
                        <TabPane tab={<span><Icon type="plus"/>Tab 1</span>} key="1" >
                            Content of Tab Pane 1
                        </TabPane>
                        <TabPane tab={<span><Icon type="delete"/>Tab 1</span>} key="2">
                            Content of Tab Pane 2
                        </TabPane>
                        <TabPane tab={<span><Icon type="edit"/>Tab 1</span>} key="3">
                            Content of Tab Pane 3
                        </TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab页签增加/删除" className="card-wrap">
                    <Tabs 
                        // defaultActiveKey='1'
                        onChange={this.handleCallback} 
                        type="editable-card"
                        onChange={this.onChange}
                        activekey={this.state.activekey}
                        onEdit={this.onEdit}
                    >
                        {
                            this.state.panes.map((panel)=>{
                                return <TabPane
                                    tab={panel.title}
                                    key={panel.key}

                                >
                                {panel.content}
                                </TabPane>
                            })
                        }
                    </Tabs>
                </Card>
            </div>
        );
    }
}