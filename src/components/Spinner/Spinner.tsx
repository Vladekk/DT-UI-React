import React from "react";
// @ts-ignore
import 'load-awesome-react-components/dist/misc/cog.css';

export default class Spinner extends React.Component<{}, {}> {
    style = {color: 'red'};
    private readonly el: HTMLDivElement;

    constructor(props: {}) {
        super(props);
        this.el = document.createElement('div');
        document.children[0].appendChild(this.el);
    }

    render() {
        // noinspection CheckTagEmptyBody

        const spinnerStyle = {
            color: 'orange', 'margin-left': 'auto',
            'margin-right': 'auto',
            width: '15vh',
            height: '15vh',
            top: '35vh'
        };
        // noinspection CheckTagEmptyBody
        return <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.6)'
        }}>
            <div style={spinnerStyle} className={'la-cog'}>
                <div></div>
            </div>
        </div>
    }
}
