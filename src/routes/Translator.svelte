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

<div class="flex w-full max-w-5xl flex-col px-2">
  <div class="mb-2 flex items-center justify-between md:mb-0 md:flex-row">
    <LanguageSelector bind:value={sourceLanguage} {onChange} />
    <button
      class="rounded-full p-1 text-white hover:bg-gray-700"
      onclick={swapLanguages}
      aria-label="Swap languages"
    >
      <Icon icon="mdi:swap-horizontal" width="28" height="28" />
    </button>
    <LanguageSelector bind:value={targetLanguage} {onChange} />
  </div>
  <div class="flex flex-col md:flex-row">
    <div class="relative mb-1 flex flex-1 flex-col md:mb-0">
      <div
        class="relative rounded-md border border-gray-600 bg-transparent p-4 shadow-md"
      >
        <textarea
          bind:value={input}
          rows="4"
          class="w-full resize-none border-none bg-transparent text-lg text-white outline-none focus:ring-0 focus:outline-none"
          style="scrollbar-width: none; -ms-overflow-style: none;"
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
    <div class="flex flex-1 flex-col md:ml-2">
      <div
        class="scrollbar-none h-42 max-h-48 overflow-y-auto rounded-md border border-gray-600 bg-gray-800 p-4 shadow"
        style="scrollbar-width: none; -ms-overflow-style: none;"
      >
        <div class="flex-1 text-lg break-words whitespace-pre-wrap text-white">
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
      <style>
        div[style*='scrollbar-width']::-webkit-scrollbar {
          display: none;
        }
      </style>
    </div>
  </div>
</div>
