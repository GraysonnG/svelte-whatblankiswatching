<script lang="ts">
	import mobile from "is-mobile";


	let svg1: SVGElement;

	const handleLoad = () => {
		const reducedMotionPreferred = window.matchMedia('(prefers-reduced-motion: reduce)');
		const isMobile = mobile();

		if (!isMobile && (!reducedMotionPreferred || !reducedMotionPreferred.matches)) {
			for (let i = 1; i <= 5; i++) {
				const tween = KUTE.fromTo(
					`#start${i}`,
					{
						path: `#start${i}`
					},
					{
						path: `#end${i}`
					},
					{
						repeat: 999,
						duration: 25000,
						easing: 'easingQuadraticInOut',
						yoyo: true
					}
				);

				tween.start();
			}
		}
	};
</script>

<svelte:head>
	<script
		on:load={handleLoad}
		src="https://cdn.jsdelivr.net/npm/kute.js@2.1.2/dist/kute.min.js"></script>
</svelte:head>

<div>
	<svg
		bind:this={svg1}
		id="bg1"
		viewBox="0 0 960 540"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		preserveAspectRatio="none"
		version="1.1"
		><rect x="0" y="0" width="960" height="540" fill="var(--bg-color)" />
		<path
			id="start1"
			d="M0 121L40 121.8C80 122.7 160 124.3 240 145.3C320 166.3 400 206.7 480 204.3C560 202 640 157 720 140.5C800 124 880 136 920 142L960 148L960 541L920 541C880 541 800 541 720 541C640 541 560 541 480 541C400 541 320 541 240 541C160 541 80 541 40 541L0 541Z"
			fill="var(--wave-1-color)"
		/><path
			id="start2"
			d="M0 315L40 303.2C80 291.3 160 267.7 240 258.2C320 248.7 400 253.3 480 266.5C560 279.7 640 301.3 720 294.3C800 287.3 880 251.7 920 233.8L960 216L960 541L920 541C880 541 800 541 720 541C640 541 560 541 480 541C400 541 320 541 240 541C160 541 80 541 40 541L0 541Z"
			fill="var(--wave-2-color)"
		/><path
			id="start3"
			d="M0 336L40 331.3C80 326.7 160 317.3 240 312.8C320 308.3 400 308.7 480 299.2C560 289.7 640 270.3 720 260.8C800 251.3 880 251.7 920 251.8L960 252L960 541L920 541C880 541 800 541 720 541C640 541 560 541 480 541C400 541 320 541 240 541C160 541 80 541 40 541L0 541Z"
			fill="var(--wave-3-color)"
		/><path
			id="start4"
			d="M0 364L40 358C80 352 160 340 240 349.5C320 359 400 390 480 406.2C560 422.3 640 423.7 720 421.5C800 419.3 880 413.7 920 410.8L960 408L960 541L920 541C880 541 800 541 720 541C640 541 560 541 480 541C400 541 320 541 240 541C160 541 80 541 40 541L0 541Z"
			fill="var(--wave-4-color)"
		/><path
			id="start5"
			d="M0 487L40 480.8C80 474.7 160 462.3 240 453.5C320 444.7 400 439.3 480 446C560 452.7 640 471.3 720 468.8C800 466.3 880 442.7 920 430.8L960 419L960 541L920 541C880 541 800 541 720 541C640 541 560 541 480 541C400 541 320 541 240 541C160 541 80 541 40 541L0 541Z"
			fill="var(--wave-5-color)"
		/>

		<g style="visibility:hidden">
			<path
				id="end1"
				d="M0 112L40 128C80 144 160 176 240 202.2C320 228.3 400 248.7 480 251.8C560 255 640 241 720 216.7C800 192.3 880 157.7 920 140.3L960 123L960 541L920 541C880 541 800 541 720 541C640 541 560 541 480 541C400 541 320 541 240 541C160 541 80 541 40 541L0 541Z"
				fill="#c569fa"
			/><path
				id="end2"
				d="M0 172L40 180.3C80 188.7 160 205.3 240 211.8C320 218.3 400 214.7 480 219C560 223.3 640 235.7 720 241.2C800 246.7 880 245.3 920 244.7L960 244L960 541L920 541C880 541 800 541 720 541C640 541 560 541 480 541C400 541 320 541 240 541C160 541 80 541 40 541L0 541Z"
				fill="#ac57ed"
			/><path
				id="end3"
				d="M0 345L40 346.5C80 348 160 351 240 351.2C320 351.3 400 348.7 480 335.5C560 322.3 640 298.7 720 286.8C800 275 880 275 920 275L960 275L960 541L920 541C880 541 800 541 720 541C640 541 560 541 480 541C400 541 320 541 240 541C160 541 80 541 40 541L0 541Z"
				fill="#9145e0"
			/><path
				id="end4"
				d="M0 375L40 382C80 389 160 403 240 412C320 421 400 425 480 410.8C560 396.7 640 364.3 720 365.7C800 367 880 402 920 419.5L960 437L960 541L920 541C880 541 800 541 720 541C640 541 560 541 480 541C400 541 320 541 240 541C160 541 80 541 40 541L0 541Z"
				fill="#7534d3"
			/><path
				id="end5"
				d="M0 439L40 444C80 449 160 459 240 455.5C320 452 400 435 480 438.3C560 441.7 640 465.3 720 464.7C800 464 880 439 920 426.5L960 414L960 541L920 541C880 541 800 541 720 541C640 541 560 541 480 541C400 541 320 541 240 541C160 541 80 541 40 541L0 541Z"
				fill="#5524c7"
			/>
		</g>
	</svg>
</div>

<style lang="scss">
	div {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		overflow: hidden;
		z-index: -3;
	}

	#bg1 {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translateX(-50%) translateY(calc(-50% + 9vh));
		min-height: 120vh;
		min-width: 120vw;
		height: 120vh;
		width: 120vw;
		aspect-ratio: 16 / 9 !important;
	}
</style>
