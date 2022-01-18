// Copyright 2022 the Gigamono authors. All rights reserved. Apache 2.0 license.

import { setupProfileSubscriptions } from './profile';
import { setupSessionSubscriptions } from './session';

const setupStoreSubscriptions = (): void => {
	setupSessionSubscriptions();
	setupProfileSubscriptions();
};

export { setupStoreSubscriptions };
