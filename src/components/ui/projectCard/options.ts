import ShareIcon from '$assets/icons/share.svg';
import RenameIcon from '$assets/icons/rename.svg';
import DuplicateIcon from '$assets/icons/duplicate.svg';
import StarIcon from '$assets/icons/star.svg';
import TrashIcon from '$assets/icons/trash.svg';

export const contextOptions = [
	{
		iconUrl: ShareIcon,
		name: 'Share',
		color: 'var(--color-text-0)',
		handler: (): void => {
			return;
		}
	},
	{
		iconUrl: RenameIcon,
		name: 'Rename',
		color: 'var(--color-text-0)',
		handler: (): void => {
			return;
		}
	},
	{
		iconUrl: DuplicateIcon,
		name: 'Duplicate',
		color: 'var(--color-text-0)',
		handler: (): void => {
			return;
		}
	},
	{
		iconUrl: StarIcon,
		name: 'Add to starred',
		color: 'var(--color-text-0)',
		handler: (): void => {
			return;
		}
	},
	{
		iconUrl: TrashIcon,
		name: 'Delete project',
		color: 'var(--color-misc-tomato)',
		handler: (): void => {
			return;
		}
	}
];
