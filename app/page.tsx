'use client';

import React, { useEffect, useState } from 'react';
import { HotSearchDataItem } from '@/api/common/types';
import {
	fetchWeiboData,
	fetchBilibiliData,
	fetchDouyinData,
	fetchRedNoteData,
	fetchZhihuData,
	fetchBaiduData,
	fetchToutiaoData,
	fetchDongchediData,
} from '@/api/hot';
import { useLoading } from '@/hook';
import AppIcon from '@/components/App/Icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

function getBadgeColorClassName(index: number) {
	if (index <= 0) {
		return 'bg-red-600 text-white';
	} else if (index <= 1) {
		return 'bg-red-500 text-white';
	} else if (index <= 2) {
		return 'bg-red-400 text-white';
	}
}

function HotSearchDataList({
	list,
	loading,
	children,
}: {
	list: HotSearchDataItem[];
	loading: boolean;
	children?: React.ReactNode | undefined;
}) {
	return (
		<div className='w-full'>
			<Card>
				<CardHeader>
					<CardTitle>
						<div className='flex'>{children}</div>
					</CardTitle>
				</CardHeader>
				<CardContent>
					{list.length ? (
						<ScrollArea className='h-72 rounded-md'>
							{loading ? (
								<div className='flex justify-center items-center h-72'>
									<span className='loading loading-infinity loading-xl'></span>
								</div>
							) : (
								list.map((item, index) => {
									return (
										<div
											className='w-full flex items-center cursor-pointer'
											key={index}
										>
											<Badge
												className={getBadgeColorClassName(index)}
												variant='secondary'
											>
												{index}
											</Badge>
											<span
												className='inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium underline-offset-4 hover:underline'
												onClick={() => window.open(item.link, '_blank')}
											>
												{item.title}
											</span>
										</div>
									);
								})
							)}
							<ScrollBar orientation='horizontal' />
						</ScrollArea>
					) : (
						<div>加载失败</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}

function HotSearchSection({
	icon,
	title,
	fetchData,
}: {
	icon: string;
	title: string;
	fetchData: () => Promise<HotSearchDataItem[]>;
}) {
	const [list, setList] = useState<HotSearchDataItem[]>([]);
	const [loading, setLoading] = useLoading();

	const getData = async () => {
		try {
			setLoading(true);
			setList(await fetchData());
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getData();
	}, [fetchData]);

	return (
		<HotSearchDataList list={list} loading={loading}>
			<AppIcon className='mr-2' name={icon} />
			{title}
		</HotSearchDataList>
	);
}

function Home() {
	const sections = [
		{
			icon: '',
			title: '抖音',
			fetchData: async () => await fetchDouyinData(),
		},
		{
			icon: '',
			title: '小红书',
			fetchData: async () => await fetchRedNoteData(),
		},
		{
			icon: '',
			title: '哔哩哔哩',
			fetchData: async () => await fetchBilibiliData(),
		},
		{
			icon: '',
			title: '微博',
			fetchData: async () => await fetchWeiboData(),
		},
		{
			icon: '' ,
			title: '百度',
			fetchData: async () => await fetchBaiduData(),
		},
		{
			icon: '',
			title: '今日头条',
			fetchData: async () => await fetchToutiaoData(),
		},
		{
			icon: '',
			title: '知乎',
			fetchData: async () => await fetchZhihuData(),
		},
		{
			icon: '',
			title: '懂车帝',
			fetchData: async () => await fetchDongchediData(),
		},
	];

	return (
		<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
			{sections.map(({ icon, title, fetchData }, index) => {
				return (
					<HotSearchSection
						icon={icon}
						title={title}
						fetchData={fetchData}
						key={index}
					/>
				);
			})}
		</div>
	);
}

export default Home;
