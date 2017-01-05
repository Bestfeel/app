/**
 * Created by feel on 2016/12/29.
 */
import React, {Component} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import {styles, muiTheme} from "./Styles";
import JsonViewTools from "./JsonViewTools";
import "isomorphic-fetch";
import MenuBar from "./MenuBar";
import {Contants} from "./Contants";


export default class main extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            infoValue: {},
        };
    }

    parseDatapoint = ()=> {

        const product_key = this.refs.product_key.getValue() != "" ? this.refs.product_key.getValue() : Contants.product_key;
        const appid = this.refs.appid.getValue() != "" ? this.refs.appid.getValue() : Contants.appid;
        const payload = this.refs.payload.getValue() != "" ? this.refs.payload.getValue() : Contants.payload;


        this.setState({
            infoValue: {
                product_key: product_key,
                appid: appid,
                payload: payload,
                flag: true
            }
        });

    };

    render() {


        return (
            <div style={styles.container}>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div>
                        <div style={styles.main}>
                            <MenuBar/>

                            <div style={styles.content}>
                                <TextField
                                    ref="product_key"
                                    hintText="请输入产品标识码(product_key)"
                                    defaultValue={""}
                                    style={ {width: "80%"}}
                                    floatingLabelText="请输入产品标识码(product_key)"
                                />
                                <TextField
                                    ref="appid"
                                    hintText="请输入产品应用绑定的appid(appid)"
                                    defaultValue={""}
                                    style={ {width: "80%"}}
                                    floatingLabelText="请输入产品应用绑定的appid(appid)"
                                />
                                <TextField
                                    ref="payload"
                                    hintText="请输入数据上报payload(payload)"
                                    defaultValue={""}
                                    style={ {width: "80%"}}
                                    floatingLabelText="请输入数据上报payload(payload)"
                                />
                                <br />
                                <br />
                                <RaisedButton label="确认" primary={true}
                                              onTouchTap={this.parseDatapoint}/>
                            </div>

                        </div>

                        <JsonViewTools info={this.state.infoValue}/>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}
