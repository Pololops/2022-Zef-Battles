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
		accept: { 'image/*': ['.jpeg', '.png'] },
		maxFiles: 1,
		maxSize: 2000000,
	});

	const dropZoneStyles = useMemo(
		() => [
			'dropzone',
			isDragActive ? 'active' : '',
			isDragAccept ? 'accept' : '',
			isDragReject ? 'reject' : '',
			droppedFiles[0] ? 'dropped' : '',
		],
		[isDragActive, isDragAccept, isDragReject, droppedFiles],
	);

	console.log(isDragAccept)

	useEffect(() => {
		return () =>
			droppedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
	}, [droppedFiles]);

	return (
		<div
			{...getRootProps({ className: `${dropZoneStyles.join(' ')}` })}
		>
			<input {...getInputProps()} />
			{
				<div className="dropzone__message">
					{dropZoneStyles.join(' ').includes('reject') ? (
						<p>
							ATTENTION : <br />
							<br /> il faut une image au format JPEG ou PNG.
						</p>
					) : 
						!dropZoneStyles.join(' ').includes('dropped') ? (
							<p>Dépose l'image du personnage ici.</p>
						) : (
							<p>Dépose une autre image pour changer celle-ci.</p>
						)
					}
				</div>
			}
			{droppedFiles.length > 0 && 
				<img
					src={droppedFiles[0].preview}
					alt={droppedFiles[0].name}
					className="dropzone__preview-img"
					onLoad={() => {
						URL.revokeObjectURL(droppedFiles[0].preview);
					}}
				/>
			}
		</div>
	);
}

Dropzone.propTypes = {
	droppedFiles: PropTypes.array.isRequired,
	onDrop: PropTypes.func.isRequired,
};
