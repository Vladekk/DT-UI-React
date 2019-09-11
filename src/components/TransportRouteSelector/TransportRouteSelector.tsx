import React from 'react';
import {ScheduleService} from "../../services/schedule.service";
import {ConfigService} from "../../services/config.service";
import {IRoute} from "../../services/IRoute";
import autobind from "autobind-decorator";
import {SpinnerContext} from "../Spinner/SpinnerContext";
import {Dropdown} from "react-bootstrap";
import styles from './TransportRouteSelector.module.css'

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

    routesInCol = 12;
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
        const columnCount = Math.round(this.state.routes.length / this.routesInCol);
        return <React.Fragment>
            <div className={styles.outerDiv}>
                <Dropdown id="dropdown-basic-button" onSelect={(key: any, event: any) => {
                    event.preventDefault();
                    this.select(key);
                }} className={styles.select}>

                    <Dropdown.Toggle id="dropdown-basic" title={this.props.selectedRoute} variant='warning'
                                     className={styles.select}
                    >
                        {this.props.selectedRoute}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>

                        {

                            [...Array(columnCount).keys()].map(i => {

                                return <div style={{float: 'left'}} key={'col' + i.toString()}> {
                                    this.state.routes.slice(i * this.routesInCol, (i + 1) * this.routesInCol).map((r) => {

                                        return <Dropdown.Item className={styles.item} eventKey={r.Number}
                                                              key={r.Number} value={r.Number}>
                                            {r.Number}
                                        </Dropdown.Item>;
                                    })}</div>;


                            })}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </React.Fragment>;
    }

    private select(routeNum: string) {
        this.props.onRouteChange(routeNum);
    }
}

