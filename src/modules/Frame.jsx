import React from 'react';
import { Layout } from 'antd';
import ZZHeader from 'Comps/zzHeader/zzHeader';
import ZZLeftSide from 'Comps/zzLeftSide/zzLeftSide';
import ZZFooter from 'Comps/zzFooter/zzFooter';

export default class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            collapsed: false,
        };

        this.switchCollapsed = this.switchCollapsed.bind(this);
    }

    switchCollapsed = (collapsed) => {
        console.log('switchCollapsed collapsed   ==== ', collapsed);
        this.setState({
            collapsed,
        });
    }

    render() {
        let { collapsed } = this.state;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <ZZLeftSide collapsed={collapsed} />
                <Layout>
                    <ZZHeader switchCollapsed={this.switchCollapsed} collapsed={collapsed} />
                    <div>
                        {this.props.children}
                    </div>
                    <ZZFooter />
                </Layout>
            </Layout>
        );
    }
}