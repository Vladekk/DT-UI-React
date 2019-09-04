import React from 'react';
import styles from './App.module.css';
import TransportRouteSelector from "./components/TransportRouteSelector/TransportRouteSelector";
import ScheduleOneDirection from "./components/ScheduleOneDirection/ScheduleOneDirection";
import Spinner from "./components/Spinner/Spinner";
import autobind from 'autobind-decorator'
// import {ScheduleService} from "./services/schedule.service";
// import {ConfigService} from "./services/config.service";

type State = {
    selectedRoute: string,
    isLoadingData: number
};
type Props = {}

@autobind
export default class App extends React.Component<{}, State> {
    state = {selectedRoute: '17A', isLoadingData: 1};

    constructor(props: Props) {
        super(props);
        this.onLoadingData(true);
    }

    componentDidMount() {

        this.setState({selectedRoute: '17A'});
        this.onLoadingData(false);
    }

    onLoadingData(isLoading: boolean) {
        this.setState((state) => {
            return {isLoadingData: state.isLoadingData + (isLoading ? 1 : -1)};
        });
    };

    render() {

        return (

            <div className={styles.app}>

                <Spinner enable={this.state.isLoadingData > 0}/>

                <header className="App-header">
                    <TransportRouteSelector selectedRoute={this.state.selectedRoute}
                                            onRouteChange={val => this.setState({selectedRoute: val})}
                                            onLoadingData={this.onLoadingData}/>
                    <ScheduleOneDirection isFromCentralStation={true} selectedRoute={this.state.selectedRoute}
                                          onLoadingData={this.onLoadingData}/>
                    <ScheduleOneDirection isFromCentralStation={false} selectedRoute={this.state.selectedRoute}
                                          onLoadingData={this.onLoadingData}/>
                    {/*
            <app-route-selector (close)="suppressUpdates(false)" (open)="suppressUpdates(true)"></app-route-selector>
<div class="row">
  <ul class="from">
    <li>From autoosta</li>
    <li *ngFor="let row of fromCenterSchedule$ | async" [ngClass]="{'highlight':row.IsClosest}">
      {{ (row.RunTime) | date:'shortTime' }}
    </li>
  </ul>
</div>
<div class="row">
  <ul class="to">
    <li>From end station</li>
    <li *ngFor="let row of toCenterSchedule$ | async" [ngClass]="{'highlight':row.IsClosest}">
      {{  [row.RunTime] | date:'shortTime' }}
    </li>
  </ul>
</div>



          */}
                </header>
            </div>
        );
    }
};
