<script lang="ts">
	// import { enhance } from '$app/forms';
	import {
		checkInInputIsOnFocus,
		checkOutInputIsOnFocus,
		isEditable,
		borderColor,
		formStatus
	} from '../stores/store';

	import ColorPicker from './ColorPicker.svelte';

	let checkInPlaceholder = 'check in';
	let checkOutPlaceholder = 'check out';

	function checkInInputOnFocus() {
		checkInPlaceholder = 'pick a date ↓';
		$checkInInputIsOnFocus = true;
	}

	function checkInImputFocusOut() {
		checkInPlaceholder = 'check in';
	}

	function checkOutInputOnFocus() {
		checkOutPlaceholder = 'pick a date ↓';
		$checkOutInputIsOnFocus = true;
	}

	function checkOutInputFocusOut() {
		checkOutPlaceholder = 'check in';
	}
</script>

<form
	method="POST"
	action="?/create"
	class="grid grid-cols-12 gap-4 p-4 backdrop-blur-md max-w-screen"
>
	<!-- Booking name -->
	<input
		type="text"
		name="bookingName"
		placeholder="name"
		autocomplete="off"
		class="input  col-span-11"
		bind:value={$formStatus.name}
	/>

	<!-- close button -->

	<button
		type="button"
		on:click={() => ($isEditable = !$isEditable)}
		class="col-span-1 text-2xl">X</button
	>

	<!-- Check in date -->
	<input
		type="text"
		name="check-in"
		autocomplete="off"
		placeholder={checkInPlaceholder}
		on:focus={checkInInputOnFocus}
		on:focusout={checkInImputFocusOut}
		class="input col-span-6"
		inputmode="none"
		value={$formStatus.startOnDay}
	/>

	<!-- Check out date -->
	<input
		type="text"
		name="check-out"
		placeholder={checkOutPlaceholder}
		autocomplete="off"
		on:focus={checkOutInputOnFocus}
		on:focusout={checkOutInputFocusOut}
		class="input col-span-6"
		inputmode="none"
		value={$formStatus.endOnDay}
	/>

	<!-- Color choice -->

	<div class="  col-span-9 row-start-3 ">
		<input type="hidden" name="bookingColor" value={$borderColor} />
		<ColorPicker />
	</div>

	<!-- Submit button -->
	<button
		type="submit"
		on:click={() => ($isEditable = !$isEditable)}
		class="btn btn-sm px-8 py-6   text-lg variant-filled   col-span-3 justify-self-center self-center h-8 w-8"
		>save</button
	>
</form>

<style>
	input::-webkit-calendar-picker-indicator {
		display: none;
	}
</style>
