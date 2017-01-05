/**
 * Created by feel on 2016/12/28.
 */
import React, {Component} from "react";
import {styles, theme} from "./Styles";
import JSONTree from "react-json-tree";
import "isomorphic-fetch";
import {Contants} from "./Contants";
import _ from "lodash";

export default class JsonViewTools extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            datapoint: {},
        };
    }

    /**
     *  We don’t escape the key '__proto__'
     * which can cause problems on older engines
     * @param strMap
     * @returns {Object}
     */
    strMapToObj = (strMap)=> {
        let obj = Object.create(null);
        for (let [k,v] of strMap) {

            obj[k] = v;
        }
        return obj;
    };

    /**
     *  same-origin（同源请求）、no-cors（默认）和 cros（允许跨域请求)
     * @param nextProp
     */
    componentWillReceiveProps(nextProp) {

        const product_key = nextProp.info.product_key;

        if (product_key != undefined && product_key != "") {

            fetch(Contants.productUrl + product_key, {
                mode: 'cors',
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'X-Gizwits-Application-Id': nextProp.info.appid,
                }),

            }).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response
                } else {
                    var error = new Error(response.statusText);
                    error.response = response;
                    throw error
                }
            }).then((response)=>response.json())
                .then((data)=> {
                    this.setState({
                        datapoint: data
                    });


                }).catch((error)=> {

                console.info(error);
                this.setState({
                    datapoint: {
                        status: -1,
                        statusText: "解析错误!"
                    }

                });

            });
        }

    }


    render() {
        return (

            <div style={styles.view}>
                <JSONTree data={this.state.datapoint} theme={theme} invertTheme={false}/>
            </div>


        )
    }

}