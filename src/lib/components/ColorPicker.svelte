<script lang="ts">
	import { borderColor } from '../stores/store';
</script>

<div class="mt-2 p-2 rounded-lg">
	<!-- palette-of-colors -->
	<div class=" whitespace-nowrap overflow-x-auto ">
		<!-- single color -->
		<button
			type="button"
			class="inline-block mr-2 rounded-full bg-secondary-500 w-10 h-10"
			on:click={() => ($borderColor = 'secondary')}
		/>
		<button
			type="button"
			class="inline-block mr-2 rounded-full bg-primary-500 w-10 h-10"
			on:click={() => ($borderColor = 'primary')}
		/>
		<button
			type="button"
			class="inline-block mr-2 rounded-full bg-tertiary-500 w-10 h-10"
			on:click={() => ($borderColor = 'tertiary')}
		/>
		<button
			type="button"
			class="inline-block mr-2 rounded-full bg-success-500 w-10 h-10"
			on:click={() => ($borderColor = 'success')}
		/>
		<button
			type="button"
			class="inline-block mr-2 rounded-full bg-warning-500 w-10 h-10"
			on:click={() => ($borderColor = 'warning')}
		/>
		<button
			type="button"
			class="inline-block mr-2 rounded-full bg-error-500 w-10 h-10"
			on:click={() => ($borderColor = 'error')}
		/>
		<button
			type="button"
			class="inline-block mr-2 rounded-full bg-surface-500 w-10 h-10"
			on:click={() => ($borderColor = 'surface')}
		/>
		<button
			type="button"
			class="inline-block mr-2 rounded-full bg-primary-800-100-token w-10 h-10"
			on:click={() => ($borderColor = 'primaryToken')}
		/>
		<button
			type="button"
			class="inline-block mr-2 rounded-full bg-secondary-800-100-token w-10 h-10"
			on:click={() => ($borderColor = 'secondaryToken')}
		/>
	</div>
</div>
