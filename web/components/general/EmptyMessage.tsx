import React from 'react';

interface EmptyMessageProps {
	message: string;
	description: string;
}

const EmptyMessage = ({
	message = 'No Data Found',
	description = 'Check back later for new data.',
}: EmptyMessageProps) => {
	return (
		<div className='flex h-[300px] flex-col items-center justify-center space-y-4 text-center'>
			<p className='text-lg font-semibold text-muted-foreground'>{message}</p>
			<p className='text-sm text-muted-foreground'>{description}</p>
		</div>
	);
};

export default EmptyMessage;
