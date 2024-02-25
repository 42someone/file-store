export interface Presenter<P, R> {
    format(params: P): R;
}
