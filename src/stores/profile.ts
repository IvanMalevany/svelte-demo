import { writable } from 'svelte/store';
import type { Profile } from './types';

const profileStore = writable<Profile | null>(null);

export default profileStore;
