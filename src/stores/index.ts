// Copyright 2022 the Gigamono authors. All rights reserved. GPL-3.0 License.

import { setupProfileSubscriptions } from './profile';
import { setupSessionSubscriptions } from './session';

const setupStoreSubscriptions = (): void => {
	setupSessionSubscriptions();
	setupProfileSubscriptions();
};

export { setupStoreSubscriptions };
