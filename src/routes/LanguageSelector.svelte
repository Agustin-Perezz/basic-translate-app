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
  class="w-28 rounded border-0 border-b-2 border-blue-400 bg-white px-2 py-1 text-blue-600 focus:border-blue-400 focus:ring-0 md:mb-2"
  style="border-left: none; border-right: none; border-top: none; border-radius: 0; box-shadow: none;"
>
  {#each languages as { name } (name)}
    <option value={name}>{name}</option>
  {/each}
</select>
