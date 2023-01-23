import './Capacity.scss';
import Button from '../../Forms/Button/Button';

const levelClassName = (level: number) => {
	let className = 'capacity__contain__meter__level';

	if (level > 66) {
		className += ' level--max';
	} else if (level > 33) {
		className += ' level--mid';
	} else {
		className += ' level--min';
	}

	return className;
};

interface Props {
	name: string
	level: number
	description: string
	onClickRemoveButton: React.MouseEventHandler
}

export default function Capacity({
	name,
	level,
	description,
	onClickRemoveButton,
}: Props) {
	return (
		<div className="capacity">
			<div className="capacity__contain">
				<span className="capacity__contain__label">{name}</span>
				<div className="capacity__contain__meter">
					<div
						className={levelClassName(level)}
						style={{ width: `${level}%` }}
					></div>
				</div>
			</div>
			<Button
				className="capacity__delete"
				type="reset"
				label="×"
				onClick={onClickRemoveButton}
			/>
			{description && (
				<div className="capacity__description">${description}</div>
			)}
		</div>
	);
}