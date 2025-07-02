<script lang="ts">
  export let value: string;
  export let onChange: () => void;

  let languages = [
    { name: 'English' },
    { name: 'Spanish' },
    { name: 'French' },
    { name: 'German' },
    { name: 'Italian' },
    { name: 'Portuguese' },
    { name: 'Russian' },
    { name: 'Chinese' },
    { name: 'Japanese' },
    { name: 'Arabic' }
  ];
</script>

<select
  bind:value
  onchange={onChange}
  class="mb-2 w-28 rounded border border-gray-600 bg-gray-800 px-2 py-1 text-white"
>
  {#each languages as { name } (name)}
    <option value={name}>{name}</option>
  {/each}
</select>
