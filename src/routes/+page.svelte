<script lang="ts">
  import app from '$stores/app';
</script>

<div>
  <div><span class="font-light">App Version:</span> {$app.appVersion}</div>
  <div><span class="font-light">Electron Version:</span> {$app.electronVersion}</div>
</div>
