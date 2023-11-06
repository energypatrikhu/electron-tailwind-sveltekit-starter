<script lang="ts">
	import { app } from '$stores/app';
</script>

<div>
	The App Fully Loaded!

	<div>
		App Versions:

		<div>
			<div>appVersion: {$app.appVersion}</div>
			<div>electronVersion: {$app.electronVersion}</div>
		</div>
	</div>
</div>
