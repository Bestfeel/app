/**
 * Created by feel on 2016/12/30.
 */
import React, {Component} from "react";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import {Link} from "react-router";
export default class MenuBar extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            open: false,
        };
    }


    handleToggle = () => this.setState({open: !this.state.open});


    render() {
        return (
            <div>
                <AppBar title={"数据点解析可视化工具"} onLeftIconButtonTouchTap={this.handleToggle}></AppBar>
                <Drawer docked={true} width={200} open={this.state.open}>
                    <AppBar title="菜单"
                            onLeftIconButtonTouchTap={this.handleToggle}>
                    </AppBar>
                    <MenuItem onTouchTap={this.handleToggle} containerElement={
                        <Link to="/"/>
                    }> 数据解析</MenuItem>

                    <MenuItem onTouchTap={this.handleToggle} containerElement={
                        <Link to="about"/>
                    }>数据上报</MenuItem>
                </Drawer>
            </div>

        )
    }


}

