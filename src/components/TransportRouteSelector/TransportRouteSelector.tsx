import React from 'react';
import {ScheduleService} from "../../services/schedule.service";
import {ConfigService} from "../../services/config.service";
import {IRoute} from "../../services/IRoute";
import styles from './TransportRouteSelector.module.css';
import autobind from "autobind-decorator";
import {SpinnerContext} from "../Spinner/SpinnerContext";

type Props = {
    selectedRoute: string,
    onRouteChange: (val: string) => void,

}

@autobind
export default class TransportRouteSelector extends React.Component<Props, { routes: IRoute[] }> {

    constructor(props: Props) {
        super(props);
        this.state = {routes: []};
        this.select = this.select.bind(this);
    }

    static contextType = SpinnerContext;
    context!: React.ContextType<typeof SpinnerContext>;

    async componentDidMount() {

        let service = new ScheduleService(new ConfigService());
        this.context.loading(true
        );
        const val = await service.GetAllRoutes();
        this.setState({routes: val});
        this.select(this.props.selectedRoute);
        this.context.loading(false);

    }

    render() {
        return <React.Fragment>
            <div className={styles.outerDiv}>
                <select className={styles.select} onChange={event => {
                    event.preventDefault();
                    this.select(event.target.value);
                }} value={this.props.selectedRoute}>
                    {this.state.routes.map(r => <option key={r.Number} value={r.Number}>
                        {r.Number}
                    </option>)}
                </select>
            </div>
        </React.Fragment>;
    }

    private select(routeNum: string) {
        this.props.onRouteChange(routeNum);
    }
}

