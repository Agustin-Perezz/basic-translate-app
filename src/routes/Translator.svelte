<script lang="ts">
  import { client } from '$lib/openia-config';

  let input = '';
  let translation = '';

  let sourceLanguage = 'Spanish';
  let targetLanguage = 'English';

  const languages = [
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

  const handleTranslate = async () => {
    if (input.length <= 2) {
      return;
    }

    const prompt = `Translate the following text from ${sourceLanguage} to ${targetLanguage}: ${input}`;

    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }]
    });
    translation = response.choices[0].message.content || '';
  };
</script>

{#snippet languageSelector(language: string)}
  <select
    value={language}
    class="mb-2 w-28 rounded border border-gray-600 bg-gray-800 px-2 py-1 text-white"
  >
    {#each languages as { name } (name)}
      <option value={name}>{name}</option>
    {/each}
  </select>
{/snippet}

<div class="flex w-full max-w-5xl gap-2">
  <div class="flex flex-1 flex-col">
    {@render languageSelector(sourceLanguage)}
    <div
      class=" rounded-md border border-gray-600 bg-transparent p-4 shadow-md"
    >
      <textarea
        bind:value={input}
        on:input={() => handleTranslate()}
        rows="4"
        class="w-full resize-none border-none bg-transparent text-lg text-white outline-none focus:ring-0 focus:outline-none"
        placeholder="Enter text"
      ></textarea>
    </div>
  </div>
  <div class="flex flex-1 flex-col">
    {@render languageSelector(targetLanguage)}
    <div
      class="h-42 rounded-md border border-gray-600 bg-transparent p-4 shadow"
    >
      {#await handleTranslate()}
        <div class="flex-1 text-lg whitespace-pre-wrap text-white">
          Translating...
        </div>
      {:then}
        <div class="flex-1 text-lg whitespace-pre-wrap text-white">
          <p class="mb-1 text-lg text-white">
            {#if translation.length === 0}
              Translation
            {:else}
              {translation}
            {/if}
          </p>
        </div>
      {/await}
    </div>
  </div>
</div>
