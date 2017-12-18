import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SiderCustom extends Component {
    state = {
        collapsed: false,
        mode: 'inline',
        openKey: '',
        selectedKey: '',
        firstHide: true,        // 点击收缩菜单，第一次隐藏展开子菜单，openMenu时恢复
    };
    componentDidMount() {
        this.setMenuOpen(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.onCollapse(nextProps.collapsed);
        this.setMenuOpen(nextProps)
    }
    setMenuOpen = props => {
        const {pathname} = props.location;
        this.setState({
            openKey: pathname.substr(0, pathname.lastIndexOf('/')),
            selectedKey: pathname
        });
    };
    onCollapse = (collapsed) => {
        this.setState({
            collapsed,
            firstHide: collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        });
    };
    menuClick = e => {
        this.setState({
            selectedKey: e.key
        });
        const { popoverHide } = this.props;     // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
        popoverHide && popoverHide();
    };
    openMenu = v => {
        console.log(v);
        this.setState({
            openKey: v[v.length - 1],
            firstHide: false,
        })
    };
    render() {
        return (
            <Sider
                trigger={null}
                breakpoint="lg"
                collapsed={this.props.collapsed}
                style={{overflowY: 'auto'}}
            >
                <div className="logo" style={{'color': 'white','fontSize': '20px','margin':'16px','backgroundColor':'#001529'}}>排队管理云端服务</div>
                <Menu
                    onClick={this.menuClick}
                    theme="dark"
                    mode="inline"
                    selectedKeys={[this.state.selectedKey]}
                    openKeys={this.state.firstHide ? null : [this.state.openKey]}
                    onOpenChange={this.openMenu}
                >
                    <SubMenu
                        key="/app/animation"
                        title={<span><Icon type="scan" /><span className="nav-text" style={{'fontSize':'15px'}}>门店管理</span></span>}
                    >

                        <Menu.Item key="/app/animation/exampleAnimations"><Link to={'/app/animation/exampleAnimations'}>门店基本信息</Link></Menu.Item>
                    </SubMenu>
                    <Menu.Item key="/app/dashboard/index">
                    <Link to={'/app/dashboard/index'}><Icon type="mobile" /><span className="nav-text" style={{'fontSize':'15px'}}>跨店排队信息分析</span></Link>
                    </Menu.Item>
                    <SubMenu
                        key="/app/report"
                        title={<span><Icon type="safety" /><span className="nav-text" style={{'fontSize':'15px'}}>单店报表分析</span></span>}
                    >
                        <Menu.Item key="/app/report/table"><Link to={'/app/report/table'}>单店报表</Link></Menu.Item>
                        <Menu.Item key="/app/report/analysis"><Link to={'/app/report/analysis'}>单店数据分析</Link></Menu.Item>
                    </SubMenu>
                </Menu>
                <style>
                    {`
                    #nprogress .spinner{
                        left: ${this.state.collapsed ? '70px' : '206px'};
                        right: 0 !important;
                    }
                    `}
                </style>
            </Sider>
        )
    }
}

export default withRouter(SiderCustom);