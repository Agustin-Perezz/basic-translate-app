<script lang="ts">
  import { client } from '$lib/openia-config';
  import LanguageSelector from './LanguageSelector.svelte';

  let input = $state('');
  let translation = $state('');

  let sourceLanguage = $state('Spanish');
  let targetLanguage = $state('English');

  $effect(() => {
    if (input.length > 2) {
      handleTranslate();
    }
  });

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

<div class="flex w-full max-w-5xl gap-2">
  <div class="flex flex-1 flex-col">
    <LanguageSelector bind:value={sourceLanguage} />
    <div
      class=" rounded-md border border-gray-600 bg-transparent p-4 shadow-md"
    >
      <textarea
        bind:value={input}
        rows="4"
        class="w-full resize-none border-none bg-transparent text-lg text-white outline-none focus:ring-0 focus:outline-none"
        placeholder="Enter text"
      ></textarea>
    </div>
  </div>
  <div class="flex flex-1 flex-col">
    <LanguageSelector bind:value={targetLanguage} />
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
