import type { HotSearchDataItem } from "@/api/common/types";
import fetcher from "@/utils/fetcher";

/** 获取微博热搜数据列表 */
export function fetchWeiboData(): Promise<HotSearchDataItem[]> {
  return fetcher.get('/weibo');
}

/** 获取bilibili热搜 */
export function fetchBilibiliData(): Promise<HotSearchDataItem[]> {
  return fetcher.get('/bili');
}

/** 获取抖音热搜 */
export function fetchDouyinData(): Promise<HotSearchDataItem[]> {
  return fetcher.get('/douyin');
}

/** 获取小红书热搜 */
export function fetchRedNoteData(): Promise<HotSearchDataItem[]> {
  return fetcher.get('/rednote');
}

/** 获取百度热搜 */
export function fetchBaiduData(): Promise<HotSearchDataItem[]> {
  return fetcher.get('/baidu/hot');
}

/** 获取头条热搜 */
export function fetchToutiaoData(): Promise<HotSearchDataItem[]> {
  return fetcher.get('/toutiao');
}

/** 获取知乎热搜 */
export function fetchZhihuData(): Promise<HotSearchDataItem[]> {
  return fetcher.get('/zhihu');
}

/** 获取懂车帝热搜 */
export function fetchDongchediData(): Promise<HotSearchDataItem[]> {
  return fetcher.get('/dongchedi');
}