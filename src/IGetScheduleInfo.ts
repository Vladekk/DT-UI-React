
export interface IGetScheduleInfo {
  GetScheduleInfo(busNumber: string): Promise<[Date[], Date[]]>
}
