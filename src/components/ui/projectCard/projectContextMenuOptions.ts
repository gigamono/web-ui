import ShareIcon from '$assets/icons/share.svg';
import RenameIcon from '$assets/icons/rename.svg';
import DuplicateIcon from '$assets/icons/duplicate.svg';
import StarIcon from '$assets/icons/star.svg';
import TrashIcon from '$assets/icons/trash.svg';
import { deleteProject } from '$stores/projects';
import type { ContextOption, Project } from '$application/types';
import { setCloseContextMenuEvent } from '$stores/events';

export const projectContextOptionImages = {
	share: ShareIcon,
	rename: RenameIcon,
	duplicate: DuplicateIcon,
	star: StarIcon,
	trash: TrashIcon
};

export const projectContextMenuOptions = (project: Project): ContextOption[] => {
	const images = projectContextOptionImages;

	return [
		{
			iconUrl: images.share,
			name: 'Share',
			color: 'var(--color-text-0)',
			handler: (): void => {
				return;
			}
		},
		{
			iconUrl: images.rename,
			name: 'Rename',
			color: 'var(--color-text-0)',
			handler: (): void => {
				return;
			}
		},
		{
			iconUrl: images.duplicate,
			name: 'Duplicate',
			color: 'var(--color-text-0)',
			handler: (): void => {
				return;
			}
		},
		{
			iconUrl: images.star,
			name: 'Add to starred',
			color: 'var(--color-text-0)',
			handler: (): void => {
				return;
			}
		},
		{
			iconUrl: images.trash,
			name: 'Delete project',
			color: 'var(--color-misc-tomato)',
			handler: (event: Event): void => {
				event.stopPropagation();
				(async () => await deleteProject(project.id))();
				setCloseContextMenuEvent();
			}
		}
	];
};
