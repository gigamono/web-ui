<script lang="ts">
	import BellIcon from '$assets/icons/bell.svg';
	import { sessionProfile } from '$stores/session';
	import { getProfileAvatarEndpoint } from '$application/endpoints/session';

	// State.
	let avatarUrl: string = null;

	// Subscriptions.
	$: {
		if ($sessionProfile) {
			avatarUrl = getProfileAvatarEndpoint($sessionProfile.avatar);
		}
	}
</script>

<template lang="pug">
  #tab-bar(class="{$$props.class}")
    .tabs-section

    .profile-section
      img.notification(src="{BellIcon}", alt="notification icon")

      .profile-avatar
        .halo
        img(src="{avatarUrl}", alt="avatar")
</template>

<style lang="scss">
	#tab-bar {
		--spacing-padding: 1rem;

		border-top: var(--border-frame);
		border-bottom: var(--border-frame);
		background-color: var(--color-bg-6);
		display: flex;

		> .tabs-section {
			height: 100%;
			flex-grow: 1;
			margin-left: var(--spacing-padding);
			align-items: center;
		}

		> .profile-section {
			height: 100%;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			margin-right: var(--spacing-padding);

			> img.notification {
				--size-notification: 1.3125rem;

				width: var(--size-notification);
				height: var(--size-notification);
				margin-right: 0.75rem;
			}

			> .profile-avatar {
				--size-avatar: 1.8rem;

				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;

				> .halo {
					height: calc(var(--size-avatar) * 1.1);
					width: calc(var(--size-avatar) * 1.1);
					border: 0.075rem solid var(--color-primary);
					border-radius: 50%;
				}

				> img {
					height: var(--size-avatar);
					width: var(--size-avatar);
					border-radius: 50%;
					position: absolute;
				}
			}
		}
	}
</style>
