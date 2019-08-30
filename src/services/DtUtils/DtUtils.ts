export enum ConversionDirection {
    ToUtc = -1,
    FromUtc = 1
}

export class DtUtils {
    public static DateToUtcAndBack(date: Date, direction: ConversionDirection): Date {
        // when we create new date, it will be in local timezone
        // we need to switch to UTC to transfer it over json later
        // to do this, we take offset in minutes, and multiply by 60, getting seconds, then by 1000
        // this will get milliseconds. We can add ms to date object to shift it by offset
        return new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000 * ((direction === ConversionDirection.ToUtc) ? 1 : -1));
    }

    public static GetRigaTzOffsetInMs() {
        // const options = {
        //     timeZone: 'Europe/Paris',
        //     // tslint:disable-next-line:object-literal-sort-keys
        //     year: 'numeric', month: 'numeric', day: 'numeric',
        //     hour: 'numeric', minute: 'numeric', second: 'numeric',
        // };
        // const
        //     formatter = new Intl.DateTimeFormat([], options);
        return 3 * 1000 * 60 * 60;
    }
}
