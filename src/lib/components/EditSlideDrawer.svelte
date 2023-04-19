<script>
	// import { enhance } from '$app/forms';
	import {
		checkInInputIsOnFocus,
		pickedCheckInDate,
		pickedCheckOutDate,
		checkOutInputIsOnFocus
	} from '../stores/store';

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

	function checkOutImputFocusOut() {
		checkOutPlaceholder = 'check in';
	}
</script>

<form method="POST" action="?/create" class="p-8">
	<input
		type="text"
		name="bookingName"
		placeholder="name"
		autocomplete="off"
		class="input w-72"
	/>

	<input
		type="text"
		name="check-in"
		placeholder={checkInPlaceholder}
		on:focus={checkInInputOnFocus}
		on:focusout={checkInImputFocusOut}
		bind:value={$pickedCheckInDate}
		class="input w-48"
	/>

	<input
		type="text"
		name="check-out"
		placeholder={checkOutPlaceholder}
		on:focus={checkOutInputOnFocus}
		on:focusout={checkOutImputFocusOut}
		bind:value={$pickedCheckOutDate}
		class="input w-48"
	/>
	<button class="btn btn-sm mr-12 px-4 text-lg variant-filled">save</button>
</form>

<style>
	input::-webkit-calendar-picker-indicator {
		display: none;
	}
</style>
