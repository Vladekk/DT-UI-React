import React from 'react';
import {ScheduleService} from "../../services/schedule.service";
import {ConfigService} from "../../services/config.service";
import {IRoute} from "../../services/IRoute";
import autobind from "autobind-decorator";
import {SpinnerContext} from "../Spinner/SpinnerContext";
import {Dropdown, DropdownButton} from "react-bootstrap";

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
            <DropdownButton id="dropdown-basic-button" title={this.props.selectedRoute} variant='warning'
                            onSelect={(key: any, event: any) => {
                                event.preventDefault();
                                this.select(key);
                            }}>
                {this.state.routes.map(r => <Dropdown.Item eventKey={r.Number} key={r.Number} value={r.Number}>
                    {r.Number}
                </Dropdown.Item>)}

            </DropdownButton>
        </React.Fragment>;
    }

    private select(routeNum: string) {
        this.props.onRouteChange(routeNum);
    }
}

