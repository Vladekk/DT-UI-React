// import bind from 'bind-decorator';
import {Route} from './Route';
import {IGetScheduleInfo} from '../IGetScheduleInfo';
import {ConfigService} from "./config.service";

export class ScheduleService implements IGetScheduleInfo {
    constructor(private configService: ConfigService) {

    }

    GetScheduleInfo(busNumber: string): [Date[], Date[]] {

        // fetch(this.configService.ScheduleServiceUrl)
        //     .then(res => res.json())
        //     .then(
        //         (result) => {
        //
        //         },
        //         // Note: it's important to handle errors here
        //         // instead of a catch() block so that we don't swallow
        //         // exceptions from actual bugs in components.
        //         (error) => {
        //             throw error;
        //         }
        //     );

        return [[], []];
    }


    // private takeHowMuch = 4;


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
    // @bind
    // private getProperDate(str): Date {
    //   const date = new Date(Date.parse(str));
    //   return new Date(date.getTime() - DtUtils.GetRigaTzOffsetInMs());
    //
    // };
    //
    // @bind
    // private fixDates([fromCenter, toCenter]: [string[], string[]]) {
    //   // this is hack to parse dates in json
    //   const result: [Date[], Date[]] =
    //     [fromCenter.map(this.getProperDate).slice(0, this.takeHowMuch),
    //       toCenter.map(this.getProperDate).slice(0, this.takeHowMuch)];
    //   return result;
    // };
    //
    // GetScheduleInfo(busNumber: string): Observable<[Date[], Date[]]> {
    //   this.logService.Log(`Subscribing to fetch route data ${busNumber}`);
    //   return this.http.post<[string[], string[]]>(this.configService.ScheduleServiceUrl + 'GetClosestRuns', {BusNumber: busNumber}, {
    //     headers:
    //       {'Content-Type': 'application/json'}
    //   })
    //     .pipe(map(this.fixDates));
    // }
    //
    async GetAllRoutes(): Promise<Route[]> {
        const routes: Response = await fetch(this.configService.ScheduleServiceUrl + 'GetAllRoutes',
            {headers: {'Content-Type': 'application/json','Sec-Fetch-Site':'cross-site'
              },
              method: 'post',
              body:'{}',
              mode: 'cors',

            });
        // .then(res => res.json())
        // .then(
        //     (result) => {
        //
        //     },
        //     // Note: it's important to handle errors here
        //     // instead of a catch() block so that we don't swallow
        //     // exceptions from actual bugs in components.
        //     (error) => {
        //         throw error;
        //     }
        // )
        return routes.json();

    }
}
