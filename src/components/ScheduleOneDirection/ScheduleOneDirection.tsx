import React from 'react';
import {ScheduleService} from "../../services/schedule.service";
import {ConfigService} from "../../services/config.service";
import styles from './ScheduleOneDirection.module.css'
import {SpinnerContext} from "../Spinner/SpinnerContext";


type Props = {
    selectedRoute: string,
    isFromCentralStation: boolean

}

type State = { routeInfos: Date[], now: Date, intervalHandle: number };

export default class ScheduleOneDirection extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {routeInfos: [], now: new Date(), intervalHandle: -1};

    }

    static contextType = SpinnerContext;
    context!: React.ContextType<typeof SpinnerContext>;

    componentWillUnmount(): void {
        clearInterval(this.state.intervalHandle);
    }

    async componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
        if (prevProps.selectedRoute !== this.props.selectedRoute) {
            await this.FetchScheduleForSelectedRoute(this.props.selectedRoute, this.props.isFromCentralStation);
        }
    }

    async componentDidMount() {
        await this.FetchScheduleForSelectedRoute(this.props.selectedRoute, this.props.isFromCentralStation);
        const handle = window.setInterval(() => this.setState({now: new Date()}), 1000);
        this.setState({intervalHandle: handle})

    }

    IsClosestToNow(row: Date, schedule: Date[]) {
        let afterNowRuns = schedule.filter(val => val >= this.state.now);
        return afterNowRuns.length > 0 && afterNowRuns[0] === row;
    }

    formatRow(row: Date) {
        return `${row.getHours().toString().padEnd(2, '0')}:${row.getMinutes().toString().padEnd(2, '0')}`
    }

    render() {
        return <React.Fragment>
            <h3>{this.props.isFromCentralStation ? "From center" : "To center"}</h3>
            <ul>
                {this.state.routeInfos.map(row => <li key={row.toString()}
                                                      className={this.IsClosestToNow(row, this.state.routeInfos) ? styles.highlight : ''}>{this.formatRow(row)}</li>)}
            </ul>
        </React.Fragment>;

    }

    private async FetchScheduleForSelectedRoute(selectedRoute: string, isFromCentralStation: boolean) {
        let service = new ScheduleService(new ConfigService());
        // noinspection JSUnusedLocalSymbols
        this.context.loading(true);
        const val = await service.GetScheduleInfo(selectedRoute);
        const infos = isFromCentralStation ? val[0] : val[1];
        this.setState({routeInfos: infos});
        this.context.loading(false);


    }

}

