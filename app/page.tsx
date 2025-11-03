'use client';

import React, { useEffect, useState } from 'react';
import { HotSearchDataItem } from '@/api/common/types';
import {
	fetchWeiboData,
	fetchBilibiliData,
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
											key={item.id}
										>
											<Badge
												className={getBadgeColorClassName(index)}
												variant='secondary'
											>
												{item.id}
											</Badge>
											<span
												className='inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium underline-offset-4 hover:underline'
												onClick={() => window.open(item.url, '_blank')}
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
	icon: { name: string; color?: string };
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
			<AppIcon className='mr-2' name={icon.name} color={icon?.color} />
			{title}
		</HotSearchDataList>
	);
}

function Home() {
	const sections = [
		{
			icon: { name: 'icon-[ant-design--weibo-outlined]', color: '#d81e06' },
			title: '微博',
			fetchData: async () => await fetchWeiboData(),
		},
		{
			icon: { name: 'icon-[ant-design--bilibili-filled]', color: '#EB5480' },
			title: 'bilibili',
			fetchData: async () => await fetchBilibiliData(),
		},
		// {
		// 	icon: { name: 'icon-[tabler--brand-juejin]', color: '#007fff' },
		// 	title: '掘金',
		// 	fetchData: async () => await fetchJuejinData(),
		// },
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
