import React from "react";
// @ts-ignore
import 'load-awesome-react-components/dist/misc/cog.css';

type Props = {
    enable: boolean
};
export default class Spinner extends React.Component<Props, {}> {
    style = {color: 'red'};
    private readonly el: HTMLDivElement;
    static defaultProps = {enable: false};

    constructor(props: Props) {
        super(props);
        this.el = document.createElement('div');
        this.el.hidden = !props.enable;
        document.children[0].appendChild(this.el);
    }


    render() {
        // noinspection CheckTagEmptyBody

        const spinnerStyle = {
            color: 'orange', marginLeft: 'auto',
            marginRight: 'auto',
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
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: this.props.enable ? "block" : "none"
        }}>

            <div style={spinnerStyle} className={'la-cog'}>
                <div></div>
            </div>
        </div>
    }
}
