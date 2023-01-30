import { useEffect, useState } from 'react';

const useAppearEffect = (index: number): boolean => {
	const [isAppeared, setIsAppeared] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setIsAppeared(true);
		}, index * 50);
	}, [index]);

	return isAppeared;
};

export default useAppearEffect;
