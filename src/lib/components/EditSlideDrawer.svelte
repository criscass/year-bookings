<form method="POST" action="/" class="p-8">
	<input
		type="text"
		name="bookingName"
		placeholder="name"
		autocomplete="off"
		class="input w-72"
	/>

	<input type="date" name="checkIn" placeholder="check in" class="input w-48" />

	<input
		type="date"
		name="checkOut"
		placeholder="check out"
		class="input w-48"
	/>
	<button type="button" class="btn btn-sm mr-12 px-4 text-lg variant-filled"
		>save</button
	>
</form>

<style>
	input::-webkit-calendar-picker-indicator {
		display: none;
	}
</style>
