import { useEffect, useRef } from 'react';

type isFocusType = boolean | 'alwaysFocus'

const useAutoFocus = (isFocus: isFocusType) => {
	const ref = useRef<HTMLInputElement | null>(null)
	const intervalId = useRef<NodeJS.Timer>()

	useEffect(() => {
		if (isFocus) ref.current?.focus();
		if (isFocus === 'alwaysFocus') {
			intervalId.current = setInterval(() => ref.current?.focus(), 500)
		}

		return () => clearInterval(intervalId.current)
	}, [isFocus]);

  return ref;
};

export default useAutoFocus;
