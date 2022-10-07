import { useEffect, useState } from 'react';

const useAppearEffect = (index) => {
	const [isAppeared, setIsAppeared] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setIsAppeared(true);
		}, index * 100);
	}, [index]);

	return isAppeared;
};

export default useAppearEffect;
