import './DropZone.scss';

import { useMemo, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import PropTypes from 'prop-types';

export default function Dropzone({ droppedFiles, onDrop }) {
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
		maxFiles: 1,
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
		return () =>
			droppedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
	}, [droppedFiles]);

	return (
		<div className={dropZoneStyles.join(' ')} {...getRootProps()}>
			<input {...getInputProps()} />
			{droppedFiles.length > 0 ? (
				<img
					src={droppedFiles[0].preview}
					alt={droppedFiles[0].name}
					className="dropzone__preview-img"
					onLoad={() => {
						URL.revokeObjectURL(droppedFiles[0].preview);
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

Dropzone.propTypes = {
	droppedFiles: PropTypes.array.isRequired,
	onDrop: PropTypes.func.isRequired,
};
