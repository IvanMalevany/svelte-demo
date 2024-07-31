<script lang="ts">
	import { writable } from 'svelte/store';
	import { goto } from '$app/navigation';
	import copy from 'copy-to-clipboard';
	import profileStore from '../../stores/profile';
	import type { Profile } from '../../stores/types';

	const telegramID = writable('');
	const password = writable('');
	const token = writable('');
	const tokenCopied = writable(false);
	const error = writable('');

	const generateToken = () => Math.random().toString(36).slice(2);
	const copyToken = () => {
		tokenCopied.set(copy($token));
	};

	const handleSignUp = () => {
		error.set('');

		const id = $telegramID.trim();
		const pass = $password.trim();

		if (!id || !pass) {
			error.set('Telegram ID and Password are required.');
			return;
		}

		const createdAt = new Date();
		const authToken = generateToken();

		const newUser: Profile = { telegramID: id, password: pass, createdAt, token: authToken };
		profileStore.set(newUser);
		token.set(authToken);
	};
</script>

<svelte:head>
	<title>SignUp</title>
</svelte:head>

<div class="flex flex-col items-center justify-center min-h-screen">
	<div class="w-full max-w-xs">
		{#if $token}
			<div class="bg-green-500 text-white p-4 rounded mt-4">
				<div>Your token is: {$token}</div>
				<div>Please store in an a safe place.</div>
				<div class="flex items-center justify-between">
					<button
						on:click={copyToken}
						class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
					>
						{$tokenCopied ? 'Token copied' : 'Copy token'}
					</button>
					<button
						on:click={() => goto('/login')}
						class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
					>
						OK
					</button>
				</div>
			</div>
		{:else}
			<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<h2 class="mb-4">Sign up form</h2>
				{#if $error}
					<div class="bg-red-500 text-white p-2 mb-4 rounded">
						{$error}
					</div>
				{/if}
				<div class="mb-4">
					<label class="block text-gray-700 text-sm font-bold mb-2" for="signup-tg-id"> Telegram ID </label>
					<input
						bind:value={$telegramID}
						id="signup-tg-id"
						class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						type="text"
						placeholder="Telegram ID"
					/>
				</div>
				<div class="mb-6">
					<label class="block text-gray-700 text-sm font-bold mb-2" for="signup-pass"> Password </label>
					<input
						bind:value={$password}
						id="signup-pass"
						class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
						type="password"
						placeholder="******************"
					/>
				</div>
				<div class="flex items-center justify-between">
					<button
						on:click|preventDefault={handleSignUp}
						class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="button"
					>
						Sign Up
					</button>
				</div>
			</form>
		{/if}
	</div>
</div>
