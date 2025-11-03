export interface ResponseData<D> {
  code: number;
  message: string;
  data: D;
}

export interface HotSearchDataItem {
  link: string;
  title: string;
}