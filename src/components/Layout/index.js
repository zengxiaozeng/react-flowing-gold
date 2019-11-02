import React, { Component } from 'react'
import ContentMain from '@/components/Layout/ContentMain'
import SliderNav from  '@/components/Layout/SliderNav'
import { Layout } from 'antd'

const { Content, Sider } = Layout;

class IndexLayout extends Component {

    render() {
        return (
            <Layout>
                <Sider
                    collapsible
                    trigger={null}
                >
                    <SliderNav/>
                </Sider>
                <Layout>
                    <Content style={{background: '#f7f7f7'}}>
                        <ContentMain/>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default IndexLayout
