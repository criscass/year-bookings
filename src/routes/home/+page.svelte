<div class="container mx-auto">
	<header class="mt-8 w-full flex justify-end">
		<ul class="flex flex-row gap-8 mr-8">
			<li><a href="/login" class="text-xl">login</a></li>
			<li><a href="/register" class="text-xl">register</a></li>
		</ul>
	</header>

	<main class="mt-12 lg:mt-28">
		<!-- title -->
		<div class="flex-col mx-auto p-8 md:p-2">
			<h1
				class="text-4xl sm:text-6xl lg:text-8xl text-center fadeInUp-animation-1"
			>
				<span
					class="bg-gradient-to-br from-error-500 to-warning-500 bg-clip-text text-transparent box-decoration-clone"
					>All your bookings</span
				>
			</h1>
			<h1
				class="text-4xl mt-4 sm:text-6xl lg:text-8xl text-center fadeInUp-animation-2"
			>
				<span
					class="bg-gradient-to-br from-secondary-500 to-surface-300 bg-clip-text text-transparent box-decoration-clone"
					>in one,</span
				>
			</h1>
			<h1
				class="text-4xl mt-4 sm:text-6xl lg:text-8xl text-center fadeInUp-animation-3"
			>
				<span
					class="bg-gradient-to-br from-tertiary-500 to-primary-500 bg-clip-text text-transparent box-decoration-clone"
					>simple place</span
				>
			</h1>
		</div>
		<!-- calendar photo -->
		<div class=" mt-12 md:mt-32">
			<enhanced:img
				src="/static/photos/calendar-1.jpg"
				alt="calendar showing months with bookings"
				class="drop-shadow-xl fade-In-animation glow-card"
			/>
		</div>
	</main>
</div>

<style>
	.glow-card {
		padding: 1.5rem;

		color: #48abe0;
		box-shadow: 0 0 50px 15px #0fa5e9;
		border-radius: 10px;
	}
	@keyframes fadeInUp {
		0% {
			transform: translateY(100%);
			opacity: 0;
		}
		100% {
			transform: translateY(0%);
			opacity: 1;
		}
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	.fade-In-animation {
		animation: 3.5s fadeIn;
	}

	.fadeInUp-animation-1 {
		animation: 1.5s fadeInUp;
	}
	.fadeInUp-animation-2 {
		animation: 1.7s fadeInUp;
	}
	.fadeInUp-animation-3 {
		animation: 2s fadeInUp;
	}
</style>
