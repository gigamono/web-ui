// Copyright 2022 the Gigamono authors. All rights reserved. Apache 2.0 license.

import GridOutlineIcon from '$assets/icons/grid_outline.svg';
import GridFilledIcon from '$assets/icons/grid_filled.svg';
import ListOutlineIcon from '$assets/icons/list.svg';
import ListFilledIcon from '$assets/icons/list.svg';
import type { ToggleOption } from '$types/app';

export const toggleOptions: ToggleOption[] = [
	{
		outlineIconUrl: GridOutlineIcon,
		filledIconUrl: GridFilledIcon,
		name: 'grid',
		handler: (): void => {
			return;
		}
	},
	{
		outlineIconUrl: ListOutlineIcon,
		filledIconUrl: ListFilledIcon,
		name: 'list',
		handler: (): void => {
			return;
		}
	}
];
