import './DropZone.scss';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

export default function DropZone() {
	const [files, setfiles] = useState([]);

	const onDrop = useCallback((acceptedfiles) => {
		setfiles(
			acceptedfiles.map((files) =>
				Object.assign(files, {
					preview: URL.createObjectURL(files),
				}),
			),
		);
	}, []);

	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject,
	} = useDropzone({
		onDrop,
		accept: {
			'image/jpeg': [],
			'image/png': [],
		},
		maxfiless: 1,
	});

	const dropZoneStyles = useMemo(
		() => [
			'dropzone',
			isDragActive ? 'active' : '',
			isDragAccept ? 'accept' : '',
			isDragReject ? 'reject' : '',
		],
		[isDragActive, isDragReject, isDragAccept],
	);

	useEffect(() => {
		return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
	}, []);

	return (
		<div className={dropZoneStyles.join(' ')} {...getRootProps()}>
			<input {...getInputProps()} />
			{files.length > 0 ? (
				<img
					src={files[0].preview}
					alt={files[0].name}
					className="dropzone__preview-img"
					onLoad={() => {
						URL.revokeObjectURL(files[0].preview);
					}}
				/>
			) : (
				<div className="dropzone__message">
					Dépose l'image du personnage ici.
				</div>
			)}
		</div>
	);
}
