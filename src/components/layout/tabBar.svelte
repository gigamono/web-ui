<script lang="ts">
	import BellIcon from '../../assets/icons/bell.svg';
	import { getSessionProfile } from '$stores/session';
	import { getProfileAvatarEndpoint } from '$application/endpoints/session';

	let avatarUrl: string = null;

	$: {
		avatarUrl = getProfileAvatarEndpoint();
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
			--sizing-avatar: 2rem;

			height: 100%;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			margin-right: var(--spacing-padding);

			> img.notification {
				--sizing-notification: 1.3125rem;

				width: var(--sizing-notification);
				height: var(--sizing-notification);
				margin-right: 0.75rem;
			}

			> .profile-avatar {
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;
				box-sizing: border-box;

				> .halo {
					height: calc(var(--sizing-avatar) * 1.1);
					width: calc(var(--sizing-avatar) * 1.1);
					border: 0.125rem solid var(--color-primary);
					border-radius: 50%;
				}

				> img {
					height: var(--sizing-avatar);
					width: var(--sizing-avatar);
					border-radius: 50%;
					position: absolute;
				}
			}
		}
	}
</style>
