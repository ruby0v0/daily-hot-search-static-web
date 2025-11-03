'use client';

import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { Sun, Moon } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import AppIcon from '@/components/App/Icon';

function Header() {
	const { setTheme } = useTheme();
	const router = useRouter();

	return (
		<header className='border-b-border sticky top-0 z-30 border-b border-dashed bg-white'>
			<div className='container-wrapper flex justify-between items-center gap-2'>
				<div className='flex-1 flex gap-2 items-center'>
					<AppIcon className='text-red-500' name='icon-[bxs--hot]' />
					<div>每日热搜</div>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' size='icon'>
							<Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
							<Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
							<span className='sr-only'>Toggle theme</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuItem onClick={() => setTheme('light')}>
							Light
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme('dark')}>
							Dark
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme('system')}>
							System
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				<Button
					variant='outline'
					size='icon'
					onClick={() => router.push('/setting')}
				>
					<AppIcon name='icon-[ep--setting]' />
				</Button>
			</div>
		</header>
	);
}

export default Header;
