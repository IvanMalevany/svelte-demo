<script lang="ts">
	import { writable } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';
	import profileStore from '../../stores/profile';

	const telegramID = writable('');
	const password = writable('');
	const error = writable('');

	const handleLogin = () => {
		const id = $telegramID.trim();
		const pass = $password.trim();
		if (!id || !pass) {
			error.set('Telegram ID and Password are required.');
			return;
		}
		error.set('');
		const profile = get(profileStore);

		if (profile && profile.telegramID === id && profile.password === pass) {
			goto('/profile');
		} else {
			error.set('Incorrect credentials.');
		}
	};
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="flex flex-col items-center justify-center min-h-screen">
	<div class="w-full max-w-xs">
		<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
			<h2 class="mb-4">Login form</h2>
			{#if $error}
				<div class="bg-red-500 text-white p-2 mb-4 rounded">
					{$error}
				</div>
			{/if}
			<div class="mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="login-tg-td"> Telegram ID </label>
				<input
					bind:value={$telegramID}
					id="login-tg-td"
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					type="text"
					placeholder="Telegram ID"
				/>
			</div>
			<div class="mb-6">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="login-pass"> Password </label>
				<input
					bind:value={$password}
					id="login-pass"
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
					type="password"
					placeholder="******************"
				/>
			</div>
			<div class="flex items-center justify-between">
				<button
					on:click|preventDefault={handleLogin}
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					type="button"
				>
					Login
				</button>
			</div>
		</form>
	</div>
</div>
