import React from 'react';
import {ScheduleService} from "../../services/schedule.service";
import {ConfigService} from "../../services/config.service";
import {IRoute} from "../../services/IRoute";
import styles from './TransportRouteSelector.module.css';

type TransportRouteSelectorProps = {
    selectedRoute: string,
    onRouteChange: (val: string) => void
}


export default class TransportRouteSelector extends React.Component<TransportRouteSelectorProps, { routes: IRoute[] }> {

    constructor(props: TransportRouteSelectorProps) {
        super(props);
        this.state = {routes: []};
        this.select = this.select.bind(this);
    }

    componentDidMount() {

        let service = new ScheduleService(new ConfigService());
        service.GetAllRoutes().then((val) => {
            this.setState({routes: val});
            this.select(this.props.selectedRoute);
        })

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

