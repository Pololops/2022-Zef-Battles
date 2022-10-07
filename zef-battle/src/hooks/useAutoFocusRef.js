import { useEffect, useRef } from 'react';

const useAutoFocus = (isFocus) => {
	const elementRef = useRef();

	useEffect(() => {
		if (isFocus) elementRef.current.focus();
	}, [isFocus]);

  return elementRef;
};

export default useAutoFocus;
