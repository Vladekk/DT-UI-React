import React from 'react';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
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
};

export default App;
