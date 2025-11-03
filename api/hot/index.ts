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

/** 获取掘金热搜 */
export function fetchJuejinData(): Promise<HotSearchDataItem[]> {
  return fetcher.get('/juejin');
}