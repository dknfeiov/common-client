/**
 * 前后端数据交互格式
 * @export
 * @interface ResponseInterface
 */
export interface ResponseInterface {
    code: number;
    data: {
        list?: Array<any>;
    } | any;
    msg: string;
}
