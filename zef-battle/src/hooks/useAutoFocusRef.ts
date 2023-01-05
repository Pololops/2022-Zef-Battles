import { useEffect, useRef } from 'react';

const useAutoFocus = (isFocus: boolean) => {
	const ref = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (isFocus) ref.current?.focus();
	}, [isFocus]);

  return ref;
};

export default useAutoFocus;
