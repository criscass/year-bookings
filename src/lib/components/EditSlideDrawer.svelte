<script>
	// import { enhance } from '$app/forms';
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
		type="date"
		name="check-in"
		placeholder="check in"
		class="input w-48"
	/>

	<input
		type="date"
		name="check-out"
		placeholder="check out"
		class="input w-48"
	/>
	<button class="btn btn-sm mr-12 px-4 text-lg variant-filled">save</button>
</form>

<style>
	input::-webkit-calendar-picker-indicator {
		display: none;
	}
</style>
