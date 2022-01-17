import { setupProfileSubscriptions } from './profile';
import { setupSessionSubscriptions } from './session';

const setupStoreSubscriptions = (): void => {
	setupSessionSubscriptions();
	setupProfileSubscriptions();
};

export { setupStoreSubscriptions };
