import React from 'react';
import {ScheduleService} from "../../services/schedule.service";
import {ConfigService} from "../../services/config.service";
import {IRoute} from "../../services/IRoute";
import styles from './TransportRouteSelector.module.css';
import autobind from "autobind-decorator";

type Props = {
    selectedRoute: string,
    onRouteChange: (val: string) => void,
    onLoadingData: (isLoading: boolean) => void
}

@autobind
export default class TransportRouteSelector extends React.Component<Props, { routes: IRoute[] }> {

    constructor(props: Props) {
        super(props);
        this.state = {routes: []};
        this.select = this.select.bind(this);
    }

    async componentDidMount() {

        let service = new ScheduleService(new ConfigService());
        this.props.onLoadingData(true);
        const val = await service.GetAllRoutes();
        this.setState({routes: val});
        this.select(this.props.selectedRoute);
        this.props.onLoadingData(false);

    }

    render() {
        return <React.Fragment>
            <select className={styles.select} onChange={event => {
                event.preventDefault();
                this.select(event.target.value);
            }} value={this.props.selectedRoute}>
                {this.state.routes.map(r => <option key={r.Number} value={r.Number}>
                    {r.Number}
                </option>)}
            </select>
        </React.Fragment>;
    }

    private select(routeNum: string) {
        this.props.onRouteChange(routeNum);
    }
}

