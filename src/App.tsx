import React from 'react';
import styles from './App.module.css';
import TransportRouteSelector from "./components/TransportRouteSelector/TransportRouteSelector";
import ScheduleOneDirection from "./components/ScheduleOneDirection/ScheduleOneDirection";
// import {ScheduleService} from "./services/schedule.service";
// import {ConfigService} from "./services/config.service";

export default class App extends React.Component<{}, { selectedRoute: string }> {

    state = {selectedRoute: '17A'};


    componentDidMount() {

        this.setState({selectedRoute: '17A'});
    }

    render() {
        return (
            <div className={styles.app}>
                <header className="App-header">
                    <TransportRouteSelector selectedRoute={this.state.selectedRoute}
                                            onRouteChange={val => this.setState({selectedRoute: val})}/>
                    <ScheduleOneDirection isFromCentralStation={true} selectedRoute={this.state.selectedRoute}/>
                    <ScheduleOneDirection isFromCentralStation={false} selectedRoute={this.state.selectedRoute}/>
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
