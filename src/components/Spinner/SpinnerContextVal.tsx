export class SpinnerContextVal {
    loadingCounter: number = 0;
    loading = (isLoading: boolean) => {
        isLoading ? this.loadingCounter++ : this.loadingCounter--
    }
}
