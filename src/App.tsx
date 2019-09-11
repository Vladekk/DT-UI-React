import React from 'react';
import styles from './App.module.css';
import TransportRouteSelector from "./components/TransportRouteSelector/TransportRouteSelector";
import ScheduleOneDirection from "./components/ScheduleOneDirection/ScheduleOneDirection";
import Spinner from "./components/Spinner/Spinner";
import autobind from 'autobind-decorator'
import {SpinnerContext} from "./components/Spinner/SpinnerContext";
// import {ScheduleService} from "./services/schedule.service";
// import {ConfigService} from "./services/config.service";

type State = {
    selectedRoute: string,
    isLoading: number
};
type Props = {}

@autobind
export default class App extends React.Component<{}, State> {
    state = {
        selectedRoute: '17A', isLoading: 1
    };

    constructor(props: Props) {
        super(props);
        this.loading(true);
    }

    componentDidMount() {

        this.setState({selectedRoute: '17A'});
        this.loading(false);
    }

    loading = (isLoading: Boolean) => this.setState((state) => {

        return {isLoading: state.isLoading + (isLoading ? 1 : -1)};
    });

    render() {


        return (

            <div className={styles.app}>
                <SpinnerContext.Provider
                    value={{
                        loadingCounter: this.state.isLoading,
                        loading: this.loading
                    }}>
                    <Spinner/>

                    <header className="App-header">
                        <TransportRouteSelector selectedRoute={this.state.selectedRoute}
                                                onRouteChange={val => this.setState({selectedRoute: val})}
                        />
                        <ScheduleOneDirection isFromCentralStation={true} selectedRoute={this.state.selectedRoute}
                        />
                        <ScheduleOneDirection isFromCentralStation={false} selectedRoute={this.state.selectedRoute}
                        />
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
                </SpinnerContext.Provider>
            </div>
        );
    }
};
