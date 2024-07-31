<script lang="ts">
	import { onMount } from 'svelte';
	import { get, writable } from 'svelte/store';
	import { goto } from '$app/navigation';
	import profileStore from '../../stores/profile';

	const storedUser = get(profileStore);

	const token = writable('');
	const tokenMatch = writable(false);
	const error = writable('');

	const validateToken = () => {
		if (!storedUser) return;

		error.set('');
		const enteredToken = $token.trim();

		if (!enteredToken) {
			error.set('Token not valid.');
			return;
		}
		if (enteredToken === storedUser.token) {
			tokenMatch.set(true);
		} else {
			error.set('Token not valid.');
			goto('/signup');
		}
	};

	onMount(() => {
		if (!storedUser) {
			goto('/login');
		}
	});
</script>

<svelte:head>
	<title>Profile</title>
</svelte:head>

<div class="flex flex-col items-center justify-center min-h-screen">
	{#if !$tokenMatch}
		<div class="w-full max-w-xs">
			<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<h2 class="mb-4">Lets check your token</h2>
				{#if $error}
					<div class="bg-red-500 text-white p-2 mb-4 rounded">
						{$error}
					</div>
				{/if}
				<div class="mb-4">
					<label class="block text-gray-700 text-sm font-bold mb-2" for="profile-token">
						Please enter the token here:
					</label>
					<input
						id="profile-token"
						bind:value={$token}
						class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						type="text"
						placeholder="Telegram ID"
					/>
				</div>
				<div class="flex items-center justify-between">
					<button
						on:click|preventDefault={validateToken}
						class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="button"
					>
						Validate token
					</button>
				</div>
			</form>
		</div>
	{:else}
		<div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
			<p class="mb-4">Your token was correct. Here is your data:</p>
			<p class="text-gray-700 text-lg">Telegram ID: {storedUser.telegramID}</p>
			<p class="text-gray-700 text-lg">
				Created: {new Date(storedUser.createdAt).toLocaleDateString()}
			</p>
		</div>
	{/if}
</div>
