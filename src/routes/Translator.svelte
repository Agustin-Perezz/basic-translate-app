<script lang="ts">
  import Icon from '@iconify/svelte';
  import LanguageSelector from './LanguageSelector.svelte';

  const MIN_INPUT_LENGTH = 2;

  let input = $state('');
  let translation = $state('');
  let sourceLanguage = $state('Spanish');
  let targetLanguage = $state('English');
  let debounceTimeout: ReturnType<typeof setTimeout>;
  let loading = $state(false);

  function swapLanguages() {
    const temp = sourceLanguage;
    sourceLanguage = targetLanguage;
    targetLanguage = temp;
    input = translation;
    onChange();
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
    loading = true;
    const response = await fetch('/api/translate', {
      method: 'POST',
      body: JSON.stringify({ sourceLanguage, targetLanguage, input })
    });
    translation = await response.text();
    loading = false;
  };
</script>

<div class="flex w-full max-w-5xl flex-col px-2">
  <div class="mb-2 flex items-center justify-between md:mb-0 md:flex-row">
    <LanguageSelector bind:value={sourceLanguage} {onChange} />
    <button
      class="rounded-full p-1 text-blue-600 hover:bg-blue-100"
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
        class="relative rounded-md border border-blue-200 bg-white p-4 shadow-md"
      >
        <textarea
          bind:value={input}
          rows="4"
          class="w-full resize-none border-none bg-transparent text-lg text-gray-800 outline-none focus:ring-0 focus:outline-none"
          style="scrollbar-width: none; -ms-overflow-style: none;"
          placeholder="Enter text"
          oninput={onChange}
        ></textarea>
        {#if input.length > 0}
          <button
            class="absolute top-2 right-2 rounded-full p-1 text-blue-600 hover:bg-blue-100"
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
        class="scrollbar-none h-42 max-h-48 overflow-y-auto rounded-md border border-blue-200 bg-blue-50 p-4 shadow"
        style="scrollbar-width: none; -ms-overflow-style: none;"
      >
        <div
          class="flex-1 text-lg break-words whitespace-pre-wrap text-gray-800"
        >
          <p class="mb-1 text-lg text-gray-800">
            {#if loading}
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
