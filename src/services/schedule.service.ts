// import bind from 'bind-decorator';
import {Route} from './Route';
import {IGetScheduleInfo} from '../IGetScheduleInfo';
import {ConfigService} from "./config.service";
import {boundClass} from 'autobind-decorator'
import {DtUtils} from './DtUtils/DtUtils'

@boundClass
export class ScheduleService implements IGetScheduleInfo {
    constructor(private configService: ConfigService) {

    }

    private takeHowMuch = 4;

    private static getProperDate(str: string): Date {
        const date = new Date(Date.parse(str));
        return new Date(date.getTime() - DtUtils.GetRigaTzOffsetInMs());

    };


    // constructor(
    //     // private http: HttpClient, @Inject(forwardRef(() => ConfigService)) private configService: ConfigService,
    //     //         @Inject(logServiceToken) private logService: ISimpleLogService
    // ) {
    //
    //   this.routeDataSupplier = this.http.post<Route[]>(configService.ScheduleServiceUrl + 'GetAllRoutes', {}, {
    //     headers:
    //       {'Content-Type': 'application/json'}
    //   });
    // }
    //

    async GetScheduleInfo(busNumber: string): Promise<[Date[], Date[]]> {

        return await fetch(this.configService.ScheduleServiceUrl + 'GetClosestRuns',
            {
                headers: {
                    'Content-Type': 'application/json', 'Sec-Fetch-Site': 'cross-site'
                },
                method: 'post',
                body: JSON.stringify({BusNumber: busNumber})
            }
        )
            .then(async res => {
                    let data = this.fixDates(await res.json());
                    return data;
                }
            );
    }

    async GetAllRoutes(): Promise<Route[]> {
        const routes: Response = await fetch(this.configService.ScheduleServiceUrl + 'GetAllRoutes',
            {
                headers: {
                    'Content-Type': 'application/json', 'Sec-Fetch-Site': 'cross-site'
                },
                method: 'post',
                body: '{}',

            });
        return routes.json();

    }

    private fixDates([fromCenter, toCenter]: [string[], string[]]) {
        // this is hack to parse dates in json
        const result: [Date[], Date[]] =
            [fromCenter.map(ScheduleService.getProperDate).slice(0, this.takeHowMuch),
                toCenter.map(ScheduleService.getProperDate).slice(0, this.takeHowMuch)];
        return result;
    };
}
