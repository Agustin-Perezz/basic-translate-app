<script lang="ts">
  import Icon from '@iconify/svelte';
  import { client } from '$lib/openia-config';
  import LanguageSelector from './LanguageSelector.svelte';

  const MIN_INPUT_LENGTH = 2;

  let input = $state('');
  let translation = $state('');
  let sourceLanguage = $state('Spanish');
  let targetLanguage = $state('English');
  let debounceTimeout: ReturnType<typeof setTimeout>;

  function swapLanguages() {
    const temp = sourceLanguage;
    sourceLanguage = targetLanguage;
    targetLanguage = temp;
    translate();
  }

  const onChange = () => {
    if (input.length > MIN_INPUT_LENGTH) {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(translate, 1000);
    } else {
      clearTimeout(debounceTimeout);
    }
  };

  const translate = async () => {
    const prompt = `Translate the following text from ${sourceLanguage} to ${targetLanguage}: ${input}`;
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }]
    });
    translation = response.choices[0].message.content || '';
  };
</script>

<div class="flex w-full max-w-5xl gap-2">
  <div class="relative flex flex-1 flex-col">
    <LanguageSelector bind:value={sourceLanguage} {onChange} />
    <div
      class=" relative rounded-md border border-gray-600 bg-transparent p-4 shadow-md"
    >
      <textarea
        bind:value={input}
        rows="4"
        class="w-full resize-none border-none bg-transparent text-lg text-white outline-none focus:ring-0 focus:outline-none"
        placeholder="Enter text"
        oninput={onChange}
      ></textarea>
      {#if input.length > 0}
        <button
          class="absolute top-2 right-2 rounded-full p-1 text-white hover:bg-gray-700"
          onclick={() => (input = '')}
          aria-label="Clear input"
        >
          <Icon icon="mdi:close" width="20" height="20" />
        </button>
      {/if}
    </div>
  </div>
  <div class="flex flex-1 flex-col">
    <div class="relative flex items-center justify-start">
      <button
        class="absolute left-[-21px] rounded-full p-1 text-white hover:bg-gray-700"
        onclick={swapLanguages}
        aria-label="Swap languages"
      >
        <Icon icon="mdi:swap-horizontal" width="28" height="28" />
      </button>
      <div class="ml-6">
        <LanguageSelector bind:value={targetLanguage} {onChange} />
      </div>
    </div>
    <div
      class="h-42 rounded-md border border-gray-600 bg-transparent p-4 shadow"
    >
      <div class="flex-1 text-lg whitespace-pre-wrap text-white">
        <p class="mb-1 text-lg text-white">
          {#if input.length > MIN_INPUT_LENGTH && translation === ''}
            Translating...
          {:else if translation.length === 0}
            Translation
          {:else}
            {translation}
          {/if}
        </p>
      </div>
    </div>
  </div>
</div>
