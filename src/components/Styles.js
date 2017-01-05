/**
 * Created by feel on 2016/12/30.
 */

import getMuiTheme from "material-ui/styles/getMuiTheme";
import {cyan500} from "material-ui/styles/colors";
import bodyCSS from "../styles/index.css";
import "isomorphic-fetch";


export const styles = {
    container: {
        height: '960px',
        overflow: 'scroll',
    },
    body: bodyCSS,
    main: {
        // textAlign: 'center',
        // marginLeft: '20px',
        width: '50%',
        height: '960px',
        float: 'left',
    },
    view: {
        width: '50%',
        height: '960px',
        float: 'left',
        backgroundColor: 'rgb(39, 40, 34)',
    },
    content:{
        marginLeft: '20px',
    },

};
export const muiTheme = getMuiTheme({
    palette: {
        textColor: cyan500,
    },
    avatar: {
        borderColor: null
    },
    appBar: {
        height: 50,
    }
});
export const theme = {
    scheme: 'monokai',
    author: 'wimer hazenberg (http://www.monokai.nl)',
    base00: '#272822',
    base01: '#383830',
    base02: '#49483e',
    base03: '#75715e',
    base04: '#a59f85',
    base05: '#f8f8f2',
    base06: '#f5f4f1',
    base07: '#f9f8f5',
    base08: '#f92672',
    base09: '#fd971f',
    base0A: '#f4bf75',
    base0B: '#a6e22e',
    base0C: '#a1efe4',
    base0D: '#66d9ef',
    base0E: '#ae81ff',
    base0F: '#cc6633'
};

