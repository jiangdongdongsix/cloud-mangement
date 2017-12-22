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

                    <Menu.Item key="/app/dashboard">
                        <span className="nav-text" style={{'fontSize':'13px'}}>门店管理</span>
                    </Menu.Item>

                    <Menu.Item key="/app/dashboard/basic" >
                        <Link to={'/app/dashboard/basic'}><i className="iconfont">&#xe612;</i><span className="nav-text" style={{'fontSize':'16px',marginLeft:'15px'}}>门店基本信息</span></Link>
                    </Menu.Item>

                    <Menu.Item key="/app/dashboard/">
                       <span className="nav-text" style={{'fontSize':'12px'}}>跨店比较</span>
                    </Menu.Item>

                    <Menu.Item key="/app/dashboard/compared">
                        <Link to={'/app/dashboard/compared'}><i className="iconfont">&#xe64c;</i><span className="nav-text" style={{'fontSize':'16px',marginLeft:'15px'}}>跨店排队信息分析</span></Link>
                    </Menu.Item>

                    <Menu.Item key="/app/report">
                        <span className="nav-text" style={{'fontSize':'12px'}}>单店排队信息查看</span>
                    </Menu.Item>

                    <Menu.Item key="/app/report/table" >
                        <Link to={'/app/report/table'}><i className="iconfont">&#xe667;</i><span className="nav-text" style={{'fontSize':'16px',marginLeft:'15px'}}>单店报表</span></Link>
                    </Menu.Item>

                    <Menu.Item key="/app/report/analysis">
                        <Link to={'/app/report/analysis'}><i className="iconfont">&#xe7b5;</i><span className="nav-text" style={{'fontSize':'16px',marginLeft:'15px'}}>单店数据分析</span></Link>
                    </Menu.Item>


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