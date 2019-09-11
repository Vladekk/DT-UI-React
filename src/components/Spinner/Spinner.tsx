import React from "react";
// @ts-ignore
import 'load-awesome-react-components/dist/misc/cog.css';
import {SpinnerContext} from "./SpinnerContext";

type Props = {

};
export default class Spinner extends React.Component<Props, {}> {
    style = {color: 'red'};
    private readonly el: HTMLDivElement;
    static defaultProps = {};

    constructor(props: Props) {
        super(props);
        this.el = document.createElement('div');
        document.children[0].appendChild(this.el);
    }

    static contextType = SpinnerContext;
    context!: React.ContextType<typeof SpinnerContext>;

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
            display: (this.context.loadingCounter !== 0) ? "block" : "none"
        }}>

            <div style={spinnerStyle} className={'la-cog'}>
                <div></div>
            </div>
        </div>
    }
}
